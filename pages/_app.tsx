import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import theme from '../theme';

export const handleUnAuthenticatedUsers = () => {
  // Logout without hook

  const router = useRouter();

  // do other stuff required when logout
  router.replace('/login');
  // eslint-disable-next-line no-restricted-globals
  // location.reload() after token removed affects user redirect
  // when component is wrapped inside <ProtectedRoute> component
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
