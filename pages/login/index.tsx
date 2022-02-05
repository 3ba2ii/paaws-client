import { Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from 'styles/login.module.css';
import withApollo from 'utils/withApollo';
import { LoginForm } from '../../modules/auth/login/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Layout title='Welcome Back'>
      <div className={styles['login-page-container']}>
        <Heading size='xl'>
          Welcome Back{' '}
          <span aria-label='waving hand' role='img'>
            👋
          </span>
        </Heading>
        <Button
          borderRadius='lg'
          leftIcon={<FcGoogle size='20px' />}
          w={'100%'}
          variant='outline'
          boxShadow='sm'
          size='lg'
        >
          Continue with Google
        </Button>

        <p className='divider-with-centered-value'>or</p>

        <LoginForm />
      </div>
    </Layout>
  );
};
export default withApollo(LoginPage);
