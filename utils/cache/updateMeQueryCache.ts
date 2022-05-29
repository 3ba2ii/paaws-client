import { ApolloCache } from '@apollo/client';
import { MeDocument, MeQuery } from 'generated/graphql';

export const updateMeQueryCache = (
  cache: ApolloCache<any>,
  updatedUserInfo: MeQuery['me']
) => {
  const result = cache.readQuery<MeQuery>({ query: MeDocument });
  if (!result || !result.me) return;
  cache.writeQuery<MeQuery>({
    query: MeDocument,
    data: {
      me: updatedUserInfo,
    },
  });
};
