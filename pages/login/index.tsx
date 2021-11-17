import { Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { LazyCatLoadingComponent } from 'components/common/loading/LazyCatLoadingComponent';
import { Layout } from 'components/Layout';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from 'styles/login.module.css';
import withApollo from 'utils/withApollo';
import { LoginForm } from '../../modules/auth/login/LoginForm';

const LoginPage: React.FC = () => {
  const { data, loading } = useMeQuery();

  const router = useRouter();

  React.useEffect(() => {
    if (!loading && data?.me) {
      router.replace('/');
    }
  }, [data, router, loading]);
  return (
    <Layout title='Welcome Back'>
      {loading ? (
        <LazyCatLoadingComponent />
      ) : (
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
      )}
    </Layout>
  );
};
export default withApollo(LoginPage);
