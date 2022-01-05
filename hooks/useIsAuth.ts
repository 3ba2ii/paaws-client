import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';

export const useIsAuth = () => {
  const { data, loading } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [data, router, loading]);

  return { user: data?.me, loading };
};
