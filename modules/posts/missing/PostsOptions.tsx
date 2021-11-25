import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, HStack, Stack, VStack } from '@chakra-ui/layout';
import {
  Button,
  DrawerProps,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuOptionGroupProps,
  ModalProps,
  Portal,
  Radio,
  RadioGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import CustomLocationPicker from 'components/common/location/CustomLocationPicker';
import { CustomDrawer } from 'components/common/overlays/CustomDrawer';
import GenericModal from 'components/common/overlays/CustomModal';
import ModalHeader from 'components/common/overlays/ModalHeader';
import { motion } from 'framer-motion';
import { DateFilters, LocationFilters, useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { MissingPageContext } from 'pages/missing';
import React, { useContext, useEffect, useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import { GoPlus, GoSettings } from 'react-icons/go';
import { LocationType } from 'types';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';
import { DateFiltersObj, LocationFiltersObject } from 'utils/constants/enums';
import { ActiveTagsComponent } from './ActiveTagsComponent';
import { NewMissingPostForm } from './CreateMissingPostForm';
import { FilterSubMenu } from './SubMenuProps';
const variants = {
  closed: {
    opacity: 0,
    x: '98%',
    y: '-100%',
  },
  open: {
    opacity: 1,
    x: '0',
    y: '-100%',
  },
};

const AnimatedSearchBox = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <Box
      position='relative'
      w='100%'
      display='flex'
      align='flex-start'
      justify='flex-start'
      overflow='hidden'
    >
      <IconButton
        aria-label='Search Icon'
        icon={<SearchIcon />}
        colorScheme='gray'
        ml='auto'
        onClick={toggleShowOptions}
        zIndex={2}
        size='sm'
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '93%',
          height: '100%',
          top: '100%',
        }}
        animate={showOptions ? 'open' : 'closed'}
        variants={variants as any}
      >
        <Input
          w='100%'
          shadow='base'
          variant='filled'
          placeholder='Search for post title, pet type or just description'
          zIndex={1}
        />
      </motion.div>
    </Box>
  );
};

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

  const [dateFilter, setDateFilters] = useState<DateFilters | null>(null);

  const [locationFilter, setLocationFilter] = useState<LocationFilters | null>(
    null
  );
  const [locationLatLng, setLocationLatLng] = useState<LocationType>({
    lat: 0,
    lng: 0,
  });

  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const { handleSelectFilters } = useContext(MissingPageContext);

  const handleAddDateFilter = (filter: DateFilters) => {
    setDateFilters(filter);
  };
  const handleAddLocationFilter = (filter: LocationFilters) => {
    if (filter !== LocationFilters.NearCustomLocation) {
      //check if he is logged in
      if (!data || !data.me) {
        //not logged in -> log in and comeback
        return router.replace('/login?next=' + router.pathname);
      } else {
        //check the user has a location stored
        const { lat, lng } = data.me;
        console.log(
          `🚀 ~ file: PostsOptions.tsx ~ line 179 ~ handleAddLocationFilter ~ lat`,
          lat
        );
        if (!lat || !lng) {
          //redirect the user to set his location to set the location
          return router.replace('/settings/location?next=' + router.pathname);
        } else {
          setLocationLatLng({ lat: parseFloat(lat), lng: parseFloat(lng) });
          setLocationFilter(filter);
        }
      }
    } else {
      //1. open a dialog to select the location on map
      setOpenLocationDialog(true);
    }
  };

  const handleDeleteFilter = (type: 'date' | 'location') => {
    if (type === 'date') setDateFilters(null);
    else setLocationFilter(null);
  };

  const handleClearAll = () => {
    setDateFilters(null);
    setLocationFilter(null);
  };
  useEffect(() => {
    handleSelectFilters &&
      handleSelectFilters({
        date: dateFilter,
        location: locationFilter
          ? { ...locationLatLng, locationFilter }
          : { lat: null, lng: null, locationFilter: null },
      });
  }, [dateFilter, locationFilter]);
  return (
    <HStack w='100%'>
      <Menu closeOnSelect={false} autoSelect={false} isLazy>
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
            pb={4}
            borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
          >
            <Tabs isLazy>
              <TabList>
                <Tab fontSize={'sm'} fontWeight={'medium'}>
                  Date
                </Tab>
                <Tab fontSize={'sm'} fontWeight={'medium'}>
                  Location
                </Tab>
                <Tab fontSize={'sm'} fontWeight={'medium'}>
                  Order
                </Tab>
              </TabList>

              <TabPanels>
                {[DateFiltersObj, LocationFiltersObject].map(
                  (options, index) => (
                    <TabPanel>
                      <CustomTabPanel
                        key={index}
                        options={options}
                        handleChange={(
                          filter: DateFilters | LocationFilters
                        ) => {
                          index === 0
                            ? handleAddDateFilter(filter as DateFilters)
                            : handleAddLocationFilter(
                                filter as LocationFilters
                              );
                        }}
                        checked={index === 0 ? dateFilter : locationFilter}
                      />
                    </TabPanel>
                  )
                )}
              </TabPanels>
            </Tabs>
          </MenuList>
        </Portal>
      </Menu>
      <Box h='20px' w='1px' bg={useColorModeValue('gray.300', 'gray.700')} />
      {dateFilter || locationFilter ? (
        <>
          {dateFilter && (
            <ActiveTagsComponent
              {...{
                type: 'date',
                filters: [dateFilter],
                handleDeleteFilter,
              }}
            />
          )}
          {locationFilter && (
            <ActiveTagsComponent
              {...{
                type: 'location',

                filters: [locationFilter],
                handleDeleteFilter,
              }}
            />
          )}
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
        </>
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
                console.log(
                  `🚀 ~ file: PostsOptions.tsx ~ line 342 ~ coords`,
                  coords
                );
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
                setLocationFilter(LocationFilters.NearCustomLocation);
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
interface CustomTabPanelProps {
  handleChange: (filter: DateFilters | LocationFilters) => void;
  options: {
    key: string;
    value: DateFilters | LocationFilters;
  }[];
  checked: DateFilters | LocationFilters | null;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
  handleChange,
  options,
  checked,
}) => {
  const onChange = (val: DateFilters | LocationFilters) => {
    handleChange(val);
  };
  return (
    <RadioGroup onChange={onChange} size={'sm'} fontWeight={'normal'}>
      <Stack>
        {options.map(({ key, value }) => (
          <Radio
            key={key}
            value={value}
            cursor={'pointer'}
            isChecked={checked === value}
          >
            {capitalizeTheFirstLetterOfEachWord(value)}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
