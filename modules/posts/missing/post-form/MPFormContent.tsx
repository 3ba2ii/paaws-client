import { Heading, HStack, VStack, Text } from '@chakra-ui/layout';
import { Button, Tooltip } from '@chakra-ui/react';
import MyDropzone from 'components/input/CustomDropzone';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import CustomSwitch from 'components/input/CustomSwitch';
import { DropdownMenu } from 'components/input/DropdownMenu';
import InputField from 'components/input/InputField';
import TwoOptionsSwitch from 'components/input/TwoOptionsSwitch';
import MyPopover from 'components/overlays/MyPopover';
import { UserAvatar } from 'components/common/UserAvatar';
import { Form, FormikProps } from 'formik';
import { MeQuery, MissingPostQuery, MissingPostTypes } from 'generated/graphql';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { PostInputType } from 'types';
import { capitalizeString } from 'utils/capitalizeString';
import {
  MP_POST_TYPES,
  PrivacyTypeCustomized,
  SelectLocationOptions,
} from 'utils/constants/enums';
import { LocationPickerModal } from './LocationPickerModal';
import { PostLocationFields } from './PostLocationFields';

interface MPFormContentProps {
  formProps: FormikProps<PostInputType>;
  user: MeQuery['me'];
  cancelOnClickOutside: (values: FormikProps<PostInputType>['values']) => void;
  formRef: React.MutableRefObject<null>;
  editMode?: boolean;
  missingPost?: MissingPostQuery['missingPost']['missingPost'];
}

