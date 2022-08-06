import { Button } from '@chakra-ui/react';
import React from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';

interface LoginWithAuthProvidersProps {
  onSuccess: Function;
  onFailure: Function;
}

const LoginWithAuthProviders: React.FC<LoginWithAuthProvidersProps> = ({
  onSuccess,
  onFailure,
}) => {
  return (
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
      onFailure={() => onFailure()}
      cookiePolicy={'single_host_origin'}
    />
  );
};
export default LoginWithAuthProviders;
