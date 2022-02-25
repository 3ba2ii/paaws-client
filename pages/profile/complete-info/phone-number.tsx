import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import Logo from 'components/Logo';
import { UserAvatar } from 'components/UserAvatar';
import { useIsAuth } from 'hooks/useIsAuth';
import SendOTPComponent from 'modules/profile/complete-info/SendOTP';
import VerifyOTPComponent from 'modules/profile/complete-info/VerifyPhoneNumber';
import React, { useState } from 'react';
import { GoVerified } from 'react-icons/go';
import withApollo from 'utils/withApollo';

interface PhoneNumberProps {}


const CompleteInfoLeftCol = () => {
  return (
    <VStack
      w='100%'
      h='100%'
      flex='.4'
      align={'flex-start'}
      justify='center'
      px='65px'
      bg='#F2F5F8'
    >
      <Heading color='gray.700' size='lg' fontWeight='semibold'>
        Welcome to Paaws 🐶
      </Heading>
      <Text fontSize={'md'} color='gray.500'>
        Help us complete your profile and make it more attractive to users
      </Text>
    </VStack>
  );
};

const AlreadyVerifiedComponent = () => {
  return (
    <VStack flex='.75' spacing={5}>
      <GoVerified color='green' size={'42px'} />
      <Heading size='sm' textAlign={'center'} maxW='50ch' lineHeight={'1.5'}>
        You already have a verified phone number, If you want to change it,
        Please head to the settings page and delete your phone number.
      </Heading>
    </VStack>
  );
};

const VerifyPhoneNumberPage: React.FC<PhoneNumberProps> = () => {
  const { user } = useIsAuth();

  const [step, setStep] = useState<'send-otp' | 'verify-otp'>('send-otp');
  const [phone, setPhone] = useState<string | null>(null);

  const hasVerifiedPhone: boolean = !!(
    user &&
    user.phone &&
    user.phoneVerified
  );

  return (
    <Layout
      title='Verify Phone Number'
      includeFooter={false}
      includeNavbar={false}
      childrenProps={{ mt: '0' }}
      layoutProps={{ mt: '0', p: '0' }}
    >
      <HStack
        pos='absolute'
        px={'65px'}
        top='65px'
        w='100%'
        justify={'space-between'}
        zIndex={2}
      >
        <Logo imageProps={{ maxW: '90px' }} />
        <UserAvatar avatarProps={{ size: 'sm' }} />
      </HStack>
      <HStack position={'absolute'} w='100%' h='100vh'>
        <CompleteInfoLeftCol />
        {!hasVerifiedPhone ? (
          step === 'send-otp' ? (
            <SendOTPComponent
              onSuccess={(p) => {
                setPhone(p);
                setStep('verify-otp');
              }}
            />
          ) : (
            phone && user && <VerifyOTPComponent {...{ phone, user }} />
          )
        ) : (
          <AlreadyVerifiedComponent />
        )}
        {!hasVerifiedPhone && (
          <Button
            pos={'absolute'}
            bottom='32px'
            right='65px'
            variant='ghost'
            opacity='.6'
            fontWeight={'medium'}
          >
            Complete Later
          </Button>
        )}
      </HStack>
    </Layout>
  );
};
export default withApollo(VerifyPhoneNumberPage);
