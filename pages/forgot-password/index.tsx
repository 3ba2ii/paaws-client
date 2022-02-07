import { Heading, Text, Box, VStack, Input, Button } from '@chakra-ui/react';
import Logo from 'components/Logo';
import { useForgotPasswordMutation } from 'generated/graphql';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { isValidEmail } from 'utils/isValidEmail';
import withApollo from 'utils/withApollo';

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({}) => {
  const [sendPasswordResetEmail, { loading }] = useForgotPasswordMutation();
  const [email, setEmail] = React.useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onSubmit = async () => {
    sendPasswordResetEmail({ variables: { identifier: email } });
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
            src={'/illustrations/girl-feeding-a-pet.svg'}
            width='500px'
            height={'350px'}
            alt='forgot-your-password'
          />
          <VStack w='100%' px={7} spacing={4}>
            <Text as='label' fontSize='md' fontWeight={'semibold'}>
              Enter your account's email address and we will send you a password
              reset link.
            </Text>
            <Input
              placeholder='johndoe123@gmail.com'
              value={email}
              onChange={onChangeEmail}
            />
            <Button
              onClick={onSubmit}
              w='100%'
              disabled={!isValidEmail(email)}
              fontSize='sm'
              isLoading={loading}
            >
              Send password reset email
            </Button>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};
export default withApollo(ForgotPasswordPage);