import { Button, Heading, HStack, VStack } from '@chakra-ui/react';
import InputField from 'components/input/InputField';
import GenericModal from 'components/overlays/CustomModal';
import { Form, Formik } from 'formik';
import { useGenerateAuthTokenMutation } from 'generated/graphql';
import { useAuth } from 'hooks/useAuth';
import { LoginResponseType } from 'modules/auth/login/login.types';
import LoginWithAuthProviders from 'modules/auth/login/LoginWithAuthProviders';
import React from 'react';
import { GoogleLoginProps } from 'react-google-login';
import { toErrorMap } from 'utils/helpers/toErrorMap';

interface AuthModalProps {
  onSuccess: (authToken: string, authAction: string) => void;
  onFailure: Function;
  onClose: VoidFunction;
  isOpen: boolean;
  authAction: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  onSuccess,
  onFailure,
  isOpen,
  authAction,
  onClose,
}) => {
  const { user, signin } = useAuth();

  const [generateAuthToken] = useGenerateAuthTokenMutation();

  const handleGenerateAuthToken = async () => {
    const { data } = await generateAuthToken({ variables: { authAction } });

    const authToken = data?.generateAuthToken?.authToken;

    return authToken ? onSuccess(authToken, authAction) : onFailure();
  };

  const onLoginSuccess = async ({ data: loginResponse }: LoginResponseType) => {
    if (
      !loginResponse ||
      !loginResponse.user ||
      loginResponse?.user.id !== user?.id
    ) {
      return onFailure();
    }
    handleGenerateAuthToken();
  };
  return (
    <GenericModal
      body={
        <VStack>
          <LoginWithAuthProviders
            {...{
              onSuccess: onLoginSuccess,
              onFailure,
              googleLoginProps: {
                loginHint: user?.email || 'undefined',
                prompt: 'select_account',
              } as GoogleLoginProps,
            }}
          />

          <p className='divider-with-centered-value'>or</p>

          <Formik
            initialValues={{ password: '' }}
            onSubmit={async ({ password }, { setErrors }) => {
              if (!user) return onFailure();
              const { email } = user;
              const data = await signin({ identifier: email, password });

              if (!data || !data.login || data.login.errors?.length) {
                const errorMap = toErrorMap(data?.login?.errors || []);
                setErrors(errorMap);

                return onFailure();
              }

              onLoginSuccess({ data: data.login });
            }}
          >
            {({ values }) => (
              <Form autoComplete='off' style={{ width: '100%' }}>
                <VStack w='100%' spacing={5}>
                  <InputField
                    label='Password'
                    name='password'
                    type='password'
                    placeholder='**********'
                    value={values.password}
                    autoComplete='new-password'
                  />
                  <HStack w='100%'>
                    <Button
                      onClick={onClose}
                      flex='.25'
                      variant='ghost'
                      w='100%'
                      type='reset'
                    >
                      Cancel
                    </Button>
                    <Button
                      flex={'.75'}
                      colorScheme={'teal'}
                      w='100%'
                      type='submit'
                    >
                      Sign in
                    </Button>
                  </HStack>
                </VStack>
              </Form>
            )}
          </Formik>
        </VStack>
      }
      title={
        <Heading
          mt={5}
          mb={3}
          lineHeight='1.5'
          size='md'
          w='100%'
          textAlign={'left'}
        >
          This action requires authentication,
          <br />
          so please sign in to continue
        </Heading>
      }
      footer={<></>}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
export default AuthModal;
