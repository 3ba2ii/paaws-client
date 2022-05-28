import { Button, Heading, VStack } from '@chakra-ui/react';
import { useIsAuth } from 'hooks/useIsAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import SendOTPComponent from 'modules/profile/complete-info/SendOTP';
import VerifyOTPComponent from 'modules/profile/complete-info/VerifyPhoneNumber';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoVerified } from 'react-icons/go';
import withApollo from 'utils/withApollo';

const AlreadyVerifiedComponent = () => {
  const router = useRouter();

  return (
    <VStack flex={['1', '.75', '.75', '.75']} spacing={5}>
      <GoVerified color='green' size={'42px'} />
      <Heading size='sm' textAlign={'center'} maxW='50ch' lineHeight={'1.5'}>
        You already have a verified phone number, If you want to change it,
        Please head to the settings page and delete your phone number.
      </Heading>
      <Button onClick={() => router.back()}>Go Back</Button>
    </VStack>
  );
};

const VerifyPhoneNumberPage: React.FC = () => {
  const { user } = useIsAuth();

  const [step, setStep] = useState<'send-otp' | 'verify-otp'>('send-otp');
  const [phone, setPhone] = useState<string | null>(null);

  const hasVerifiedPhone: boolean = !!(
    user &&
    user.phone &&
    user.phoneVerified
  );

  return (
    <CompleteInfoLayout pageTitle='Verify Phone Number - Paaws'>
      <VStack spacing={'24px'}>
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
      </VStack>
    </CompleteInfoLayout>
  );
};
export default withApollo(VerifyPhoneNumberPage);
