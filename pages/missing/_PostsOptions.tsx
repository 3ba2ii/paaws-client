import { SearchIcon } from '@chakra-ui/icons';
import { Box, HStack, VStack, Text, Heading } from '@chakra-ui/layout';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { MyDropzone } from 'components/CustomDropzone';
import GenericInputComponent from 'components/GenericInputComponent';
import InputField from 'components/InputField';
import LoggedInUserAvatar from 'components/LoggedInUserAvatar';
import TwoOptionsSwitch from 'components/TwoOptionsSwitch';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import {
  CreateMissingPostInput,
  MeQuery,
  MissingPostTypes,
  PrivacyType,
  Scalars,
  useMeQuery,
} from 'generated/graphql';

import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { GoPlus, GoSettings } from 'react-icons/go';
import { useIsLoggedIn } from 'utils/useIsLoggedIn';
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
        sx={{
          rowGap: '1rem',
        }}
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
        drawerBody={<NewMissingPostForm loggedInUser={loggedInUser} />}
      />
    </>
  );
};
const NewMissingPostForm: React.FC<{
  loggedInUser: MeQuery | undefined;
}> = ({ loggedInUser }): JSX.Element => {
  if (!loggedInUser || !loggedInUser.me)
    return (
      <Heading>You must be logged in to create a missing pet post</Heading>
    );
  const { me: user } = loggedInUser;

  const initialValues: CreateMissingPostInput & {
    images: Array<Scalars['Upload']>;
  } = {
    title: '',
    description: '',
    type: MissingPostTypes.Missing,
    privacy: PrivacyType.Public,
    address: null,
    thumbnailIdx: 0,
    images: [],
  };

  return (
    <Box my={5}>
      <Formik initialValues={initialValues} onSubmit={(values) => {}}>
        {({ values, isSubmitting, handleChange, setFieldValue }) => (
          <Form>
            <VStack spacing={5}>
              {/* Avatar, name and  */}
              <HStack w='100%' align='center'>
                <LoggedInUserAvatar size='md' />
                <VStack>
                  <Text fontSize={'lg'} fontWeight={'semibold'}>
                    {user.displayName}
                  </Text>
                </VStack>
              </HStack>
              <GenericInputComponent
                helperText='Please specify whether you missed your pet or found one'
                label='Missing or Found'
                name='type'
              >
                <TwoOptionsSwitch
                  handleChange={(value) => setFieldValue('type', value)}
                  options={[
                    { label: 'Missing', value: MissingPostTypes.Missing },
                    { label: 'Found', value: MissingPostTypes.Found },
                  ]}
                  activeValue={values.type}
                  variant='outline'
                  py={6}
                  w='100%'
                />
              </GenericInputComponent>
              <InputField
                name='title'
                placeholder='I found a dog near manara street'
                label='Title'
                maxLength={90}
                autoFocus={true}
              />
              <InputField
                name='description'
                placeholder='Tell us more about where you found this pet'
                helperText='Give us more information about the pet you missed or found'
                label='Description'
                maxLength={255}
                textarea
              />
              <MyDropzone label='Media' name='images' />
              <Button minW='128px' type='submit' mt={4} colorScheme={'teal'}>
                Post
              </Button>
            </VStack>
            {JSON.stringify(values)}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const CustomDrawer: React.FC<{
  isOpen: boolean;
  onClose: VoidFunction;
  drawerHeader: string;
  drawerBody: ReactElement;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}> = ({
  isOpen,
  onClose,
  drawerHeader,
  drawerBody,
  size = 'md',
}): ReactElement => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{drawerHeader}</DrawerHeader>
        <DrawerBody>{drawerBody}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
