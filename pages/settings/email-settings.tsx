import {
  Badge,
  Box,
  Button,
  FormLabel,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import CustomEditableField from 'components/input/CustomEditableField';
import { Form, Formik } from 'formik';
import { useIsEmailVerifiedQuery } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import SettingsPageLayout from 'modules/settings/layout';
import React from 'react';
import withApollo from 'utils/withApollo';

interface EmailSettingsProps {}

const EmailSettings: React.FC<EmailSettingsProps> = ({}) => {
  const { user, loading } = useIsAuth();
  const { data } = useIsEmailVerifiedQuery();

  const onSendEmailVerification = () => {};

  if (loading) return <LoadingComponent />;
  if (!user) return <Heading>You are not logged in</Heading>;

  const isVerified = data?.isEmailVerified.response;

  return (
    <SettingsPageLayout user={user}>
      <Formik
        initialValues={{
          email: user.email,
        }}
        onSubmit={() => {}}
        validateOnBlur
      >
        {(formikProps) => (
          <Form
            style={{
              width: '100%',
              maxWidth: '900px',
              height: '100%',
            }}
          >
            <VStack spacing={14} maxW='800px'>
              <Box w='100%'>
                <HStack
                  spacing={0}
                  h='fit-content'
                  w='fit-content'
                  align='center'
                  mb='4'
                >
                  <FormLabel mb='0' fontSize='16px' fontWeight='bold'>
                    Your email
                  </FormLabel>
                  <Badge
                    fontSize='10px'
                    colorScheme={isVerified ? 'blue' : 'red'}
                  >
                    {isVerified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </HStack>
                <CustomEditableField
                  defaultValue={formikProps.values.email || ''}
                  label={'Your email'}
                  name={'email'}
                  type='email'
                  editableProps={{
                    isPreviewFocusable: false,
                    submitOnBlur: false,
                    onSubmit: () => {},
                    onAbort: () => {},
                    onCancel: () => {},
                  }}
                />
                {!isVerified ? (
                  <Button
                    variant='link'
                    size='sm'
                    colorScheme='blue'
                    my={3}
                    onClick={onSendEmailVerification}
                  >
                    Verify my email
                  </Button>
                ) : null}
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </SettingsPageLayout>
  );
};
export default withApollo(EmailSettings);
