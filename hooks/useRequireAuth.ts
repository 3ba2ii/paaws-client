import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRequireAuth = () => {
  const { user, isLoadingUserInfo: loading } = useAuth();
  console.log(
    `🚀 ~ file: useRequireAuth.ts ~ line 7 ~ useRequireAuth ~ data`,
    user,
    loading
  );

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=' + router.asPath);
    }
  }, [user, router, loading]);

  return { user, loading };
};
