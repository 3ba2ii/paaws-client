import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useRequireAuth } from 'hooks/useRequireAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import SendOTPComponent from 'modules/profile/complete-info/SendOTP';
import VerifyOTPComponent from 'modules/profile/complete-info/VerifyPhoneNumber';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import withApollo from 'utils/withApollo';

const AlreadyVerifiedComponent = () => {
  const router = useRouter();

  return (
    <VStack
      alignItems='flex-start'
      flex={['1', '.75', '.75', '.75']}
      spacing={5}
    >
      <Heading size='sm' maxW='50ch' lineHeight={'1.5'} my={2}>
        ✅ You already have a verified phone number, If you want to change it,
        Please head to the settings page and delete your phone number and come
        back.
      </Heading>
      <Button onClick={() => router.back()}>Go back</Button>
    </VStack>
  );
};

const VerifyPhoneNumberPage: React.FC = () => {
  const { user } = useRequireAuth();

  const [step, setStep] = useState<'send-otp' | 'verify-otp'>('send-otp');
  const [phone, setPhone] = useState<string | null>(null);

  const hasVerifiedPhone: boolean = !!(
    user &&
    user.phone &&
    user.phoneVerified
  );

  return (
    <CompleteInfoLayout pageTitle='Verify Phone Number - Paaws'>
      <VStack w='100%' maxW={['unset', '450px', '450px']} spacing='32px'>
        <VStack alignItems='flex-start' w='100%'>
          <Heading size='md'>Verify your Phone Number</Heading>
          <Text color='gray.500' fontSize='sm' maxW='65ch'>
            Help us secure your account by verifying your phone
          </Text>
        </VStack>
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
