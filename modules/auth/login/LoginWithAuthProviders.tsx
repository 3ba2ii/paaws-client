import { Button } from '@chakra-ui/react';
import { ProviderTypes } from 'generated/graphql';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import GoogleLogin, {
  GoogleLoginProps,
  GoogleLoginResponse,
} from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { LoginResponseType } from './login.types';

interface LoginWithAuthProvidersProps {
  onSuccess?: (data: LoginResponseType) => void;
  onFailure?: Function;
  googleLoginProps?: GoogleLoginProps;
}

const LoginWithAuthProviders: React.FC<LoginWithAuthProvidersProps> = ({
  onSuccess,
  onFailure,
  googleLoginProps,
}) => {
  const auth = useAuth();
  const handleSuccess = async (response: GoogleLoginResponse) => {
    const { tokenId } = response;
    const data = await auth.signinWithAuthProvider(
      ProviderTypes.Google,
      tokenId
    );

    if (
      !data ||
      !data.loginWithAuthProvider.user ||
      data.loginWithAuthProvider.errors?.length
    ) {
      onFailure && onFailure();
      return;
    }
    onSuccess && onSuccess({ data: data.loginWithAuthProvider });
  };

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
      onSuccess={(response) => handleSuccess(response as GoogleLoginResponse)}
      onFailure={() => onFailure && onFailure()}
      cookiePolicy={'single_host_origin'}
      {...googleLoginProps}
    />
  );
};
export default LoginWithAuthProviders;