const MPFormContent: React.FC<MPFormContentProps> = ({
  formProps,
  user,
  cancelOnClickOutside,
  formRef,
  editMode,
  missingPost,
}) => {
  const { values, setFieldValue, isSubmitting } = formProps;
  const [locationOption, setLocationOption] =
    useState<SelectLocationOptions | null>(null);

  const [showLocationOption, setShowLocationOption] = useState(false);
  const [rescuePetPopover, setRescuePetPopover] = useState(false);

  useOnClickOutside(formRef, () => {
    if (locationOption) return;
    cancelOnClickOutside({ ...formProps.values });
  });

  const hideLocationPicker = () => setLocationOption(null);
  const toggleRescuePetPopover = () => setRescuePetPopover(!rescuePetPopover);

  const onPetRescue = () => {
    setFieldValue('type', MissingPostTypes.Rescued);
    setRescuePetPopover(false);
  };

  const isEditModeOn = editMode && missingPost;
  return (
    <Form id='form-drawer'>
      <VStack spacing={5} mb={5}>
        {/* Avatar, name and  */}
        <HStack w='100%' align='center'>
          <UserAvatar
            name={user?.displayName}
            avatarURL={user?.avatar?.url}
            avatarProps={{ w: '42px', h: '42px', fontSize: '.5rem' }}
          />
          <VStack align={'flex-start'} spacing={0}>
            <Heading mb={1} fontSize={'sm'} fontWeight={'semibold'}>
              {user?.displayName}
            </Heading>
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
                title: 'Privacy',
                defaultValue: values.privacy,
              }}
            />
          </VStack>
        </HStack>
        <VStack w='100%' align='flex-start' spacing={3}>
          <Tooltip
            label='Let people know more information about your missing/found pet'
            placement='top'
          >
            <Heading size='xs' opacity='0.6' fontWeight={'semibold'} mt={3}>
              Pet General Info
            </Heading>
          </Tooltip>
          <InputFieldWrapper
            helperText='Please specify whether you missed your pet or found one'
            label='Missing or Found'
            name='type'
          >
            <TwoOptionsSwitch
              handleChange={(value) => setFieldValue('type', value)}
              options={MP_POST_TYPES}
              activeValue={values.type}
              variant='outline'
              py={5}
              w='100%'
            />
          </InputFieldWrapper>
          <InputField
            name='title'
            placeholder='I found a dog near manara street'
            label='Title'
            maxLength={70}
            maxInputLength={70}
            showLength
          />
          <InputField
            name='description'
            placeholder='Tell us more about where you found this pet'
            label='Description'
            maxLength={500}
            maxInputLength={500}
            showLength
            textarea
          />

          {!isEditModeOn && <MyDropzone label='Pet Images' name='images' />}
        </VStack>

        <VStack w='100%' align='flex-start' spacing={4}>
          <Tooltip
            label='Showing your contact information will help us connect you with the person who lost/found their/your pet'
            placement='top'
          >
            <Heading size='xs' opacity='0.6' fontWeight={'semibold'} mt={3}>
              Contact Information
            </Heading>
          </Tooltip>

          <VStack width={'100%'} spacing={4}>
            <CustomSwitch
              label='📫 Show Email'
              checked={!!values.showEmail}
              handleChange={(checked) => setFieldValue('showEmail', checked)}
              formControlProps={{ w: '100%', justifyContent: 'space-between' }}
            />
            <CustomSwitch
              label='📞 Show Phone Number'
              checked={!!values.showPhoneNumber}
              handleChange={(checked) =>
                setFieldValue('showPhoneNumber', checked)
              }
              formControlProps={{ w: '100%', justifyContent: 'space-between' }}
            />
          </VStack>
        </VStack>
        {!isEditModeOn && (
          <VStack w='100%' align='flex-start' spacing={4}>
            <Tooltip
              label='We will send notifications to nearby users to help you finding the pet'
              placement='bottom'
            >
              <Heading size='xs' opacity='0.6' fontWeight={'semibold'} mt={3}>
                Alerts & Location Preferences
              </Heading>
            </Tooltip>

            <CustomSwitch
              label='🚨 Send alerts to nearby users?'
              checked={showLocationOption}
              handleChange={(checked) => setShowLocationOption(checked)}
              formControlProps={{
                w: '100%',
                justifyContent: 'space-between',
              }}
            />
            {showLocationOption && (
              <PostLocationFields
                values={values}
                setFieldValue={setFieldValue}
                isOpen={showLocationOption}
                setLocationOption={setLocationOption}
              />
            )}
          </VStack>
        )}
      </VStack>
      {/* The pet is rescued section (the pet owner gets his pet back) */}
      {isEditModeOn && (
        <VStack align='flex-start' spacing={10} pos='relative'>
          <Button
            variant='link'
            size='sm'
            colorScheme={'gray'}
            opacity='.75'
            onClick={toggleRescuePetPopover}
          >
            {values.type === MissingPostTypes.Found
              ? 'Did the owner get his pet back? '
              : values.type === MissingPostTypes.Missing
              ? 'Did you find your pet? '
              : 'Marked as Rescued 🎉'}
          </Button>
          <MyPopover
            title={
              <Heading size='xs' opacity='0.6' fontWeight={'semibold'}>
                Confirm Pet Rescue 🦮
              </Heading>
            }
            body={
              <Text fontSize='sm' py={2}>
                {values.type === MissingPostTypes.Found
                  ? 'If the pet owner got his pet back'
                  : 'If you got your pet back'}
                , please confirm that by clicking the confirm button below and
                it will be marked as rescued
              </Text>
            }
            isOpen={rescuePetPopover}
            onClose={toggleRescuePetPopover}
            footer={
              <HStack justify='flex-end'>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={toggleRescuePetPopover}
                >
                  Cancel
                </Button>
                <Button size='sm' onClick={onPetRescue}>
                  Pet is home 🥳
                </Button>
              </HStack>
            }
            popoverContentProps={{ w: '350px' }}
          />
        </VStack>
      )}
      {/* Footer */}
      <HStack mt={4} w='100%' align='center' justify='flex-end'>
        <Button
          fontSize='.9rem'
          height={'32px'}
          variant='ghost'
          onClick={() => cancelOnClickOutside(values)}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          colorScheme={'teal'}
          minW='110px'
          fontSize='.9rem'
          h='32px'
          isLoading={isSubmitting}
        >
          {isEditModeOn && 'Edit'} Post
        </Button>
      </HStack>
      {/* Location modal */}

      <LocationPickerModal
        {...{
          isOpen: locationOption === SelectLocationOptions.MAP,
          onClose: hideLocationPicker,
          onConfirm: (latlng) => {
            setFieldValue('address', latlng);
            hideLocationPicker();
          },
        }}
      />
    </Form>
  );
};
export default React.memo(MPFormContent);
