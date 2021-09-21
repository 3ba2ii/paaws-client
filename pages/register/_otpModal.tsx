import { Button, IconButton } from '@chakra-ui/button';
import { HStack, Text } from '@chakra-ui/layout';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import GenericModal from 'components/GenericModal';
import { FormikErrors } from 'formik';
import { useRegisterMutation } from 'generated/graphql';
import Router from 'next/router';
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { toErrorMap } from 'utils/toErrorMap';

type OTPModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userInfo: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
  };
  handleResendOTP: () => Promise<void>;
  setErrors: (
    errors: FormikErrors<{
      full_name: string;
      password: string;
      confirmPassword: string;
      email: string;
      agree: boolean;
      phone: string;
      otp: null;
    }>
  ) => void;

  isSubmitting: boolean;
};
export function OTPModal({
  isOpen,
  onClose,
  userInfo,
  handleResendOTP,
  setErrors,
  isSubmitting,
}: OTPModalProps) {
  console.log(`🚀 ~ file: _otpModal.tsx ~ line 39 ~ userInfo`, userInfo);
  const [createUserAccount] = useRegisterMutation();
  const [otpError, setOTPError] = useState('');

  const handleCreateUserAccount = async (otp: string) => {
    //create account with otp
    const { data } = await createUserAccount({
      variables: {
        registerRegisterOptions: {
          email: userInfo.email,
          password: userInfo.password,
          full_name: userInfo.full_name,
          phone: userInfo.phone,
          otp: parseInt(otp),
        },
      },
    });

    if (data?.register?.errors) {
      const errorsMapped = toErrorMap(data?.register?.errors);
      if (errorsMapped.email) {
        setErrors(errorsMapped);
        return onClose();
      }
      return setOTPError('Invalid OTP');
    }
    setOTPError('');
    onClose();
    //Redirect to login page for now
    Router.push('/login');
  };

  const OtpModalBody = () => (
    <>
      <Text lineHeight='4' textAlign='center' color='gray.500'>
        {`Enter the OTP sent to ${userInfo.phone}`},<br /> didn't receive one?{' '}
        {
          <Button
            colorScheme='blue'
            fontWeight={500}
            variant='ghost'
            onClick={handleResendOTP}
            isLoading={isSubmitting}
            p={0}
          >
            Resend
          </Button>
        }
      </Text>

      <HStack direction='row' justify='center' w='100%' pt={4}>
        <PinInput
          isInvalid={!!otpError}
          size='md'
          otp
          placeholder='🥳'
          onComplete={handleCreateUserAccount}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
    </>
  );

  const OtpModalTitle = () => (
    <>
      <IconButton
        aria-label='verify-otp'
        icon={<FaHeart color='teal' />}
        bg='green.100'
        rounded='full'
        mt={4}
        _hover={{ bg: 'teal.100' }}
        cursor='unset'
        _active={{ bg: 'teal.100' }}
      />
      <Text pt={4}>Verify your Phone Number</Text>
    </>
  );
  return (
    <GenericModal
      title={<OtpModalTitle />}
      isOpen={isOpen}
      onClose={onClose}
      body={<OtpModalBody />}
      confirmText='Verify'
    />
  );
}
