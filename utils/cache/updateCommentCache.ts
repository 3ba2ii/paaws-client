import { ApolloCache } from '@apollo/client';
import { AddMpCommentMutation } from 'generated/graphql';
import {
  MissingPostCommentsDocument,
  MissingPostCommentsQuery,
} from './../../generated/graphql';

export const updateCommentsCache = (
  cache: ApolloCache<any>,
  data: AddMpCommentMutation,
  postId: number
) => {
  //1. check if data is valid
  if (!data || !data.addMPComment.comment || data.addMPComment.errors?.length) {
    return;
  }

  //2. read the cached comments
  const newComment = data.addMPComment.comment;

  const cachedData = cache.readQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
    variables: { options: { postId, limit: 5, cursor: null } },
  });

  //two scenarios for a comment
  //1. A regular comment (no parentId)
  //2. A reply to a comment (parentId) - add it to the parent id

  cache.writeQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
    variables: { options: { postId, limit: 5, cursor: null } },

    data: {
      comments: {
        ...(cachedData?.comments || []),
        comments: [newComment, ...(cachedData?.comments?.comments || [])],
      },
    },
    overwrite: true,
  });
};
