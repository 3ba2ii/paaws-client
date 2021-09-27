import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import nextWithApollo from 'next-with-apollo';
import { useRouter } from 'next/router';
import { isServer } from './isServer';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `❌ [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    const link = createUploadLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include',
      headers: {
        ...(headers as Record<string, string>),
      },
    });

    return new ApolloClient({
      ssrMode: isServer(),

      link: from([errorLink, link]),

      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  }
);

export default withApollo;
