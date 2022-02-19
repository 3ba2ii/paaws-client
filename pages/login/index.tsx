import { Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import styles from 'styles/login.module.css';
import withApollo from 'utils/withApollo';
import { LoginForm } from '../../modules/auth/login/LoginForm';

const LoginPage: React.FC = () => {
  const onSuccess = (response: GoogleLoginResponse) => {
    console.log(
      `🚀 ~ file: index.tsx ~ line 13 ~ onSuccess ~ response`,
      response.getAuthResponse().id_token
    );
    //save the response to the context api
    //If the user is already signed up then redirect to the home page

    //If the user is not signed up then redirect to the register page to continue the sign up process
  };
  const onFailure = (response: any) => {};
  return (
    <Layout title='Welcome Back'>
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
              size='lg'
              {...renderProps}
            >
              Continue with Google
            </Button>
          )}
          buttonText='Login'
          onSuccess={onSuccess}
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
