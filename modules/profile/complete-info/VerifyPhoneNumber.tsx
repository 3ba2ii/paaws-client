import {
  VStack,
  HStack,
  PinInput,
  PinInputField,
  Button,
  useToast,
} from '@chakra-ui/react';
import InputHOC from 'components/common/input/CustomInputComponent';
import { Formik, Form } from 'formik';
import { MeQuery, useVerifyPhoneNumberMutation } from 'generated/graphql';
import router from 'next/router';
import React from 'react';
import { toErrorMap } from 'utils/toErrorMap';

interface IVerifyOTPProps {
  phone: string;
  user: MeQuery['me'];
}

const VerifyOTPComponent: React.FC<IVerifyOTPProps> = ({ phone, user }) => {
  const [verifyPhoneNumber] = useVerifyPhoneNumberMutation();
  const toaster = useToast();

  return (
    <VStack w='100%' flex={['1', '.75', '.75', '.75']}>
      <Formik
        initialValues={{ otp: '' }}
        onSubmit={async ({ otp }, { setErrors }) => {
          if (!otp || !otp.length || !phone) return;

          /* send verification request */
          const { data } = await verifyPhoneNumber({
            variables: { otp, phone },
          });

          /* map the error */
          if (data?.verifyPhoneNumber.errors?.length) {
            const mappedErrors = toErrorMap(data?.verifyPhoneNumber?.errors);
            return setErrors(mappedErrors);
          }
          /* show a toaster */
          toaster({
            status: 'success',
            title: 'Phone Number Verified',
            description: 'You rock! 🤘',
            position: 'top-right',
            variant: 'subtle',
            isClosable: true,
          });
          /* redirect to the location page in case the user has no previous location*/
          if (!user?.lat || !user?.lng) {
            return router.push('/profile/complete-info/location');
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <VStack align='flex-start' spacing={5} maxW='450px'>
              <InputHOC
                label={`A 4-digit number has been sent to this phone number${
                  phone ? ' xxxxxxxx' + phone?.slice(-3) : ''
                }, Please type it in the box below `}
                name='otp'
                helperText='In case you didn’t receive an OTP, Click Resend OTP'
                required
              >
                <HStack>
                  <PinInput
                    otp
                    placeholder='😻'
                    onChange={(val) => setFieldValue('otp', val.toString())}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </InputHOC>
              <Button
                isLoading={isSubmitting}
                colorScheme={'teal'}
                type='submit'
                px={4}
                fontSize='sm'
              >
                Verify Phone Number
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default VerifyOTPComponent;