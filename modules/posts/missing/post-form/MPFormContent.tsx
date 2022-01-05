import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
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
      <VStack spacing={5} mb={10}>
        {/* Avatar, name and  */}
        <HStack w='100%' align='center'>
          <UserAvatar avatarProps={{ size: 'md' }} />
          <VStack align={'flex-start'} spacing={0}>
            <Text mb={1} fontSize={'lg'} fontWeight={'semibold'}>
              {user?.displayName}
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
          helperText='Give us more information about the pet you missed or found'
          label='Description'
          maxLength={500}
          maxInputLength={500}
          showLength
          textarea
        />

        {!isEditModeOn && <MyDropzone label='Pet Images' name='images' />}

        <Tooltip
          label='Showing your contact information will help us connect you with the person who lost/found their/your pet'
          placement='top'
        >
          <Box width={'100%'}>
            <CustomSwitch
              label='Show your contact information'
              checked={!!values.showContactInfo}
              handleChange={(checked) =>
                setFieldValue('showContactInfo', checked)
              }
            />
          </Box>
        </Tooltip>
        {!isEditModeOn && (
          <>
            <Tooltip
              label='We will send notifications to nearby users to help you finding the pet'
              placement='bottom'
            >
              <Box width={'100%'}>
                <CustomSwitch
                  label='Send alerts to nearby users?'
                  checked={showLocationOption}
                  handleChange={(checked) => {
                    setShowLocationOption(checked);
                    scrollToBottom('form-drawer');
                  }}
                />
              </Box>
            </Tooltip>
            {showLocationOption && (
              <PostLocationFields
                values={values}
                setFieldValue={setFieldValue}
                isOpen={showLocationOption}
                setLocationOption={setLocationOption}
              />
            )}
          </>
        )}
      </VStack>
      <HStack mt={4} w='100%' align='center' justify='flex-end'>
        <Button
          fontSize='.875rem'
          height={'38px'}
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
          onConfirm: (locLat) => {
            setFieldValue('address', locLat);
            hideLocationPicker();
          },
        }}
      />
    </Form>
  );
};
export default React.memo(MPFormContent);
function scrollToBottom(id: string) {
  const element = document.getElementById(id);

  if (element)
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    });
}