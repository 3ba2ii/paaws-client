import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, HStack, Stack, VStack } from '@chakra-ui/layout';
import {
  Button,
  Checkbox,
  DrawerProps,
  forwardRef,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Portal,
  Radio,
  RadioGroup,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { CustomDrawer } from 'components/common/overlays/CustomDrawer';
import { motion } from 'framer-motion';
import { DateFilters, useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { MissingPageContext } from 'pages/missing';
import React, { useContext, useEffect, useState } from 'react';
import { CgCalendarToday, CgChevronRight, CgGlobe } from 'react-icons/cg';
import { GoPlus, GoSettings } from 'react-icons/go';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';
import { DateFiltersObj } from 'utils/constants/enums';
import { NewMissingPostForm } from './CreateMissingPostForm';
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
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '90%',
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
          colorScheme='blue'
          onClick={openNewPostModal}
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
  const { handleSelectFilters } = useContext(MissingPageContext);

  const handleAddFilter = (filter: DateFilters) => {
    setDateFilters(filter);
  };

  const handleDeleteFilter = (type: 'date' | 'location') => {
    if (type === 'date') setDateFilters(null);
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
              as={DateSubMenu}
              handleAddFilter={handleAddFilter}
              options={DateFiltersObj}
              checked={dateFilter}
            />
            <MenuItem as={LocationSubMenu} />
          </MenuList>
        </Portal>
      </Menu>
      <Box h='20px' w='1px' bg={useColorModeValue('gray.300', 'gray.700')} />
      {dateFilter ? (
        <HStack>
          {[dateFilter].map((filter) => (
            <Tag colorScheme={'cyan'} boxShadow={'base'}>
              <TagLabel>{capitalizeTheFirstLetterOfEachWord(filter)}</TagLabel>
              <Tooltip label='Delete' placement='top'>
                <TagRightIcon
                  boxSize={'8px'}
                  as={CloseIcon}
                  cursor={'pointer'}
                  onClick={() => handleDeleteFilter('date')}
                />
              </Tooltip>
            </Tag>
          ))}
          <Button
            size='xs'
            variant={'ghost'}
            colorScheme={'red'}
            onClick={() => setDateFilters(null)}
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
    </HStack>
  );
};

interface DateMenuProps {
  handleAddFilter: (filter: DateFilters) => void;
  options: {
    key: string;
    value: DateFilters;
  }[];
  checked: DateFilters | null;
}

const DateSubMenu = forwardRef<DateMenuProps, any>(
  ({ handleAddFilter, options, checked }, ref) => {
    return (
      <Menu placement='right-start'>
        <MenuButton
          as={Button}
          variant='ghost'
          leftIcon={<CgCalendarToday />}
          rightIcon={<CgChevronRight />}
          ref={ref}
          w='100%'
          textAlign={'left'}
          borderRadius={0}
          size='sm'
        >
          Date
        </MenuButton>
        <Portal appendToParentPortal>
          <MenuList>
            <MenuOptionGroup title='Date' opacity={0.5}>
              <Stack pl={4}>
                {options.map(({ key, value }) => (
                  <Radio
                    key={key}
                    value={value}
                    onClick={() => handleAddFilter(value)}
                    fontSize={'sm'}
                    isChecked={checked === value}
                    cursor={'pointer'}
                  >
                    {capitalizeTheFirstLetterOfEachWord(value)}
                  </Radio>
                ))}
              </Stack>
            </MenuOptionGroup>
          </MenuList>
        </Portal>
      </Menu>
    );
  }
);

const LocationSubMenu = forwardRef((props, ref) => {
  return (
    <Menu placement='right-start' autoSelect={false}>
      <MenuButton
        as={Button}
        variant='ghost'
        borderRadius={0}
        rightIcon={<CgChevronRight />}
        leftIcon={<CgGlobe />}
        ref={ref}
        {...props}
        size='sm'
      >
        Location
      </MenuButton>
      <Portal appendToParentPortal>
        <MenuList>
          <MenuItem>New Tap</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
});
