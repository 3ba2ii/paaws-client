import { ApolloCache } from '@apollo/client';
import {
  DeleteCommentMutation,
  GetCommentRepliesDocument,
  GetCommentRepliesQuery,
  MissingPostCommentsDocument,
  MissingPostCommentsQuery,
} from './../../generated/graphql';

export const deleteCommentFromCache = (
  cache: ApolloCache<any>,
  data: DeleteCommentMutation,
  postId: number,
  commentId: number
) => {
  if (
    !data ||
    !data.deleteComment.deleted ||
    data.deleteComment.errors?.length
  ) {
    return;
  }
  //we need to remove the comment and also any comment that has parentId from the cache
  const cachedComments = cache.readQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
    variables: { options: { postId, limit: 5, cursor: null } },
  });

  if (!cachedComments) return;

  cache.writeQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
    variables: { options: { postId, limit: 5, cursor: null } },

    data: {
      comments: {
        ...(cachedComments?.comments || []),
        /* Filter comments by id or parentId */
        comments:
          cachedComments?.comments?.comments?.filter(({ id, parentId }) => {
            //filter the comment in case of deleting a direct comment
            return id !== commentId && parentId !== commentId;
          }) || [],
      },
    },
    overwrite: true,
  });

  const cachedReplies = cache.readQuery<GetCommentRepliesQuery>({
    query: GetCommentRepliesDocument,
  });

  if (!cachedReplies) return;

  cache.writeQuery<GetCommentRepliesQuery>({
    query: GetCommentRepliesDocument,
    data: {
      ...cachedReplies,

      getCommentReplies: {
        ...cachedReplies.getCommentReplies,
        comments:
          cachedReplies?.getCommentReplies?.comments?.filter(
            ({ id }) => id !== commentId
          ) || [],
      },
    },
    overwrite: true,
  });
};
