import {
  Button,
  HStack,
  PinInput,
  PinInputField,
  useToast,
  VStack,
} from '@chakra-ui/react';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import { Form, Formik, FormikHelpers } from 'formik';
import { MeQuery, useVerifyPhoneNumberMutation } from 'generated/graphql';
import router from 'next/router';
import React from 'react';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import { toErrorMap } from 'utils/helpers/toErrorMap';

interface IVerifyOTPProps {
  phone: string;
  user: MeQuery['me'];
}

const VerifyOTPComponent: React.FC<IVerifyOTPProps> = ({ phone, user }) => {
  const [verifyPhoneNumber] = useVerifyPhoneNumberMutation();
  const toaster = useToast();

  const handleSubmit = async (
    { otp }: { otp: string },
    { setErrors }: FormikHelpers<{ otp: string }>
  ) => {
    if (!user) return;
    if (!otp || !otp.length || !phone || !user) return;

    /* send verification request */
    const { data } = await verifyPhoneNumber({
      variables: { otp, phone },
      update: (cache, { data: result, errors }) => {
        if (!result || !result.verifyPhoneNumber.success || errors) {
          return;
        }
        updateMeQueryCache(cache, {
          ...user,
          phone,
          phoneVerified: true,
        });
      },
    });

    /* map the error */
    if (data?.verifyPhoneNumber.errors?.length) {
      const mappedErrors = toErrorMap(data?.verifyPhoneNumber?.errors);
      return setErrors(mappedErrors);
    }
    /* show a toaster */
    toaster({
      status: 'success',
      title: 'Voila! Phone number verified.',
      position: 'bottom-right',
      variant: 'subtle',
      isClosable: true,
    });
    return router.push('/profile/complete-info');
  };

  return (
    <VStack w='100%' flex={['1', '.75', '.75', '.75']}>
      <Formik initialValues={{ otp: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <VStack
              align='flex-start'
              spacing={6}
              minW='370px'
              maxW='fit-content'
            >
              <InputFieldWrapper
                label={`A 4-digit number has been sent to this phone number${
                  phone ? ' xxxxxxxx' + phone?.slice(-3) : ''
                }, Please type it in the box below `}
                name='otp'
                helperText='In case you didn’t receive an OTP, Click here to resend OTP'
                required
              >
                <HStack>
                  <PinInput
                    placeholder='🔢'
                    onChange={(val) => setFieldValue('otp', val.toString())}
                    otp
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </InputFieldWrapper>
              <HStack w='100%' justify={'flex-end'}>
                <Button
                  fontSize='sm'
                  variant='ghost'
                  type='reset'
                  onClick={() => router.push('/profile/complete-info')}
                >
                  Cancel
                </Button>

                <Button
                  isLoading={isSubmitting}
                  loadingText='Verifying...'
                  colorScheme={'teal'}
                  type='submit'
                  fontSize='sm'
                >
                  Verify Phone Number
                </Button>
              </HStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default VerifyOTPComponent;
