import {
  Box,
  Button,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import InputHOC from 'components/common/input/CustomInputComponent';
import InputField from 'components/common/input/InputField';
import { Layout } from 'components/Layout';
import Logo from 'components/Logo';
import { UserAvatar } from 'components/UserAvatar';
import { Form, Formik } from 'formik';
import {
  useSendOtpMutation,
  useVerifyPhoneNumberMutation,
} from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import SendOTPComponent from 'modules/profile/complete-info/SendOTP';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoVerified } from 'react-icons/go';
import { toErrorMap } from 'utils/toErrorMap';
import withApollo from 'utils/withApollo';

const CompleteInfoLeftCol = () => {
  return (
    <VStack
      w='100%'
      h='100%'
      flex='.33'
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
interface PhoneNumberProps {}

const VerifyPhoneNumberPage: React.FC<PhoneNumberProps> = () => {
  const { user } = useIsAuth();
  const toaster = useToast();
  const router = useRouter();

  const [step, setStep] = useState<'send-otp' | 'verify-otp'>('send-otp');
  const [phone, setPhone] = useState<string | null>(null);

  const [verifyPhoneNumber] = useVerifyPhoneNumberMutation();

  const userHasPhoneNumber: boolean = !!(
    user &&
    user.phone &&
    user.phoneVerified
  );

  const VerifyOTPComponent = () => {
    return (
      <VStack w='100%' flex='.75'>
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
        {userHasPhoneNumber ? (
          step === 'send-otp' ? (
            <SendOTPComponent
              onSuccess={(p) => {
                setPhone(p);
                setStep('verify-otp');
              }}
            />
          ) : (
            <VerifyOTPComponent />
          )
        ) : (
          <VStack flex='.75' spacing={5}>
            <GoVerified color='green' size={'42px'} />
            <Heading
              size='sm'
              textAlign={'center'}
              maxW='50ch'
              lineHeight={'1.5'}
            >
              You already have a verified phone number, If you want to change
              it, Please head to the settings page and delete your phone number.
            </Heading>
          </VStack>
        )}
        {!userHasPhoneNumber && (
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
