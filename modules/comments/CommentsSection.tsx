import { Box, Button, Divider, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import {
  CommentFragmentFragment,
  useMissingPostCommentsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import Comment from './Comment';
import CommentForm from './CommentForm';
import NoComments from './NoComments';

interface CommentsProps {
  postId: number;
}

const CommentsSection: React.FC<CommentsProps> = ({ postId }) => {
  const [commentsState, setComments] = useState<CommentFragmentFragment[]>([]);
  console.log(
    `🚀 ~ file: CommentsSection.tsx ~ line 19 ~ commentsState`,
    commentsState
  );
  const [paginationLoading, setPaginationLoading] = useState(false);
  const { data, loading, variables, fetchMore } = useMissingPostCommentsQuery({
    variables: { options: { postId, cursor: null, limit: 5 } },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.comments.comments) setComments(data.comments.comments);
    },
  });

  const noComments = !loading && data?.comments.comments.length === 0;

  /* On this module we should implement the following features (all features require the user to be logged in)
    1. Add new comment
    2. delete comment (if user is the owner of the comment, or the post owner)
    3. edit comment (in case of comment owner is the logged in user)
    4. reply to a comment
  */
  const fetchMoreComments = async () => {
    if (!data?.comments) return;
    const { comments, hasMore } = data.comments;

    if (!hasMore) return;
    setPaginationLoading(true);

    const { createdAt: cursor } = comments[comments.length - 1];
    const newVariables = {
      ...variables,
      options: { ...variables?.options, limit: 5, cursor },
    };
    await fetchMore({ variables: newVariables });
    setPaginationLoading(false);
  };
  return (
    <VStack w='100%' py={4}>
      <CommentForm
        postId={postId}
        parentId={null}
        avatarProps={{ w: '40px', h: '40px' }}
      />

      {loading && !paginationLoading ? (
        <Box h='200px' display={'grid'} placeItems={'center'}>
          <LoadingComponent progressProps={{ color: 'gray', size: '32px' }} />
        </Box>
      ) : noComments ? (
        <NoComments />
      ) : (
        <VStack w='100%'>
          <VStack w='100%' divider={<Divider />} py={5}>
            {data?.comments.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment as CommentFragmentFragment}
              />
            ))}
          </VStack>
          {data?.comments.hasMore && (
            <Button
              size='sm'
              px='2rem'
              rightIcon={<FiMoreHorizontal />}
              onClick={fetchMoreComments}
              isLoading={paginationLoading}
            >
              Load more
            </Button>
          )}
        </VStack>
      )}
    </VStack>
  );
};
export default CommentsSection;
