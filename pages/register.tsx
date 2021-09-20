import { Button } from '@chakra-ui/button';
import { Divider, Flex, Heading } from '@chakra-ui/layout';
import React from 'react';
import { FaApple, FaFacebook, FaFacebookF, FaHeart } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Layout } from '../components/Layout';
import registerS from '../styles/register.module.css';

interface loginProps {}

const RegisterPage: React.FC<loginProps> = ({}) => {
  return (
    <Layout title={'Create Account and Join Paaws'}>
      <main className={registerS['main-page-content-wrapper']}>
        <Heading size='xl'>Sign up now</Heading>
        <div className={registerS['signup-options']}>
          <Button
            borderRadius='lg'
            leftIcon={<FcGoogle size='20px' />}
            w={'100%'}
            variant='outline'
            boxShadow='sm'
          >
            Sign up with Google
          </Button>
          <Button
            borderRadius='lg'
            colorScheme='facebook'
            boxShadow='sm'
            w={'100%'}
            leftIcon={<FaFacebook size='20px' />}
          >
            Sign up with Facebook
          </Button>
          <Button
            borderRadius='lg'
            boxShadow='sm'
            className={registerS['apple-button']}
            leftIcon={<FaApple size='20px' />}
            w={'100%'}
            variant='solid'
          >
            Sign up with Apple
          </Button>

          <Flex flexDirection='row' alignItems='center'>
            <Divider />
            <small>or</small>
            <Divider />
          </Flex>
          <Button
            borderRadius='lg'
            boxShadow='sm'
            className={registerS['apple-button']}
            leftIcon={<FaHeart color={'red'} size='20px' />}
            colorScheme='gray'
            w={'100%'}
            variant='solid'
          >
            Sign up with Email
          </Button>
        </div>
      </main>
    </Layout>
  );
};
export default RegisterPage;
