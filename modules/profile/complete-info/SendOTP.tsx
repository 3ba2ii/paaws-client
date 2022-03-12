import { Button, VStack } from '@chakra-ui/react';
import InputField from 'components/common/input/InputField';
import { Form, Formik } from 'formik';
import { useSendOtpMutation } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import React from 'react';
import { toErrorMap } from 'utils/toErrorMap';

interface SendOTPProps {
  onSuccess: (phone: string) => void;
}

const SendOTPComponent: React.FC<SendOTPProps> = ({ onSuccess }) => {
  const { user } = useIsAuth();
  const [sendOTP] = useSendOtpMutation();

  return (
    <VStack flex={['1', '.75', '.75', '.75']} w='100%'>
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
          <Form>
            <VStack align='flex-start' spacing={5}>
              <InputField
                label='Phone Number'
                name='phone'
                placeholder='+201029111763'
                helperText='Your phone number will be visible just for you and you can use it to login anytime after verification'
                required
              />
              <Button
                isLoading={isSubmitting}
                colorScheme={'teal'}
                type='submit'
                px={4}
                fontSize='sm'
              >
                Send OTP
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default SendOTPComponent;
