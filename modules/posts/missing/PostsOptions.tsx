import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, HStack, VStack } from '@chakra-ui/layout';
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
  Portal,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { CustomDrawer } from 'components/common/overlays/CustomDrawer';
import { motion } from 'framer-motion';
import { DateFilters, LocationFilters, useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { MissingPageContext } from 'pages/missing';
import React, { useContext, useEffect, useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import { GoPlus, GoSettings } from 'react-icons/go';
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
  //todo: add filters to the posts
  /* Filters needed 
    1. Location filtering (city, state, country)
    2. Date (from, to) - Post Date -> {
      1. Today
      2. Last Week
      3. Last Month
      4. Last Year
    }
  */
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
          New Post
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
  const [dateFilter, setDateFilters] = useState<DateFilters | null>(null);
  const [locationFilter, setLocationFilter] = useState<LocationFilters | null>(
    null
  );
  const { handleSelectFilters } = useContext(MissingPageContext);

  const handleAddDateFilter = (filter: DateFilters) => {
    setDateFilters(filter);
  };
  const handleAddLocationFilter = (filter: LocationFilters) => {
    setLocationFilter(filter);
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
    handleSelectFilters && handleSelectFilters({ date: dateFilter });
  }, [dateFilter]);
  return (
    <HStack w='100%'>
      <Menu closeOnSelect={false} autoSelect={false}>
        <MenuButton>
          <Button
            aria-label='Filters'
            colorScheme='gray'
            leftIcon={<GoSettings />}
            minW='92px'
            size='sm'
          >
            Add Filter
          </Button>
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem
              as={FilterSubMenu}
              handleAddDateFilter={handleAddDateFilter}
              options={DateFiltersObj}
              checked={dateFilter}
              buttonText='Date'
              menuButtonProps={
                {
                  as: Button,
                  variant: 'ghost',
                  rightIcon: <CgChevronRight />,
                  w: '100%',
                  textAlign: 'left',
                  borderRadius: 0,
                  size: 'sm',
                } as MenuButtonProps
              }
              menuOptionGroupProps={{ title: 'Date' } as MenuOptionGroupProps}
            />
            <MenuItem
              as={FilterSubMenu}
              handleAddDateFilter={handleAddLocationFilter}
              options={LocationFiltersObject}
              checked={locationFilter}
              buttonText='Location'
              menuButtonProps={
                {
                  as: Button,
                  variant: 'ghost',
                  rightIcon: <CgChevronRight />,
                  w: '100%',
                  textAlign: 'left',
                  borderRadius: 0,
                  size: 'sm',
                } as MenuButtonProps
              }
              menuOptionGroupProps={
                { title: 'Location' } as MenuOptionGroupProps
              }
            />
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
    </HStack>
  );
};
