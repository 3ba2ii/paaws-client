import {
  Box,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  useToast,
  VStack,
} from '@chakra-ui/react';
import CustomEditableField from 'components/input/CustomEditableField';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import { Form, Formik } from 'formik';
import {
  MeQuery,
  MySettingsQuery,
  useUpdateUserSlugMutation,
} from 'generated/graphql';
import React from 'react';
import { toErrorMap } from 'utils/helpers/toErrorMap';

interface AccountSettingsProps {
  user: MeQuery['me'];
  settings: MySettingsQuery['mySettings'];
}

const InputComponent: React.FC = () => {
  return (
    <InputGroup size='sm' w='50%'>
      <InputLeftAddon children='https://' />
      <Input placeholder='mysite' />
      <InputRightAddon children='.com' />
    </InputGroup>
  );
};
const AccountSettings: React.FC<AccountSettingsProps> = ({ settings }) => {
  /* This will have the following settings
    1. change your url -slug- (string)
    2. change your email (string)
    3. change your password (string)
    4. change your name (string)
    5. change your avatar (string)
    6. change your bio (string)
  */
  const toaster = useToast();
  const [updateSlugMutation] = useUpdateUserSlugMutation();
  return (
    <VStack w='100%' h='100%' alignItems='flex-start' spacing={5}>
      <Heading fontSize='24px' fontWeight={'bold'}>
        Account Settings
      </Heading>
      <Divider />
      <Formik
        initialValues={{
          slug: settings?.slug || '',
        }}
        onSubmit={async ({ slug }, { setErrors }) => {
          const newSlug = slug?.trim()?.toLowerCase() || '';
          const { data } = await updateSlugMutation({
            variables: {
              newSlug,
            },
          });
          if (data?.updateSlug.errors?.length || !data?.updateSlug.response) {
            const errorMap = toErrorMap(data?.updateSlug?.errors || []);
            setErrors(errorMap);
            return;
          }
          toaster({
            title: 'Success',
            description: 'Your slug has been updated',
            status: 'success',
            isClosable: true,
          });
        }}
      >
        {(formikProps) => (
          <Form
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <Box w='100%' h='100%'>
              <InputFieldWrapper
                label='Account URL'
                name='slug'
                labelStyles={{ fontSize: 'md', fontWeight: 'bold', mb: 5 }}
                helperText='Your account URL is your unique identifier for your account.'
                required={false}
              >
                <CustomEditableField
                  defaultValue={formikProps?.values?.slug || ''}
                  label={'Account URL'}
                  name={'slug'}
                  isLoading={formikProps.isSubmitting}
                  hasError={!!formikProps.errors.slug}
                  maxLength={60}
                  editableProps={{
                    isPreviewFocusable: false,
                    submitOnBlur: false,
                    onSubmit: () => formikProps.submitForm(),
                    onAbort: () => formikProps.resetForm(),
                    onCancel: () => formikProps.resetForm(),
                  }}
                />
              </InputFieldWrapper>
            </Box>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default AccountSettings;
