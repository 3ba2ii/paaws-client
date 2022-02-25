import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import InputField from 'components/common/input/InputField';
import { Layout } from 'components/Layout';
import Logo from 'components/Logo';
import { UserAvatar } from 'components/UserAvatar';
import { Form, Formik } from 'formik';
import { useSendOtpMutation } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import React from 'react';
import { toErrorMap } from 'utils/toErrorMap';
import withApollo from 'utils/withApollo';

const CompleteInfoSideComponent = () => {
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
      <Heading color='gray.700' size='lg' fontWeight='bold'>
        Welcome to Paaws 🐶
      </Heading>
      <Text fontSize={'md'} fontW='semibold' color='gray.500'>
        Help us complete your profile and make it more attractive to users
      </Text>
    </VStack>
  );
};
interface PhoneNumberProps {}

const VerifyPhoneNumberPage: React.FC<PhoneNumberProps> = ({}) => {
  const { user } = useIsAuth();
  const [sendOTP, { called }] = useSendOtpMutation();
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

      {/* */}
      <HStack position={'absolute'} w='100%' h='100vh'>
        <CompleteInfoSideComponent />
        <VStack flex='.75' w='100%'>
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
                    type='number'
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
      </HStack>
    </Layout>
  );
};
export default withApollo(VerifyPhoneNumberPage);
