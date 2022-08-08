import GenericModal from 'components/overlays/CustomModal';
import { useGenerateAuthTokenMutation } from 'generated/graphql';
import { useAuth } from 'hooks/useAuth';
import { LoginResponseType } from 'modules/auth/login/login.types';
import LoginPage from 'pages/login';
import React from 'react';
interface ConfirmPasswordPageProps {
  onSuccess: (authToken: string, authAction: string) => void;
  onFailure: Function;
  isOpen: boolean;
  authAction: string;
}

const ConfirmPasswordPage: React.FC<ConfirmPasswordPageProps> = ({
  onSuccess,
  onFailure,
  isOpen,
  authAction,
}) => {
  const { user } = useAuth();
  /* This flows like this
        1. User enters his password
        2. If correct -> call onSuccess callback function
        3. If not -> call onFailure callback function
    
    */
  /* This page will be shown on changing critical information, Like changing account email, deleting account, and so on */
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

    /* 2. if yes -> 
          a.generate an AuthToken
          b. call onSuccess callback function with the AuthToken and the authAction
    */

    const { data } = await generateAuthToken({ variables: { authAction } });
    console.log(`🚀 ~ file: index.tsx ~ line 29 ~ onLoginSuccess ~ data`, data);

    if (!data?.generateAuthToken.authToken) {
      return onFailure();
    }
    //onSuccess
    onSuccess(data.generateAuthToken.authToken, authAction);
  };
  return (
    <GenericModal
      body={
        <LoginPage
          title='This action requires you to confirm your password'
          onSuccess={onLoginSuccess}
          onLoginFailure={onFailure}
        />
      }
      isOpen={isOpen}
      onClose={() => {}}
    />
  );
};
export default ConfirmPasswordPage;
