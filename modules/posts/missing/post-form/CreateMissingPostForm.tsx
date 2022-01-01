import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Button,
  CircularProgress,
  ModalProps,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { MyDropzone } from 'components/common/input/CustomDropzone';
import GenericInputComponent from 'components/common/input/CustomInputComponent';
import CustomSwitch from 'components/common/input/CustomSwitch';
import { DropdownMenu } from 'components/common/input/DropdownMenu';
import InputField from 'components/common/input/InputField';
import TwoOptionsSwitch from 'components/common/input/TwoOptionsSwitch';
import CustomLocationPicker from 'components/common/location/CustomLocationPicker';
import GenericModal from 'components/common/overlays/CustomModal';
import ModalHeader from 'components/common/overlays/ModalHeader';
import { UserAvatar } from 'components/UserAvatar';
import { Form, Formik } from 'formik';
import {
  CreateMissingPostInput,
  MissingPostTypes,
  PrivacyType,
  Scalars,
  useCreateMissingPostMutation,
} from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { LocationType } from 'types';
import { addNewMissingPostToCache } from 'utils/cache/addNewMissingPost';
import { capitalizeString } from 'utils/capitalizeString';
import {
  PrivacyTypeCustomized,
  SelectLocationOptions,
} from 'utils/constants/enums';
import { toErrorMap } from 'utils/toErrorMap';
import { CustomAlertDialog } from '../../../../components/common/overlays/AlertDialog';
import { NotAuthenticatedComponent } from '../../../../components/NotAuthenticatedComponent';
import { PostLocationFields } from './PostLocationFields';

export type PostInputType = CreateMissingPostInput & {
  images: Array<Scalars['Upload']>;
};

const initialValues: PostInputType = {
  title: '',
  description: '',
  type: MissingPostTypes.Missing,
  privacy: PrivacyType.Public,
  address: null,
  thumbnailIdx: 0,
  images: [],
};
export const NewMissingPostForm: React.FC<{
  closeDrawer: VoidFunction;
}> = ({ closeDrawer }) => {
  const { user, loading } = useIsAuth();
  const [locationOption, setLocationOption] =
    useState<SelectLocationOptions | null>(null);
  const [locationLatLng, setLocationLatLng] = useState<LocationType | null>(
    null
  );
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [showLocationOption, setShowLocationOption] = useState(false);
  const [createPost] = useCreateMissingPostMutation();
  const toast = useToast();

  const hideLocationPicker = () => {
    setLocationOption(null);
  };

  const formRef = useRef(null);
  const cancelOnClickOutside = ({
    description,
    images,
    title,
  }: PostInputType) => {
    const hasValue = title.length || description.length || images.length;

    //if the click happened in the location modal, ignore
    if (locationOption) return;
    else if (hasValue) {
      // if any of the values are null, then we show confirmation modal
      return setOpenAlertDialog(true);
    }
    return closeDrawer();
  };
  if (loading)
    return (
      <HStack w='100%' justify='center'>
        <CircularProgress isIndeterminate color='teal.300' size='40px' />
      </HStack>
    );
  if (!user)
    return (
      <NotAuthenticatedComponent
        title='Not Authenticated'
        subtitle='You must login to be able to create a new post'
      />
    );

  return (
    <Box my={2} ref={formRef}>
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

            update: (cache, { data: result, errors }) => {
              if (!result || errors?.length) return;
              return addNewMissingPostToCache(cache, result);
            },
          });

          if (data?.createMissingPost.errors?.length) {
            setErrors(toErrorMap(data?.createMissingPost.errors));
            toast({
              title: 'Create Post Failed ❌',
              description:
                'An error occurred while trying to create your post, please try again',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
          closeDrawer();

          toast({
            title: 'Post Created Successfully',
            description:
              "Your post has been created successfully, and we've sent notifications to nearby users to help you in the searching process",
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => {
          useOnClickOutside(formRef, () => {
            cancelOnClickOutside(values);
          });

          return (
            <Form>
              <VStack spacing={5} mb={10}>
                {/* Avatar, name and  */}
                <HStack w='100%' align='center'>
                  <UserAvatar avatarProps={{ size: 'md' }} />
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
                  maxLength={50}
                  maxInputLength={50}
                  showLength
                />
                <InputField
                  name='description'
                  placeholder='Tell us more about where you found this pet'
                  helperText='Give us more information about the pet you missed or found'
                  label='Description'
                  maxLength={255}
                  maxInputLength={255}
                  showLength
                  textarea
                />
                <MyDropzone label='Pet Images' name='images' />

                <Tooltip
                  label='We will send notifications to nearby users to help you finding the pet'
                  placement='bottom'
                >
                  <Box width={'100%'}>
                    <CustomSwitch
                      label='Send notifications to nearby users?'
                      checked={showLocationOption}
                      handleChange={(checked) => setShowLocationOption(checked)}
                    />
                  </Box>
                </Tooltip>
                <PostLocationFields
                  values={values}
                  setFieldValue={setFieldValue}
                  isOpen={showLocationOption}
                  setLocationOption={setLocationOption}
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
                  minW='110px'
                  fontSize='.9rem'
                  isLoading={isSubmitting}
                >
                  Post
                </Button>
              </HStack>
              {/* Location modal */}
              <GenericModal
                title={
                  <ModalHeader
                    title='Select Location'
                    subtitle='Select the location where you missed or found the pet on map, Locations
                are used to send notifications and alerts to nearby users'
                  />
                }
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
                isOpen={locationOption === SelectLocationOptions.MAP}
                onClose={() => setLocationOption(null)}
              />
            </Form>
          );
        }}
      </Formik>
      <CustomAlertDialog
        header={'Close Form 👀'}
        body='Are you sure? all the fields you filled will be cleared on closing and can not be restored again'
        confirmText='Close anyway'
        isOpen={openAlertDialog}
        cancelText='Cancel'
        handleCancel={() => setOpenAlertDialog(false)}
        handleConfirm={() => closeDrawer()}
      />
    </Box>
  );
};
