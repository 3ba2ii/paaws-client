import { ChakraProvider } from '@chakra-ui/react';
import ProviderAuth from 'hooks/useAuth';
import type { AppProps } from 'next/app';
import withApollo from 'utils/withApollo';
import '../styles/globals.css';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ProviderAuth>
        <Component {...pageProps} />
      </ProviderAuth>
    </ChakraProvider>
  );
}
export default withApollo(MyApp);
