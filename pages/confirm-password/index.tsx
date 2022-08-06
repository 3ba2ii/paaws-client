import { LoginForm } from 'modules/auth/login/LoginForm';
import LoginWithAuthProviders from 'modules/auth/login/LoginWithAuthProviders';
import React from 'react';
import withApollo from 'utils/withApollo';

interface ConfirmPasswordPageProps {
  onSuccess: Function;
  onFailure: Function;
}

const ConfirmPasswordPage: React.FC<ConfirmPasswordPageProps> = ({
  onSuccess,
  onFailure,
}) => {
  /* This flows like this
        1. User enters his password
        2. If correct -> call onSuccess callback function
        3. If not -> call onFailure callback function
    
    */
  /* This page will be shown on changing critical information, Like changing account email, deleting account, and so on */
  return (
    <main>
      <h2>
        This action requires authorization, So Please confirm your password
      </h2>
      <LoginWithAuthProviders onSuccess={onSuccess} onFailure={onFailure} />
      <LoginForm onSuccess={onSuccess} onFailure={onFailure} />
    </main>
  );
};
export default withApollo(ConfirmPasswordPage);
