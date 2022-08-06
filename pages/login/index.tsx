import { Heading } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import {
  ProviderTypes,
  useLoginWithAuthProviderMutation,
} from 'generated/graphql';
import LoginWithAuthProviders from 'modules/auth/login/LoginWithAuthProviders';
import router from 'next/router';
import React from 'react';
import { GoogleLoginResponse } from 'react-google-login';
import styles from 'styles/login.module.css';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import { getUrlBaseOnUserInfo } from 'utils/getUrlBasedOnUserInfo';
import withApollo from 'utils/withApollo';
import { LoginForm } from '../../modules/auth/login/LoginForm';

interface LoginPageProps {
  title?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ title }) => {
  const toaster = useToast();
  const [externalLogin] = useLoginWithAuthProviderMutation();

  const onSuccess = async (response: GoogleLoginResponse) => {
    const { tokenId } = response;

    const { data } = await externalLogin({
      variables: { provider: ProviderTypes.Google, providerId: tokenId },
      update: (cache, { data: returnedData }) => {
        if (!returnedData) return;
        updateMeQueryCache(cache, returnedData?.loginWithAuthProvider?.user);
      },
    });

    if (
      !data ||
      !data.loginWithAuthProvider.user ||
      data.loginWithAuthProvider.errors?.length
    ) {
      onFailure();
      return;
    }
    //check if the user verified his phone number or not
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
