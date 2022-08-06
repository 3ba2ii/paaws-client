import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

export const useRequireAuth = () => {
  const { user, isLoadingUserInfo: loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=' + router.asPath);
    }
  }, [user, router, loading]);

  return { user, loading };
};
