import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import Logo from 'components/Logo';
import { useForgotPasswordMutation } from 'generated/graphql';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { isValidEmail } from 'utils/isValidEmail';
import withApollo from 'utils/withApollo';

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({}) => {
  const [sendPasswordResetEmail, { loading }] = useForgotPasswordMutation();
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onSubmit = async () => {
    const { data } = await sendPasswordResetEmail({
      variables: { identifier: email },
    });
    setEmailSent(true);
  };
  useEffect(() => {
    document.title = 'Reset your password - Paaws';
  }, []);
  return (
    <VStack w='100%' h='100%' align='center' justify={'flex-start'} py={5}>
      <Logo imageProps={{ maxW: '110px' }} />
      <Box
        boxShadow={'base'}
        borderRadius={8}
        maxW='520px'
        border='1px solid'
        borderColor={'gray.700'}
        px={5}
        py={8}
      >
        <VStack align='flex-start' justify={'center'} spacing={5}>
          <Heading fontSize='xl' mb={4}>
            Reset your password
          </Heading>

          <Image
            src={
              emailSent
                ? '/illustrations/undraw_mail_sent_re_0ofv.svg'
                : '/illustrations/robot-fail.svg'
            }
            width='500px'
            height={'350px'}
            alt='forgot-your-password'
          />
          {emailSent ? (
            <VStack w='100%' px={7} spacing={4}>
              <Text as='label' fontSize='md' fontWeight={'semibold'}>
                Check your email and your spam folder for a link to reset your
                password. If it doesn&apos;t appear within a few minutes,{' '}
                <Button
                  variant='link'
                  colorScheme={'blue'}
                  fontWeight='bold'
                  onClick={() => setEmailSent(false)}
                >
                  Click here
                </Button>{' '}
                to resend an email.
              </Text>
              <Button fontSize='sm' w='100%'>
                Back to login page
              </Button>
            </VStack>
          ) : (
            <VStack w='100%' px={7} spacing={4}>
              <Text as='label' fontSize='md' fontWeight={'semibold'}>
                Enter your account&apos;s email address and we will send you a
                password reset link.
              </Text>
              <Input
                placeholder='johndoe123@gmail.com'
                value={email}
                onChange={onChangeEmail}
              />
              <Button
                onClick={onSubmit}
                w='100%'
                fontSize='sm'
                disabled={!isValidEmail(email)}
                isLoading={loading}
              >
                Send password reset email
              </Button>
            </VStack>
          )}
        </VStack>
      </Box>
    </VStack>
  );
};
export default withApollo(ForgotPasswordPage);
