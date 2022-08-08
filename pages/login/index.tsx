import { Heading } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import { LoginResponseType } from 'modules/auth/login/login.types';
import LoginWithAuthProviders from 'modules/auth/login/LoginWithAuthProviders';
import router from 'next/router';
import React from 'react';
import styles from 'styles/login.module.css';
import { getUrlBaseOnUserInfo } from 'utils/getUrlBasedOnUserInfo';
import { LoginForm } from '../../modules/auth/login/LoginForm';

interface LoginPageProps {
  title?: string;
  onSuccess?: (data: LoginResponseType) => void;
  onLoginFailure?: Function;
}

const LoginPage: React.FC<LoginPageProps> = ({ title, onSuccess }) => {
  const toaster = useToast();

  const onLoginWithAuthProviderSuccess = async (data: LoginResponseType) => {
    if (!data) return onFailure();
    if (onSuccess) {
      onSuccess(data);
      return;
    }
    const redirectURL = getUrlBaseOnUserInfo(data.data?.user, 'login');
    return router.push(redirectURL);
  };

  const onFailure = () =>
    toaster({
      variant: 'subtle',
      status: 'error',
      title: 'Error',
      description: 'Something went wrong, Please try again later',
    });

  const navigateToURL = () => {
    router.push(router?.query?.next ? router?.query?.next.toString() : '/');
  };

  return (
    <Layout title='Welcome Back - Paaws'>
      <div className={styles['login-page-container']}>
        <Heading size='lg'>
          {title ? (
            title
          ) : (
            <span aria-label='waving hand' role='img'>
              Welcome Back 👋
            </span>
          )}
        </Heading>
        <LoginWithAuthProviders
          {...{ onSuccess: onLoginWithAuthProviderSuccess, onFailure }}
        />

        <p className='divider-with-centered-value'>or</p>
        <LoginForm
          onSuccess={(data) => {
            if (onSuccess) {
              onSuccess(data);
              return;
            }
            navigateToURL();
          }}
          onFailure={onFailure}
        />
      </div>
    </Layout>
  );
};
export default LoginPage;
