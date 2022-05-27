import { Button } from '@chakra-ui/button';
import { Heading } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import {
  MeDocument,
  MeQuery,
  ProviderTypes,
  User,
  useRegisterWithProviderMutation,
} from 'generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import withApollo from 'utils/withApollo';
import { Layout } from '../../components/common/Layout';
import styles from '../../styles/register.module.css';

const RegisterPage: React.FC = () => {
  /* we need to refactor this to have a context api 
    this needs to have 3 separate steps for registering
    1. Step 1 -> Get the email and full name and password ->  register request is sent after this step
    2. Step 2 -> Send otp and Verify phone number 
    3. Step 3 -> Set the location (FIXED) -> update user info
  */

  const [externalRegister] = useRegisterWithProviderMutation();
  const toaster = useToast();
  const router = useRouter();

  const onGoogleLogin = async (response: GoogleLoginResponse) => {
    //send a registration request to the server with the google token
    const { tokenId } = response;

    const { data } = await externalRegister({
      variables: { provider: ProviderTypes.Google, providerId: tokenId },
      update: (cache, { data: returnedData }) => {
        if (!returnedData) return;

        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: returnedData?.registerWithAuthProvider?.user as User | null,
          },
        });
      },
    });

    if (
      !data ||
      data.registerWithAuthProvider.errors?.length ||
      !data.registerWithAuthProvider.user
    ) {
      return toaster({
        variant: 'subtle',
        status: 'error',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
    //check if the user verified his phone number or not
    const { phone, phoneVerified, lat, lng, bio } =
      data.registerWithAuthProvider.user;
    if (!phoneVerified && !phone) {
      //if the user did not verify his phone number then redirect to the verify phone number page
      return router.push('/profile/complete-info/phone-number');
    }
    //otherwise redirect the user to the bio step

    if (!bio || bio === '') {
      return router.push('/profile/complete-info/bio');
    }

    if (!lat || !lng) {
      return router.push('/profile/complete-info/location');
    }

    return router.push('/');
  };

  return (
    <Layout title={'Create Account and Join Paaws'}>
      <main className={styles['main-page-content-wrapper']}>
        <Heading size='xl'>Sign up now</Heading>
        <div className={styles['signup-options']}>
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
                Sing up with Google
              </Button>
            )}
            cookiePolicy={'single_host_origin'}
            onSuccess={(response) => {
              onGoogleLogin(response as GoogleLoginResponse);
            }}
            onFailure={() => {
              toaster({
                position: 'top-right',
                status: 'error',
                variant: 'subtle',
                isClosable: true,
                title: 'Sorry we could not register you right now',
                description:
                  'An error occurred while trying to sign you up, please try again',
              });
            }}
          />

          <p className='divider-with-centered-value'>or</p>
          <Link href='/register/email'>
            <Button
              borderRadius='lg'
              boxShadow='sm'
              className={styles['apple-button']}
              w={'100%'}
              variant='solid'
            >
              💖 Sign up with email
            </Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
};
export default withApollo(RegisterPage);
