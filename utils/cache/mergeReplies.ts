import { ApolloCache } from '@apollo/client';
import {
  CommentFragmentFragment,
  GetCommentRepliesQuery,
  MissingPostCommentsDocument,
  MissingPostCommentsQuery,
} from './../../generated/graphql';

export const mergeRepliesInCache = (
  cache: ApolloCache<any>,
  data: GetCommentRepliesQuery,
  parentId: number
) => {
  //1. check if data is valid
  if (
    !data ||
    !data?.getCommentReplies.comments ||
    data.getCommentReplies.errors?.length
  ) {
    return;
  }

  const newReplies = data.getCommentReplies.comments;

  const cachedData = cache.readQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
  });

  const updatedComments =
    cachedData?.comments.comments.map((comment) => {
      if (parentId === comment.id) {
        return {
          ...comment,
          replies: [...(comment?.replies || []), ...newReplies],
        };
      }
    }) || [];

  console.log(
    `🚀 ~ file: mergeReplies.ts ~ line 30 ~ updatedComments`,
    updatedComments
  );
  cache.writeQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,

    data: {
      comments: {
        ...cachedData?.comments,
        comments: updatedComments as CommentFragmentFragment[],
      },
    },
    overwrite: true,
  });
};
