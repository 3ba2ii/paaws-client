import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react';
import InputField from 'components/common/input/InputField';
import Logo from 'components/Logo';
import NotFound from 'components/NotFound';
import { Form, Formik } from 'formik';
import { useChangePasswordMutation } from 'generated/graphql';
import router, { useRouter } from 'next/router';
import React from 'react';
import withApollo from 'utils/withApollo';
import { ChangePasswordSchema } from 'utils/yupSchemas/ChangePasswordSchema';

const ChangePasswordPage: React.FC = ({}) => {
  const {
    query: { token },
  } = useRouter();
  const toaster = useToast();
  const [changePassword] = useChangePasswordMutation();

  return (
    <VStack w='100%' h='100%' py={10}>
      <VStack
        w='100%'
        h='100%'
        maxW={'450px'}
        px={7}
        py={10}
        borderRadius={6}
        boxShadow='lg'
        border={'1px solid '}
        borderColor='blackAlpha.400'
        spacing={10}
      >
        <Logo imageProps={{ maxW: '110px' }} />
        {!token ? (
          <NotFound
            title='Invalid Token'
            subtitle='The url you entered does not include a valid token, Please resend a new password reset email'
            backPath='/forgot-password'
            backText='Resend Password Reset Email'
          />
        ) : (
          <VStack w='100%'>
            <Heading size='md' fontWeight={'bold'} mb={4}>
              Reset your password
            </Heading>
            <Box w='100%'>
              <Formik
                initialValues={{
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={async ({ confirmPassword, password }) => {
                  const { data } = await changePassword({
                    variables: {
                      options: {
                        password,
                        confirmPassword,
                        token: token as string,
                      },
                    },
                  });

                  if (
                    !data ||
                    !data.changePassword.success ||
                    data.changePassword.errors?.length
                  ) {
                    //'Failure'
                    return toaster({
                      title: 'Password Reset Failed 🤔',
                      description:
                        'There were an error resetting your password, please try again later ',
                      status: 'error',
                      variant: 'subtle',
                      isClosable: true,
                    });
                  }
                  //success case
                  return toaster({
                    title: 'Password Changed Successfully 🎉',
                    description: 'You can now login with your new password',
                    status: 'success',
                    variant: 'subtle',
                    isClosable: true,
                    onCloseComplete: () => {
                      router.replace('/');
                    },
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <VStack w='100%' spacing={5}>
                      <InputField
                        name='password'
                        label='New Password'
                        id='password'
                        placeholder='Enter a new password'
                        type={'password'}
                        height='38px'
                        autoComplete='new-password'
                      />
                      <InputField
                        name='confirmPassword'
                        label='Confirm New Password'
                        id='confirmPassword'
                        placeholder='Confirm your new password'
                        type={'password'}
                        height='38px'
                        autoComplete='new-password'
                      />
                      <Button
                        w='100%'
                        size='sm'
                        colorScheme={'teal'}
                        borderRadius={3}
                        isLoading={isSubmitting}
                        type='submit'
                      >
                        Change password
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </Box>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};
export default withApollo(ChangePasswordPage);
