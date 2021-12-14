import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useMissingPostCommentsQuery } from 'generated/graphql';
import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import NoComments from './NoComments';

interface CommentsProps {
  postId: number;
}

const CommentsSection: React.FC<CommentsProps> = ({ postId }) => {
  const { data, loading } = useMissingPostCommentsQuery({
    variables: { options: { postId, limit: 5, cursor: null } },
    notifyOnNetworkStatusChange: true,
  });

  const noComments = !loading && data?.comments.comments.length === 0;

  /* On this module we should implement the following features (all features require the user to be logged in)
    1. Add new comment
    2. delete comment (if user is the owner of the comment, or the post owner)
    3. edit comment (in case of comment owner is the logged in user)
    4. reply to a comment
  
  */
  return (
    <VStack w='100%' py={4}>
      <CommentForm postId={postId} parentId={null} />

      {loading ? (
        <Box h='200px' display={'grid'} placeItems={'center'}>
          <LoadingComponent progressProps={{ color: 'gray', size: '32px' }} />
        </Box>
      ) : noComments ? (
        <NoComments />
      ) : (
        <VStack w='100%' divider={<Divider />} py={5}>
          {data?.comments.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </VStack>
      )}
    </VStack>
  );
};
export default CommentsSection;
