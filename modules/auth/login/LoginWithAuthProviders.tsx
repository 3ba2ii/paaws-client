import { Button } from '@chakra-ui/react';
import {
  LoginWithAuthProviderMutationResult,
  ProviderTypes,
  useLoginWithAuthProviderMutation,
} from 'generated/graphql';
import React from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';

interface LoginWithAuthProvidersProps {
  onSuccess: (data: LoginWithAuthProviderMutationResult['data']) => void;
  onFailure: Function;
}

const LoginWithAuthProviders: React.FC<LoginWithAuthProvidersProps> = ({
  onSuccess,
  onFailure,
}) => {
  const [externalLogin] = useLoginWithAuthProviderMutation();

  const handleSuccess = async (response: GoogleLoginResponse) => {
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
    onSuccess && onSuccess(data);
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
      onFailure={() => onFailure()}
      cookiePolicy={'single_host_origin'}
    />
  );
};
export default LoginWithAuthProviders;
