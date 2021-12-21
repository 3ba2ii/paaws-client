import { ApolloCache } from '@apollo/client';
import {
  AddMpCommentMutation,
  CommentFragmentFragment,
} from 'generated/graphql';
import {
  MissingPostCommentsDocument,
  MissingPostCommentsQuery,
} from './../../generated/graphql';

type CommentWithReplies = CommentFragmentFragment & {
  replies: CommentFragmentFragment[];
};

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

  //two scenarios for a comment
  //1. A regular comment (no parentId)
  //2. A reply to a comment (parentId) - add it to the parent id

  let newCommentsInCache = [];
  if (newComment.isReply) {
    const newComments =
      cachedData?.comments.comments.map((comment) => {
        if (comment.id === newComment.parentId) {
          return {
            ...comment,
            replies: [newComment, ...comment.replies],
          };
        }
        return comment;
      }) || [];
    newCommentsInCache = newComments;
  } else {
    newCommentsInCache = [newComment, ...cachedData!.comments.comments];
  }
  console.log(
    `🚀 ~ file: updateCommentCache.ts ~ line 59 ~ newCommentsInCache`,
    newCommentsInCache
  );

  cache.writeQuery<MissingPostCommentsQuery>({
    query: MissingPostCommentsDocument,
    variables: { options: { postId, limit: 5, cursor: null } },

    data: {
      comments: {
        ...(cachedData?.comments || []),
        comments: newCommentsInCache as CommentWithReplies[],
      },
    },
    overwrite: true,
  });
};
