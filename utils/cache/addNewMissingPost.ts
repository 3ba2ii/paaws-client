import { ApolloCache } from '@apollo/client';
import {
  CreateMissingPostMutation,
  MissingPostsQuery,
  MissingPostsDocument,
} from './../../generated/graphql';

export const addNewMissingPostToCache = (
  cache: ApolloCache<any>,
  data: CreateMissingPostMutation
) => {
  //1. check if data is valid
  if (
    !data ||
    !data?.createMissingPost.post ||
    data.createMissingPost.errors?.length
  ) {
    return;
  }

  const newPost = data.createMissingPost.post;

  const cachedData = cache.readQuery<MissingPostsQuery>({
    query: MissingPostsDocument,
    variables: {
      input: { limit: 5, cursor: null },
      length: 120,
    },
  });

  cache.writeQuery<MissingPostsQuery>({
    query: MissingPostsDocument,
    variables: {
      input: { limit: 6, cursor: null },
      length: 120,
    },
    data: {
      missingPosts: {
        ...cachedData!.missingPosts,
        missingPosts: [newPost, ...cachedData!.missingPosts.missingPosts],
      },
    },
    overwrite: true,
  });

  return;

  //2. check if post exists in cache
};
