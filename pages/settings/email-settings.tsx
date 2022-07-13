import {
  Badge,
  Box,
  Button,
  FormLabel,
  Heading,
  HStack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import CustomEditableField from 'components/input/CustomEditableField';
import { Form, Formik } from 'formik';
import {
  useIsEmailVerifiedQuery,
  useSendEmailVerificationMailMutation,
} from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import SettingsPageLayout from 'modules/settings/layout';
import React, { useEffect, useRef, useState } from 'react';
import withApollo from 'utils/withApollo';

const EmailSettings: React.FC = () => {
  const { user, loading } = useIsAuth();
  const { data } = useIsEmailVerifiedQuery();

  const [timer, settimer] = useState(0);
  const intervalId = useRef<NodeJS.Timer | null>(null);

  const [verifyEmailSent, setEmailVerifySent] = useState(false);
  const [sendVerificationEmail, { loading: isSending }] =
    useSendEmailVerificationMailMutation();

  const toaster = useToast();

  const onSendEmailVerification = async (email: string) => {
    if (!email) return;
    await sendVerificationEmail({
      variables: { email: email.trim().toLowerCase() },
      update: (_cache, { data: result }) => {
        if (result?.sendEmailVerification.success) {
          toaster({
            isClosable: true,
            position: 'top-right',
            status: 'success',
            variant: 'subtle',
            title: 'Email sent 💌',
            description: 'Please check your inbox for a message from us',
          });
          setEmailVerifySent(true);
          settimer(60);
        }
      },
    });
  };

  useEffect(() => {
    if (timer <= 0) return;

    if (intervalId.current) clearInterval(intervalId.current);
    intervalId.current = setInterval(() => settimer(timer - 1), 1000);
  }, [timer]);

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
                <Box my={1}>
                  {!isVerified ? (
                    <Button
                      variant='link'
                      size='sm'
                      fontSize='sm'
                      fontWeight='regular'
                      colorScheme={timer !== 0 ? 'gray' : 'blue'}
                      onClick={() =>
                        onSendEmailVerification(formikProps.values.email)
                      }
                      isLoading={isSending}
                      isDisabled={isSending || timer !== 0}
                    >
                      {verifyEmailSent
                        ? `You can resend another verification email ${
                            timer === 0 ? 'now' : `in ${timer}`
                          }`
                        : 'Send verification email'}
                    </Button>
                  ) : null}
                </Box>
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </SettingsPageLayout>
  );
};
export default withApollo(EmailSettings);
