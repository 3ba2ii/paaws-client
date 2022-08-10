import { Box, Divider, Heading, VStack } from '@chakra-ui/react';
import CustomEditableField from 'components/input/CustomEditableField';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import { Form, Formik } from 'formik';
import {
  MeQuery,
  MySettingsQuery,
  useUpdateUserSlugMutation,
} from 'generated/graphql';
import React from 'react';

interface AccountSettingsProps {
  user: MeQuery['me'];
  settings: MySettingsQuery['mySettings'];
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  user,
  settings,
}) => {
  /* This will have the following settings
    1. change your url -slug- (string)
    2. change your email (string)
    3. change your password (string)
    4. change your name (string)
    5. change your avatar (string)
    6. change your bio (string)
  */
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
        onSubmit={async ({ slug }) => {
          const separatedSlug = slug.split(
            `${process.env.NEXT_PUBLIC_HOST_URL}/`
          );

          if (separatedSlug.length > 1 && separatedSlug[1] !== '') {
            const newSlug = separatedSlug[1]?.trim()?.toLowerCase() || '';

            await updateSlugMutation({
              variables: {
                newSlug,
              },
            });
          }
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
                required={false}
              >
                <CustomEditableField
                  defaultValue={`${process.env.NEXT_PUBLIC_HOST_URL}/${
                    formikProps?.values?.slug || ''
                  }`}
                  label={'Account URL'}
                  name={'slug'}
                  isLoading={formikProps.isSubmitting}
                  hasError={!!formikProps.errors.slug}
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
