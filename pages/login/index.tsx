import { Heading } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import { LoginWithAuthProviderMutationResult } from 'generated/graphql';
import { useAuth } from 'hooks/useAuth';
import LoginWithAuthProviders from 'modules/auth/login/LoginWithAuthProviders';
import router from 'next/router';
import React from 'react';
import styles from 'styles/login.module.css';
import { getUrlBaseOnUserInfo } from 'utils/getUrlBasedOnUserInfo';
import withApollo from 'utils/withApollo';
import { LoginForm } from '../../modules/auth/login/LoginForm';

interface LoginPageProps {
  title?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ title }) => {
  const toaster = useToast();
  const onSuccess = async (
    data: LoginWithAuthProviderMutationResult['data']
  ) => {
    if (!data) return onFailure();
    const redirectURL = getUrlBaseOnUserInfo(
      data.loginWithAuthProvider.user,
      'login'
    );
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
        <Heading size='xl'>
          {title ? (
            title
          ) : (
            <span aria-label='waving hand' role='img'>
              Welcome Back 👋
            </span>
          )}
        </Heading>
        <LoginWithAuthProviders {...{ onSuccess, onFailure }} />

        <p className='divider-with-centered-value'>or</p>
        <LoginForm onSuccess={navigateToURL} onFailure={onFailure} />
      </div>
    </Layout>
  );
};
export default withApollo(LoginPage);
