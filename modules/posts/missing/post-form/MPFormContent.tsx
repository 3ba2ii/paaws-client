import { Heading, HStack, VStack } from '@chakra-ui/layout';
import { Button, Tooltip } from '@chakra-ui/react';
import MyDropzone from 'components/common/input/CustomDropzone';
import InputHOC from 'components/common/input/CustomInputComponent';
import CustomSwitch from 'components/common/input/CustomSwitch';
import { DropdownMenu } from 'components/common/input/DropdownMenu';
import InputField from 'components/common/input/InputField';
import TwoOptionsSwitch from 'components/common/input/TwoOptionsSwitch';
import { UserAvatar } from 'components/UserAvatar';
import { Form, FormikProps } from 'formik';
import { MeQuery, MissingPostQuery } from 'generated/graphql';
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

  useOnClickOutside(formRef, () => {
    if (locationOption) return;
    cancelOnClickOutside({ ...formProps.values });
  });

  const hideLocationPicker = () => {
    setLocationOption(null);
  };
  const isEditModeOn = editMode && missingPost;
  return (
    <Form id='form-drawer'>
      <VStack spacing={5} mb={5}>
        {/* Avatar, name and  */}
        <HStack w='100%' align='center'>
          <UserAvatar
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
          <InputHOC
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
          </InputHOC>
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
