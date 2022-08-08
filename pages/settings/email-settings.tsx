import {
  Badge,
  Box,
  Button,
  Divider,
  FormLabel,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import CustomEditableField from 'components/input/CustomEditableField';
import { Form, Formik } from 'formik';
import { MeQuery, MySettingsQuery } from 'generated/graphql';
import * as Yup from 'yup';

import { useAuth } from 'hooks/useAuth';
import useTimer from 'hooks/useTimer';
import ConfirmPassword from 'pages/confirm-password';
import React, { useState } from 'react';

interface EmailSettingsProps {
  user: MeQuery['me'];
  settings: MySettingsQuery['mySettings'];
}

const EmailSettings: React.FC<EmailSettingsProps> = ({ user, settings }) => {
  const [verifyEmailSent, setEmailVerifySent] = useState(false);
  const [redirectToAuth, setRedirectToAuth] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState({
    sendingEmail: false,
    sendEmailVerification: false,
  });

  const auth = useAuth();
  const toaster = useToast();
  const { start, countdown } = useTimer();

  const onSendEmailVerification = async (email: string) => {
    if (!email) return;
    setEmailVerifySent(true);
    setLoading({ ...loading, sendEmailVerification: true });
    const data = await auth.sendVerifyEmail();
    if (!data) return;
    if (data.sendVerificationMail.success) {
      start(60);
      setEmailVerifySent(true);
    }
    setLoading({ ...loading, sendEmailVerification: false });
  };

  const openAuthorizationModal = () => {
    setRedirectToAuth(true);
  };
  const onAuthorizationSuccess = async (
    authToken: string,
    authAction: string
  ) => {
    /* send change email mail */
    await auth.sendChangeEmail(authToken, authAction, newEmail);
    setRedirectToAuth(false);
  };
  const failedToaster = (message: string) => {
    toaster({
      isClosable: true,
      position: 'top-right',
      status: 'error',
      variant: 'subtle',
      title: 'Failed',
      description: message,
    });
  };

  if (!user || !settings) return <Heading>You are not logged in</Heading>;

  const isVerified = settings?.emailVerified;

  return (
    <VStack w='100%' h='100%' align='flex-start' spacing={5}>
      <Heading fontSize='24px' fontWeight={'bold'}>
        Email Settings
      </Heading>
      <Divider maxW='800px' />
      <Formik
        initialValues={{
          email: user.email,
        }}
        onSubmit={async ({ email }) => {
          setNewEmail(email);
          openAuthorizationModal();
          setEmailVerifySent(true);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Please provide a valid email'),
        })}
        validateOnBlur
      >
        {(formikProps) => (
          <Form
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <Box w='100%' h='100%'>
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
                isLoading={formikProps.isSubmitting}
                hasError={!!formikProps.errors.email}
                editableProps={{
                  isPreviewFocusable: false,
                  submitOnBlur: false,
                  onSubmit: () => formikProps.submitForm(),
                  onAbort: () => formikProps.resetForm(),
                  onCancel: () => formikProps.resetForm(),
                }}
              />
              {/* Error component*/}
              {formikProps.errors.email && formikProps.touched.email ? (
                <Text
                  py={2}
                  textStyle={'p2'}
                  color='red.400'
                  display='block'
                  fontSize={'13px'}
                  maxW='60ch'
                  fontWeight={'regular'}
                >
                  {formikProps.errors.email}
                </Text>
              ) : null}
              <Box my={1}>
                {!isVerified ? (
                  <Button
                    variant='link'
                    size='sm'
                    fontSize='sm'
                    fontWeight='regular'
                    colorScheme={countdown !== 0 ? 'gray' : 'blue'}
                    onClick={() =>
                      onSendEmailVerification(formikProps.values.email)
                    }
                    isLoading={loading.sendEmailVerification}
                    isDisabled={loading.sendEmailVerification || countdown > 0}
                    loadingText={'Sending verification email'}
                  >
                    {verifyEmailSent
                      ? `You can resend another verification email ${
                          countdown === 0 ? 'now' : `in ${countdown}`
                        }`
                      : 'Send verification email'}
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <ConfirmPassword
        isOpen={redirectToAuth}
        onSuccess={onAuthorizationSuccess}
        onFailure={failedToaster}
        authAction='change-email'
        onClose={() => setRedirectToAuth(false)}
      />
    </VStack>
  );
};
export default EmailSettings;
