import {
  Badge,
  Box,
  Button,
  Divider,
  FormLabel,
  Heading,
  HStack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import CustomEditableField from 'components/input/CustomEditableField';
import { Form, Formik } from 'formik';
import {
  MeQuery,
  MySettingsQuery,
  useSendEmailVerificationMailMutation,
} from 'generated/graphql';
import SettingsPageLayout from 'modules/settings/layout';
import React, { useEffect, useRef, useState } from 'react';

interface EmailSettingsProps {
  user: MeQuery['me'];
  settings: MySettingsQuery['mySettings'];
}

const EmailSettings: React.FC<EmailSettingsProps> = ({ user, settings }) => {
  const [timer, setTimer] = useState(0);
  const [verifyEmailSent, setEmailVerifySent] = useState(false);
  const intervalId = useRef<NodeJS.Timer | null>(null);

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
          setTimer(60);
        }
      },
    });
  };

  useEffect(() => {
    if (timer <= 0) return;

    if (intervalId.current) clearInterval(intervalId.current);
    intervalId.current = setInterval(() => setTimer(timer - 1), 1000);
  }, [timer]);

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
        onSubmit={() => {}}
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
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default EmailSettings;
