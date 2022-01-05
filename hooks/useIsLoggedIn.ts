import { MeQuery, useMeQuery } from '../generated/graphql';

export const useIsLoggedIn = (): MeQuery['me'] | undefined | null => {
  const { data, loading } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  if (!loading && !data?.me) {
    location.replace('/login?next=' + location.pathname);
    return null;
  }
  return data?.me;
};
