import { ApolloCache } from '@apollo/client';
import {
  DeleteCommentMutation,
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
  const cachedData = cache.readQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
    variables: { options: { postId, limit: 5, cursor: null } },
  });

  if (!cachedData) {
    return;
  }
  cache.writeQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
    variables: { options: { postId, limit: 5, cursor: null } },

    data: {
      comments: {
        ...(cachedData?.comments || []),
        /* Filter comments by id or parentId */
        comments: cachedData!.comments.comments.filter(({ id, parentId }) => {
          //filter the comment in case of deleting a direct comment
          return id !== commentId && parentId !== commentId;
        }),
      },
    },
    overwrite: true,
  });
};
