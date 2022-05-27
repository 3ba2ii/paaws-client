import { Heading } from '@chakra-ui/layout';
import { Button, useToast } from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import {
  MeDocument,
  MeQuery,
  ProviderTypes,
  useLoginWithAuthProviderMutation,
  User,
} from 'generated/graphql';
import router from 'next/router';
import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import styles from 'styles/login.module.css';
import withApollo from 'utils/withApollo';
import { LoginForm } from '../../modules/auth/login/LoginForm';

const LoginPage: React.FC = () => {
  const toaster = useToast();
  const [externalLogin] = useLoginWithAuthProviderMutation();

  const onSuccess = async (response: GoogleLoginResponse) => {
    const { tokenId } = response;

    const { data } = await externalLogin({
      variables: { provider: ProviderTypes.Google, providerId: tokenId },
      update: (cache, { data: returnedData }) => {
        if (!returnedData) return;

        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: returnedData?.loginWithAuthProvider?.user as User | null,
          },
        });
      },
    });

    if (
      !data ||
      data.loginWithAuthProvider.errors?.length ||
      !data.loginWithAuthProvider.user
    ) {
      return onFailure();
    }
    //check if the user verified his phone number or not
    const { phone, phoneVerified, lat, lng, bio } =
      data.loginWithAuthProvider.user;
    if (!phoneVerified && !phone) {
      //if the user did not verify his phone number then redirect to the verify phone number page
      return router.push('/profile/complete-info/phone-number');
    }

    if (!bio || bio === '') {
      return router.push('/profile/complete-info/bio');
    }
    //redirect the user to the next step
    if (!lat || !lng) {
      return router.push('/profile/complete-info/location');
    }

    return router.push('/');
  };

  const onFailure = () =>
    toaster({
      variant: 'subtle',
      status: 'error',
      title: 'Error',
      description: 'Something went wrong, Please try again later',
    });

  return (
    <Layout title='Welcome Back - Paaws'>
      <div className={styles['login-page-container']}>
        <Heading size='xl'>
          Welcome Back{' '}
          <span aria-label='waving hand' role='img'>
            👋
          </span>
        </Heading>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
          render={(renderProps) => (
            <Button
              borderRadius='lg'
              leftIcon={<FcGoogle size='20px' />}
              w={'100%'}
              variant='outline'
              boxShadow='sm'
              size='md'
              {...renderProps}
            >
              Continue with Google
            </Button>
          )}
          buttonText='Login'
          onSuccess={(response) => onSuccess(response as GoogleLoginResponse)}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />

        <p className='divider-with-centered-value'>or</p>
        <LoginForm />
      </div>
    </Layout>
  );
};
export default withApollo(LoginPage);
