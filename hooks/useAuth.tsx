import {
  LoginInput,
  LoginMutationResult,
  MeQuery,
  useLoginMutation,
  useLoginWithAuthProviderMutation,
  useMeQuery,
} from 'generated/graphql';
import { createContext, useContext, useEffect, useState } from 'react';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import {
  LoginWithAuthProviderMutationResult,
  ProviderTypes,
} from '../generated/graphql';

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const { data: userData, loading } = useMeQuery({});
  const [user, setUser] = useState<MeQuery['me'] | null>(null);
  const [loginMutation] = useLoginMutation();
  const [externalLogin] = useLoginWithAuthProviderMutation();

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
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
        if (!returnedData) return;
        const loggedInUser = returnedData.login.user;
        updateMeQueryCache(cache, loggedInUser);
        setUser(loggedInUser);
      },
    });
    return data;
  };
  const signup = () => {};
  const signout = () => {};
  const sendPasswordResetEmail = () => {};
  const confirmPasswordReset = () => {};

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    if (!loading && userData?.me) {
      setUser(userData.me);
    }
  }, [userData, loading]);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signinWithAuthProvider,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

const authContext = createContext({} as ReturnType<typeof useProvideAuth>);

const ProviderAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

export default ProviderAuth;
