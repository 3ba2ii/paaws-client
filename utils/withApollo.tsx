import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import {
  PaginatedAdoptionPosts,
  PaginatedComments,
  PaginatedMissingPosts,
} from 'generated/graphql';
import nextWithApollo from 'next-with-apollo';
import router from 'next/router';
import { isServer } from './isServer';

// Use this inside error-link
export const handleLogoutWithoutHook = () => {
  // Logout without hook

  // do other stuff required when logout
  // eslint-disable-next-line no-restricted-globals
  location.replace('/login?next=' + router.pathname);

  // location.reload() after token removed affects user redirect
  // when component is wrapped inside <ProtectedRoute> component
};
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `❌ [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      if (message.includes('Not Authenticated')) {
        if (path && ['vote'].includes(path.toString()))
          return handleLogoutWithoutHook();
      }
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        adoptionPosts: {
          keyArgs: [],
          merge(
            existing: PaginatedAdoptionPosts | undefined,
            incoming: PaginatedAdoptionPosts
          ): PaginatedAdoptionPosts {
            if (!existing) return incoming;
            return {
              ...incoming,
              posts: [...(existing?.posts || []), ...incoming.posts],
            };
          },
        },
        missingPosts: {
          keyArgs: [],
          merge(
            existing: PaginatedMissingPosts | undefined,
            incoming: PaginatedMissingPosts
          ) {
            if (!existing) return incoming;

            return {
              ...incoming,
              missingPosts: [
                ...(existing?.missingPosts || []),
                ...incoming.missingPosts,
              ],
            };
          },
        },
        comments: {
          keyArgs: [],
          merge(
            existing: PaginatedComments | undefined,
            incoming: PaginatedComments
          ) {
            if (!existing) return incoming;

            return {
              ...incoming,
              comments: [...(existing?.comments || []), ...incoming.comments],
            };
          },
        },

        getCommentReplies: {
          keyArgs: [],
          merge(
            existing: PaginatedComments | undefined,
            incoming: PaginatedComments
          ) {
            let uniqueIds: { [key: string]: boolean } = {};

            const mergedReplies = [
              ...incoming.comments,
              ...(existing?.comments || []),
            ];

            const newComments = mergedReplies.filter((ref: any) => {
              const id = ref?.__ref || null;
              if (!id) return false;

              if (uniqueIds[id]) return false;
              uniqueIds[id] = true;
              return true;
            });

            return {
              ...incoming,
              comments: newComments,
            };
          },
        },
      },
    },
  },
});

const withApollo = nextWithApollo(
  ({ headers }) => {
    const link = createUploadLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      credentials: 'include',
      headers: {
        ...(headers as Record<string, string>),
      },
    });

    return new ApolloClient({
      ssrMode: isServer(),
      link: from([errorLink, link]),
      cache,
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  }
);

export default withApollo;
