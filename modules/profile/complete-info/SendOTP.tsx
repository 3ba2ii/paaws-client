import { Button, HStack, VStack } from '@chakra-ui/react';
import InputField from 'components/input/InputField';
import { Form, Formik } from 'formik';
import { useSendOtpMutation } from 'generated/graphql';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { useRouter } from 'next/router';
import React from 'react';
import { toErrorMap } from 'utils/helpers/toErrorMap';

interface SendOTPProps {
  onSuccess: (phone: string) => void;
}

const SendOTPComponent: React.FC<SendOTPProps> = ({ onSuccess }) => {
  const { user } = useRequireAuth();
  const [sendOTP] = useSendOtpMutation();
  const router = useRouter();

  return (
    <VStack alignItems='flex-start' flex={['1', '.75', '.75', '.75']} w='100%'>
      <Formik
        initialValues={{ phone: '' }}
        onSubmit={async ({ phone }, { setErrors }) => {
          if (!phone || !user) return;
          const { data } = await sendOTP({
            variables: {
              email: user.email,
              sendOtpPhone: phone.toString(),
            },
          });

          /* map the error */
          if (data?.sendOTP.errors?.length) {
            const mappedErrors = toErrorMap(data?.sendOTP?.errors);
            return setErrors(mappedErrors);
          }
          onSuccess(phone);
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '100%' }}>
            <VStack w='100%' alignItems='flex-start' spacing={5}>
              <InputField
                label='Phone Number'
                name='phone'
                placeholder='+201029111763'
                helperText='Your phone number will be visible just for you and you can use it to login anytime after verification'
                required
              />
              <HStack w='100%' justifyContent='flex-end'>
                <Button
                  variant='ghost'
                  fontSize='sm'
                  onClick={() => router.back()}
                >
                  Back
                </Button>

                <Button
                  isLoading={isSubmitting}
                  colorScheme={'teal'}
                  type='submit'
                  px={4}
                  fontSize='sm'
                >
                  Send OTP
                </Button>
              </HStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default SendOTPComponent;
