import { CloseIcon } from '@chakra-ui/icons';
import { Box, Center, Divider, HStack, VStack } from '@chakra-ui/layout';
import {
  Button,
  DrawerProps,
  Menu,
  MenuButton,
  MenuList,
  ModalProps,
  Portal,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { AnimatedSearchBox } from 'components/common/input/AnimatedSearchBox';
import CustomLocationPicker from 'components/common/location/CustomLocationPicker';
import { CustomDrawer } from 'components/common/overlays/CustomDrawer';
import GenericModal from 'components/common/overlays/CustomModal';
import ModalHeader from 'components/common/overlays/ModalHeader';
import { LocationFilters, PostFilters, useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { MissingPageContext } from 'pages/missing';
import React, { useContext, useEffect, useState } from 'react';
import { GoPlus, GoSettings } from 'react-icons/go';
import { FiltersTypes, FiltersTypeString, LocationType, TagsType } from 'types';
import {
  DateFiltersObj,
  LocationFiltersObject,
  SortingOrderFilterObject,
} from 'utils/constants/enums';
import { ActiveTagsComponent } from './ActiveTagsComponent';
import { NewMissingPostForm } from './CreateMissingPostForm';
import { CustomTabPanel } from './CustomTabPanel';

export const PostsOptions: React.FC = () => {
  const { data: loggedInUser, loading } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const openNewPostModal = () => {
    if (!loggedInUser && !loading) {
      router.replace('/login?next=' + router.pathname);
    } else {
      toggleDrawer();
    }
  };

  return (
    <VStack spacing={4}>
      <HStack
        w='100%'
        justify='flex-end'
        position='relative'
        wrap={['wrap', 'unset']}
        sx={{ rowGap: '1rem' }}
      >
        <AnimatedSearchBox />

        <Button
          leftIcon={<GoPlus />}
          aria-label='Report Missing Pet'
          colorScheme='teal'
          onClick={openNewPostModal}
          size='sm'
          px={6}
        >
          Add Post
        </Button>
      </HStack>
      <CustomDrawer
        isOpen={openDrawer}
        onClose={toggleDrawer}
        drawerHeader='Create New Post'
        drawerBody={
          <NewMissingPostForm closeDrawer={() => setOpenDrawer(false)} />
        }
        drawerProps={{ closeOnOverlayClick: false } as DrawerProps}
      />
      <FiltersComponent />
    </VStack>
  );
};

const FiltersComponent: React.FC = () => {
  const { data } = useMeQuery({ fetchPolicy: 'cache-only' });
  const router = useRouter();

  const [locationLatLng, setLocationLatLng] = useState<LocationType>({
    lat: 0,
    lng: 0,
  });
  const [filters, setFilters] = useState<PostFilters>({
    date: null,
    location: { lat: null, lng: null, locationFilter: null },
    order: null,
  });

  const [tags, setTags] = useState<TagsType>({
    date: null,
    location: null,
    order: null,
  });

  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const { handleSelectFilters } = useContext(MissingPageContext);

  const handleAddFilter = (filter: FiltersTypes, type: FiltersTypeString) => {
    if (type === 'location')
      return handleAddLocationFilter(filter as LocationFilters);
    setFilters({ ...filters, [type]: filter });
  };

  const handleAddLocationFilter = (filter: LocationFilters) => {
    if (filter !== LocationFilters.NearCustomLocation) {
      //check if he is logged in
      if (!data || !data.me) {
        //not logged in -> log in and comeback
        return router.replace('/login?next=' + router.pathname);
      }
      //check the user has a location stored
      const { lat, lng } = data.me;

      if (!lat || !lng) {
        //redirect the user to set his location and then comeback
        return router.replace('/settings/location?next=' + router.pathname);
      }
      //then the user has a location stored
      setFilters({
        ...filters,
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          locationFilter: filter,
        },
      });
    } else {
      //open a dialog to select the location on map
      setOpenLocationDialog(true);
    }
  };

  const handleDeleteFilter = (type: FiltersTypeString) => {
    setFilters({ ...filters, [type]: null });
  };

  const handleClearAll = () => {
    setFilters({ date: null, location: null, order: null });
  };
  const getNewTags = (): TagsType => {
    let newTags: any = { date: null, location: null, order: null };
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null) {
        if (key === 'location') {
          //@ts-ignore
          newTags[key] = value.locationFilter;
          return;
        }
        newTags[key] = value as FiltersTypes;
      }
    });
    return newTags as TagsType;
  };

  useEffect(() => {
    setTags(getNewTags());

    handleSelectFilters && handleSelectFilters(filters);
  }, [filters]);

  const FiltersMenu = () => {
    return (
      <Menu autoSelect={false} isLazy closeOnSelect={false}>
        <MenuButton
          as={Button}
          aria-label='Filters'
          colorScheme='gray'
          leftIcon={<GoSettings />}
          minW='92px'
          size='sm'
        >
          Add Filter
        </MenuButton>
        <Portal>
          <MenuList
            boxShadow={'2xl'}
            borderRadius={'8px'}
            bg={useColorModeValue('white', 'gray.800')}
            px={2}
            pt={3}
            borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
          >
            <Tabs isLazy>
              <TabList>
                <Tab fontSize='sm' fontWeight='medium'>
                  Date
                </Tab>
                <Tab fontSize='sm' fontWeight='medium'>
                  Location
                </Tab>
                <Tab fontSize='sm' fontWeight='medium'>
                  Order
                </Tab>
              </TabList>

              <TabPanels>
                {[
                  DateFiltersObj,
                  LocationFiltersObject,
                  SortingOrderFilterObject,
                ].map((options, index) => (
                  <TabPanel>
                    <CustomTabPanel
                      key={index}
                      options={options}
                      handleChange={(filter: FiltersTypes) => {
                        const type = Object.keys(filters)[
                          index
                        ] as FiltersTypeString;

                        handleAddFilter(filter, type);
                      }}
                      checked={Object.values(tags)[index]}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </MenuList>
        </Portal>
      </Menu>
    );
  };
  return (
    <HStack w='100%' wrap='wrap' sx={{ gap: '8px' }} justify={'flex-start'}>
      <FiltersMenu />
      <Center height='25px'>
        <Divider orientation='vertical' />
      </Center>
      {Object.values(tags).some((i) => i !== null) ? (
        <HStack
          wrap='wrap'
          css={{
            marginInlineStart: '0 !important',
            gap: '8px',
            '& > *': {
              marginInlineStart: '0 !important',
            },
          }}
          align='center'
          justify={'flex-start'}
        >
          {Object.entries(tags)
            .filter(([key, value]) => value !== null && { key, value })
            .map(([type, tag]) => (
              <ActiveTagsComponent
                {...{
                  type: type as FiltersTypeString,
                  filters: [tag as FiltersTypes],
                  handleDeleteFilter,
                }}
              />
            ))}

          <Button
            size='xs'
            variant={'ghost'}
            colorScheme={'red'}
            onClick={handleClearAll}
            aria-label='Clear Filters'
            icon={<CloseIcon />}
          >
            Clear
          </Button>
        </HStack>
      ) : (
        <Text textStyle={'p1'} fontWeight='normal'>
          No filters applied
        </Text>
      )}
      <GenericModal
        title={
          <ModalHeader
            title='Select Location 🌍'
            subtitle='Please select a location on map to filter the posts by, all the results will be within 5km from the chosen location.'
          />
        }
        body={
          <Box
            w='100%'
            h='450px'
            position={'relative'}
            borderRadius='4px'
            overflow={'hidden'}
            boxShadow={'md'}
          >
            <CustomLocationPicker
              includeMarker
              handleLocationChange={(coords) => {
                setLocationLatLng(coords);
              }}
            />
          </Box>
        }
        footer={
          <HStack align='flex-start'>
            <Button
              h='38px'
              mr={3}
              variant='ghost'
              size='sm'
              onClick={() => setOpenLocationDialog(false)}
            >
              Cancel
            </Button>
            <Button
              h='38px'
              w={'100%'}
              colorScheme='teal'
              size='sm'
              onClick={() => {
                //set the filter
                setFilters({
                  ...filters,
                  location: {
                    lat: locationLatLng.lat,
                    lng: locationLatLng.lng,
                    locationFilter: LocationFilters.NearCustomLocation,
                  },
                });
                //close the dialog
                setOpenLocationDialog(false);
              }}
            >
              Confirm Location
            </Button>
          </HStack>
        }
        isOpen={openLocationDialog}
        modalProps={{ size: 'xl' } as ModalProps}
        onClose={() => setOpenLocationDialog(false)}
      />
    </HStack>
  );
};
