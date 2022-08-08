import { Heading, VStack } from '@chakra-ui/react';
import GenericModal from 'components/overlays/CustomModal';
import { useGenerateAuthTokenMutation } from 'generated/graphql';
import { useAuth } from 'hooks/useAuth';
import { LoginResponseType } from 'modules/auth/login/login.types';
import { LoginForm } from 'modules/auth/login/LoginForm';
import LoginWithAuthProviders from 'modules/auth/login/LoginWithAuthProviders';
import React from 'react';
interface ConfirmPasswordPageProps {
  onSuccess: (authToken: string, authAction: string) => void;
  onFailure: Function;
  onClose: VoidFunction;
  isOpen: boolean;
  authAction: string;
}

const ConfirmPasswordPage: React.FC<ConfirmPasswordPageProps> = ({
  onSuccess,
  onFailure,
  isOpen,
  authAction,
  onClose,
}) => {
  const { user } = useAuth();

  const [generateAuthToken] = useGenerateAuthTokenMutation();

  const onLoginSuccess = async ({ data: loginResponse }: LoginResponseType) => {
    /* 1. check whether the logged in user is the same as the user returned form login response */
    if (
      !loginResponse ||
      !loginResponse.user ||
      loginResponse?.user.id !== user?.id
    ) {
      return onFailure();
    }

    const { data } = await generateAuthToken({ variables: { authAction } });

    if (!data?.generateAuthToken.authToken) {
      return onFailure();
    }
    //onSuccess
    onSuccess(data.generateAuthToken.authToken, authAction);
  };
  return (
    <GenericModal
      body={
        <VStack>
          <LoginWithAuthProviders
            {...{ onSuccess: onLoginSuccess, onFailure }}
          />

          <p className='divider-with-centered-value'>or</p>
          <LoginForm
            onSuccess={(data) => {
              if (onLoginSuccess) {
                onLoginSuccess(data);
                return;
              }
            }}
            onFailure={onFailure}
          />
        </VStack>
      }
      title={
        <Heading mt={5} mb={3} size='md' w='100%' textAlign={'left'}>
          This action requires authentication
        </Heading>
      }
      footer={<></>}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
export default ConfirmPasswordPage;
