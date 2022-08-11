import { CloseIcon } from '@chakra-ui/icons';
import { Box, Center, Divider, HStack } from '@chakra-ui/layout';
import {
  Button,
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
import CustomLocationPicker from 'components/location/CustomLocationPicker';
import GenericModal from 'components/overlays/CustomModal';
import ModalHeader from 'components/overlays/ModalHeader';
import { LocationFilters, PostFilters, useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { MissingPageContext } from 'pages/missing';
import React, { useContext, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { GoSettings } from 'react-icons/go';
import { FiltersTypes, FiltersTypeString, LocationType, TagsType } from 'types';
import {
  DateFiltersObj,
  LocationFiltersObject,
  SortingOrderFilterObject,
} from 'utils/constants/enums';
import { ActiveTagsComponent } from './ActiveTagsComponent';
import { CustomTabPanel } from './CustomTabPanel';

export const FiltersComponent: React.FC = () => {
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
  const [openUpdateLocationDialog, setOpenUpdateLocationDialog] =
    useState(false);
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
        return setOpenUpdateLocationDialog(true);
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
  const handleSelectLocationOnMap = () => {
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
                  <TabPanel key={index}>
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
    <HStack
      w='100%'
      wrap='wrap'
      sx={{ gap: '8px' }}
      justifyContent={'flex-start'}
    >
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
          alignItems='center'
          justifyContent={'flex-start'}
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
            leftIcon={<CloseIcon />}
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
          <HStack alignItems='flex-start'>
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
              onClick={handleSelectLocationOnMap}
            >
              Confirm Location
            </Button>
          </HStack>
        }
        isOpen={openLocationDialog}
        modalProps={{ size: 'xl' } as ModalProps}
        onClose={() => setOpenLocationDialog(false)}
      />
      <GenericModal
        isOpen={openUpdateLocationDialog}
        title={
          <ModalHeader
            title='Update Location'
            subtitle='Please update your location first and then comeback'
          />
        }
        body={
          <Text as='p' textStyle={'p1'} color={'inherit'} fontWeight={'normal'}>
            We don't have a stored location of you, so please update your
            location and comeback.
          </Text>
        }
        onClose={() => setOpenUpdateLocationDialog(false)}
        modalProps={{ size: 'md' } as ModalProps}
        footer={
          <HStack alignItems='flex-start'>
            <Button
              mr={3}
              variant='ghost'
              size='sm'
              onClick={() => setOpenUpdateLocationDialog(false)}
            >
              Cancel
            </Button>
            <Button
              size='sm'
              w={'100%'}
              colorScheme='teal'
              rightIcon={<FiChevronRight />}
              onClick={() =>
                router.replace(
                  '/profile/complete-info/location?next=' + router.pathname
                )
              }
            >
              Set my location
            </Button>
          </HStack>
        }
      />
    </HStack>
  );
};
