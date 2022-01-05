import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useIsValidURL = (query: string) => {
  const router = useRouter();

  useEffect(() => {
    const id = router.query[query];
    if (!id || Array.isArray(id) || typeof id !== 'string') {
      router.replace('/login?next=' + router.pathname);
    }
  }, [router]);

  return router.query[query];
};
