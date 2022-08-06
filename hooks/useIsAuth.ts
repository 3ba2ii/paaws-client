import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

export const useIsAuth = () => {
  const { user, isLoadingUserInfo: loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('hello');
    if (!loading && !user) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [user, router, loading]);

  return { user, loading };
};
