import { SearchIcon } from '@chakra-ui/icons';
import { Box, HStack } from '@chakra-ui/layout';
import { Button, DrawerProps, IconButton, Input } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoPlus, GoSettings } from 'react-icons/go';
import { NewMissingPostForm } from '../../components/CreateMissingPostForm';
import { CustomDrawer } from '../../components/CustomDrawer';
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
    <>
      <HStack
        w='100%'
        justify='flex-end'
        position='relative'
        wrap={['wrap', 'unset']}
        sx={{ rowGap: '1rem' }}
      >
        <AnimatedSearchBox />

        <Button
          aria-label='Report Missing Pet'
          colorScheme='gray'
          leftIcon={<GoSettings />}
          minW='92px'
        >
          Filters
        </Button>
        <Button
          leftIcon={<GoPlus />}
          aria-label='Report Missing Pet'
          colorScheme='teal'
          minW='128px'
          onClick={openNewPostModal}
        >
          New Post
        </Button>
      </HStack>
      <CustomDrawer
        isOpen={openDrawer}
        onClose={toggleDrawer}
        drawerHeader='Create New Post'
        drawerBody={
          <NewMissingPostForm
            loggedInUser={loggedInUser}
            loading={loading}
            closeDrawer={() => setOpenDrawer(false)}
          />
        }
        drawerProps={{ closeOnOverlayClick: false } as DrawerProps}
      />
    </>
  );
};
