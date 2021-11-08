import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Button,
  CircularProgress,
  MenuProps,
  ModalProps,
} from '@chakra-ui/react';
import { MyDropzone } from 'components/CustomDropzone';
import { DropdownMenu } from 'components/DropdownMenu';
import GenericInputComponent from 'components/GenericInputComponent';
import CustomLocationPicker from 'components/GenericLocationPicker';
import GenericModal from 'components/GenericModal';
import InputField from 'components/InputField';
import LoggedInUserAvatar from 'components/LoggedInUserAvatar';
import TwoOptionsSwitch from 'components/TwoOptionsSwitch';
import { Form, Formik } from 'formik';
import {
  CreateMissingPostInput,
  MeQuery,
  MissingPost,
  MissingPostsDocument,
  MissingPostsQuery,
  MissingPostTypes,
  PrivacyType,
  Scalars,
  useCreateMissingPostMutation,
} from 'generated/graphql';
import { LocationType } from 'pages/types';
import React, { useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';
import { capitalizeString } from 'utils/capitalizeString';
import {
  PrivacyTypeCustomized,
  SelectLocationObj,
  SelectLocationOptions,
} from 'utils/constants/enums';
import { toErrorMap } from 'utils/toErrorMap';
import { NotAuthenticatedComponent } from './NotAuthenticatedComponent';

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
const LocationHeader = React.memo(() => {
  return (
    <VStack align='flex-start' mt={4}>
      <Heading size='md'>Select Location 🌍</Heading>
      <Text
        fontSize='.875rem'
        color={'gray.500'}
        fontWeight={'medium'}
        textAlign={'left'}
      >
        Select the location where you missed or found the pet on map, Locations
        are used to send notifications and alerts to nearby users
      </Text>
    </VStack>
  );
});
export const NewMissingPostForm: React.FC<{
  loggedInUser: MeQuery | undefined;
  loading: boolean;
  closeDrawer: VoidFunction;
}> = ({ loggedInUser, loading, closeDrawer }): JSX.Element => {
  if (loading)
    return (
      <HStack w='100%' justify='center'>
        <CircularProgress isIndeterminate color='teal.300' size='40px' />
      </HStack>
    );
  if (!loggedInUser || !loggedInUser.me)
    return (
      <NotAuthenticatedComponent
        title='Not Authenticated'
        subtitle='You must login to be able to create a new post'
      />
    );
  const { me: user } = loggedInUser;

  const [selectLocationOption, setSelectLocationOption] =
    useState<SelectLocationOptions | null>(null);

  const [locationLatLng, setLocationLatLng] = useState<LocationType | null>(
    null
  );
  const [createPost] = useCreateMissingPostMutation();

  const hideLocationPicker = () => {
    setSelectLocationOption(null);
  };

  return (
    <Box my={5}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          { images, ...input },
          { setErrors, setFieldError }
        ) => {
          if (!images || !images.length) {
            return setFieldError(
              'images',
              'Please provide at least one image for the pet'
            );
          }
          const { data } = await createPost({
            variables: {
              input,
              images,
            },

            update: (cache, { data: result }) => {
              if (!result || !result.createMissingPost) return;
              const newPost = result.createMissingPost.post;

              if (!newPost) return;
              const cachedPosts = cache.readQuery<MissingPostsQuery>({
                query: MissingPostsDocument,
              });
              const posts = (cachedPosts?.missingPosts?.missingPosts ||
                []) as MissingPost[];
              console.log(
                `🚀 ~ file: CreateMissingPostForm.tsx ~ line 129 ~ posts`,
                posts
              );

              cache.writeQuery<MissingPostsQuery>({
                query: MissingPostsDocument,

                data: {
                  ...cachedPosts,
                  missingPosts: {
                    ...cachedPosts?.missingPosts,
                    missingPosts: [...posts, newPost],
                  },
                },
              });
            },
          });

          if (data?.createMissingPost.errors?.length) {
            return setErrors(toErrorMap(data?.createMissingPost.errors));
          }
          closeDrawer();
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <VStack spacing={5} mb={10}>
              {/* Avatar, name and  */}
              <HStack w='100%' align='center'>
                <LoggedInUserAvatar size='md' />
                <VStack align={'flex-start'} spacing={0}>
                  <Text mb={1} fontSize={'lg'} fontWeight={'semibold'}>
                    {user.displayName}
                  </Text>
                  <DropdownMenu
                    menuButtonText={capitalizeString(values.privacy)}
                    options={PrivacyTypeCustomized}
                    handleChange={(value) => {
                      setFieldValue('privacy', value);
                    }}
                    menuButtonProps={{
                      as: Button,
                      size: 'xs',
                      borderRadius: '4px',
                      rightIcon: <GoChevronDown />,
                      boxShadow: 'base',
                    }}
                    menuOptionGroupProps={{
                      color: 'gray.500',
                      type: 'radio',
                      defaultValue: values.privacy,
                      title: 'Privacy',
                    }}
                  />
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
                  py={5}
                  w='100%'
                />
              </GenericInputComponent>
              <InputField
                name='title'
                placeholder='I found a dog near manara street'
                label='Title'
                maxLength={90}
              />
              <InputField
                name='description'
                placeholder='Tell us more about where you found this pet'
                helperText='Give us more information about the pet you missed or found'
                label='Description'
                maxLength={255}
                textarea
              />
              <MyDropzone label='Pet Images' name='images' />

              <GenericInputComponent
                label='Location'
                name='location'
                helperText='Select the location where you missed or found the pet,
                 Locations are used to send notifications and alerts to nearby users'
                required={false}
              />

              <HStack w='100%' align='center' spacing={0}>
                <DropdownMenu
                  options={SelectLocationObj}
                  menuButtonText={
                    values.address != null ? 'Selected' : 'Select Location'
                  }
                  handleChange={(value) => {
                    setSelectLocationOption(value);
                  }}
                  menuButtonProps={{
                    as: Button,
                    size: 'sm',
                    minW: '110px',
                    height: '38px',
                    rightIcon:
                      values.address != null ? (
                        <Heading size='md'>🤝</Heading>
                      ) : (
                        <GoChevronRight />
                      ),
                    boxShadow: 'base',
                    colorScheme: values.address != null ? 'green' : 'gray',
                    alignSelf: 'flex-start',
                  }}
                  menuProps={{ placement: 'right' } as MenuProps}
                />
                {values.address && (
                  <Button
                    onClick={() => setFieldValue('address', null)}
                    variant='ghost'
                    size='sm'
                    height='38px'
                    colorScheme={'red'}
                  >
                    Clear Location
                  </Button>
                )}
              </HStack>

              <GenericModal
                title={<LocationHeader />}
                footer={
                  <HStack align='flex-start'>
                    <Button
                      h='38px'
                      mr={3}
                      variant='ghost'
                      size='sm'
                      onClick={hideLocationPicker}
                    >
                      Cancel
                    </Button>
                    <Button
                      h='38px'
                      w={'100%'}
                      colorScheme='teal'
                      size='sm'
                      onClick={() => {
                        setFieldValue('address', locationLatLng);
                        hideLocationPicker();
                      }}
                    >
                      Confirm Address
                    </Button>
                  </HStack>
                }
                modalProps={{ size: 'xl' } as ModalProps}
                modalHeaderProps={{
                  display: 'flex',
                  alignContent: 'flex-start',
                }}
                body={
                  <Box
                    w='100%'
                    h='450px'
                    position={'relative'}
                    borderRadius='6px'
                    overflow={'hidden'}
                    boxShadow={'md'}
                  >
                    <CustomLocationPicker
                      includeMarker
                      selectLocationType={SelectLocationOptions.MAP}
                      handleLocationChange={(coords) => {
                        setLocationLatLng(coords);
                      }}
                    />
                  </Box>
                }
                isOpen={selectLocationOption === SelectLocationOptions.MAP}
                onClose={() => setSelectLocationOption(null)}
              />
            </VStack>
            <HStack mt={4} w='100%' align='center' justify='flex-end'>
              <Button
                fontSize='.875rem'
                height={'38px'}
                type='submit'
                variant='ghost'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                colorScheme={'teal'}
                minW='100px'
                fontSize='.875rem'
                isLoading={isSubmitting}
              >
                Post
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
