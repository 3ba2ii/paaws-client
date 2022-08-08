import { ApolloCache } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import {
  BaseRegisterInput,
  LoginInput,
  LoginMutationResult,
  MeQuery,
  RegisterMutationResult,
  SendEmailVerificationMailMutationResult,
  useLoginMutation,
  useLoginWithAuthProviderMutation,
  useLogoutMutation,
  useMeQuery,
  User,
  useRegisterMutation,
  useRegisterWithProviderMutation,
  useSendEmailVerificationMailMutation,
} from 'generated/graphql';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import {
  LoginWithAuthProviderMutationResult,
  ProviderTypes,
} from '../generated/graphql';

const authContext = createContext({} as ReturnType<typeof useProvideAuth>);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const router = useRouter();
  const toaster = useToast();
  const { data: userData, loading } = useMeQuery({
    fetchPolicy: 'cache-first',
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [user, setUser] = useState<MeQuery['me'] | null>(null);
  const [loginMutation] = useLoginMutation();
  const [externalLogin] = useLoginWithAuthProviderMutation();
  const [logout] = useLogoutMutation();
  const [register] = useRegisterMutation();
  const [externalRegister] = useRegisterWithProviderMutation();
  const [sendVerificationEmail, { loading: isSendingVerificationEmail }] =
    useSendEmailVerificationMailMutation();

  const handleUserChange = (cache: ApolloCache<any>, authedUser: User) => {
    updateMeQueryCache(cache, authedUser);
    setUser(authedUser);
  };

  const signinWithAuthProvider = async (
    provider: ProviderTypes,
    tokenId: string
  ): Promise<LoginWithAuthProviderMutationResult['data']> => {
    const { data } = await externalLogin({
      variables: { provider, providerId: tokenId },
      update: (cache, { data: returnedData }) => {
        if (!returnedData) return;
        const loggedInUser = returnedData.loginWithAuthProvider.user;
        updateMeQueryCache(cache, loggedInUser);
        setUser(loggedInUser);
      },
    });

    return data;
  };
  const signin = async ({
    identifier,
    password,
  }: LoginInput): Promise<LoginMutationResult['data']> => {
    const { data } = await loginMutation({
      variables: { loginOptions: { identifier, password } },
      update: (cache, { data: returnedData }) => {
        if (!returnedData || !returnedData.login.user) return;
        handleUserChange(cache, returnedData.login.user as User);
      },
    });
    return data;
  };
  const signUpWithAuthProvider = async (
    provider: ProviderTypes,
    tokenId: string
  ) => {
    const { data } = await externalRegister({
      variables: { provider, providerId: tokenId },
      update: (cache, { data: returnedData }) => {
        if (!returnedData) return;
        handleUserChange(
          cache,
          returnedData?.registerWithAuthProvider?.user as User
        );
      },
    });
    return data;
  };
  const signup = async ({
    email,
    password,
    confirmPassword,
    full_name,
  }: BaseRegisterInput): Promise<RegisterMutationResult['data']> => {
    const { data } = await register({
      variables: {
        registerOptions: {
          email,
          password,
          confirmPassword,
          full_name,
        },
      },
      update: (cache, { data: returnedData }) => {
        if (!returnedData || !returnedData.register.user) return;
        handleUserChange(cache, returnedData.register.user as User);
      },
      onError: (_err) => {
        return toaster({
          title: 'Something went wrong',
          description:
            'We could not create your account right now, Please try again later.',
          status: 'error',
          isClosable: true,
          position: 'bottom-right',
        });
      },
    });

    return data;
  };
  const signout = async () => {
    try {
      await logout({
        update: (cache, { data: res }) => {
          if (!res) return;
          cache.evict({});
          router.reload();
        },
      });
    } catch {
      toaster({
        title: 'We could not log you out right now',
        description:
          'An error occurred while logging you out, Please try again',
        status: 'error',
        position: 'bottom-right',
        isClosable: true,
      });
    }
  };

  const confirmPasswordReset = () => {};

  const sendVerifyEmail = async (): Promise<
    SendEmailVerificationMailMutationResult['data']
  > => {
    if (!user) return null;
    setActionLoading(true);
    const { data } = await sendVerificationEmail({
      variables: { email: user.email.trim().toLowerCase() },
      update: (_cache, { data: result }) => {
        if (result?.sendVerificationMail.success) {
          toaster({
            isClosable: true,
            position: 'top-right',
            status: 'success',
            variant: 'subtle',
            title: 'Email sent 💌',
            description: 'Please check your inbox for a message from us',
          });
        }
      },
    });
    setActionLoading(false);
    return data;
  };

  useEffect(() => {
    if (!loading && userData?.me) {
      setUser(userData.me);
    }
  }, [userData, loading]);

  // Return the user object and auth methods
  return {
    user: userData?.me || user,
    isLoadingUserInfo: loading,
    signin,
    signinWithAuthProvider,
    confirmPasswordReset,
    signUpWithAuthProvider,
    signup,
    signout,
    sendVerifyEmail,
  };
}

const ProviderAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export default ProviderAuth;
