import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import Footer from 'components/common/Footer';
import Logo from 'components/common/Logo';
import { useForgotPasswordMutation } from 'generated/graphql';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { isValidEmail } from 'utils/isValidEmail';
import withApollo from 'utils/withApollo';

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({}) => {
  const [sendPasswordResetEmail, { loading }] = useForgotPasswordMutation();
  const [resendCounter, setTimerCounter] = useState(60);
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onSubmit = async () => {
    await sendPasswordResetEmail({
      variables: { identifier: email },
    });
    setEmailSent(true);
  };
  const resetAll = () => {
    setEmailSent(false);
    setEmail('');
    setTimerCounter(60);
  };

  useEffect(() => {
    document.title = 'Reset your password - Paaws';
  }, []);

  useEffect(() => {
    let timeInterval: NodeJS.Timer | null = null;
    if (emailSent) {
      timeInterval = setInterval(() => {
        setTimerCounter(Math.max(resendCounter - 1, 0));
        if (resendCounter === 0 && timeInterval) {
          clearInterval(timeInterval);
        }
      }, 1000);
    }
    return () => {
      timeInterval && clearInterval(timeInterval);
    };
  }, [emailSent, resendCounter]);

  return (
    <VStack w='100%' h='100vh' justify={'space-between'} px='8rem'>
      <VStack
        w='100%'
        h='100%'
        align='center'
        justify={'flex-start'}
        py={8}
        spacing={5}
      >
        <Box
          boxShadow={'base'}
          borderRadius={8}
          maxW='500px'
          border='1px solid'
          borderColor={'blackAlpha.200'}
          px={5}
          py={8}
        >
          <VStack align='center' justify={'center'} spacing={5}>
            <Logo imageProps={{ maxW: '110px' }} />

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
              height={'250px'}
              alt='forgot-your-password'
            />
            {emailSent ? (
              <VStack w='100%' px={7} spacing={4}>
                <Text as='label' fontSize='sm' fontWeight={'semibold'}>
                  Check your email and your spam folder for a link to reset your
                  password. If it doesn&apos;t appear within a few minutes,{' '}
                  Click the button below to send a new email
                </Text>
                <Button
                  fontSize='sm'
                  w='100%'
                  onClick={resetAll}
                  disabled={resendCounter > 0}
                >
                  Resend a new email
                  {resendCounter > 0 && `, within ${resendCounter} seconds`}
                </Button>
              </VStack>
            ) : (
              <VStack w='100%' px={7} spacing={4}>
                <Text as='label' fontSize='sm' fontWeight={'semibold'}>
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
      <Footer />
    </VStack>
  );
};
export default withApollo(ForgotPasswordPage);
