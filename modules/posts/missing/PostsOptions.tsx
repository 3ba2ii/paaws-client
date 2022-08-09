import { HStack, VStack } from '@chakra-ui/layout';
import { Button, DrawerProps } from '@chakra-ui/react';
import { AnimatedSearchBox } from 'components/input/AnimatedSearchBox';
import { CustomDrawer } from 'components/overlays/CustomDrawer';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { MissingPostForm } from './post-form/MissingPostForm';
import { FiltersComponent } from './FiltersComponent';

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
    <VStack spacing={2}>
      <HStack
        w='100%'
        justifyContent='flex-end'
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
          <MissingPostForm closeDrawer={() => setOpenDrawer(false)} />
        }
        drawerProps={{ closeOnOverlayClick: false } as DrawerProps}
      />
      <FiltersComponent />
    </VStack>
  );
};
