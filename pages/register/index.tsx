import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { Heading } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';
import { FaApple, FaFacebook, FaHeart } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Layout } from '../../components/Layout';
import registerS from '../../styles/register.module.css';

const CustomColorScheme = {
  facebook: {
    light: {
      colorScheme: 'facebook',
    },
    dark: {
      bg: 'facebook.500',
      color: 'whiteAlpha.900',
      _hover: { bg: 'same', filter: 'brightness(1.1)' },
    },
  },
  apple: {
    light: {
      bg: 'black',
      color: 'whiteAlpha.900',
      _hover: { bg: 'same', filter: 'brightness(1.5)' },
    },
    dark: {
      bg: 'whiteAlpha.900',
      color: 'gray.900',
      _hover: { bg: 'same', filter: 'brightness(1.3)' },
    },
  },
};
const RegisterPage: React.FC = () => {
  const { colorMode } = useColorMode();
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
            boxShadow='sm'
            w={'100%'}
            leftIcon={<FaFacebook size='20px' />}
            {...CustomColorScheme.facebook[colorMode]}
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
            {...CustomColorScheme.apple[colorMode]}
          >
            Sign up with Apple
          </Button>

          <p className='divider-with-centered-value'>or</p>
          <Link href='/register/email'>
            <Button
              as={Button}
              borderRadius='lg'
              boxShadow='sm'
              className={registerS['apple-button']}
              leftIcon={<FaHeart color={'red'} size='20px' />}
              w={'100%'}
              variant='solid'
            >
              Sign up with Email
            </Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
};
export default RegisterPage;
