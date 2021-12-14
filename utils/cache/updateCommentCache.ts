import {
  MissingPostCommentsQuery,
  MissingPostCommentsDocument,
} from './../../generated/graphql';
import { ApolloCache } from '@apollo/client';
import { AddMpCommentMutation } from 'generated/graphql';

export const updateCommentsCache = (
  cache: ApolloCache<any>,
  data: AddMpCommentMutation,
  postId: number,
  parentId: number | null
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

  cache.writeQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
    variables: { options: { postId, limit: 5, cursor: null } },

    data: {
      comments: {
        ...(cachedData?.comments || []),
        comments: [newComment, ...cachedData!.comments.comments],
      },
    },
    overwrite: true,
  });
  //2. check if post exists in cache
};
