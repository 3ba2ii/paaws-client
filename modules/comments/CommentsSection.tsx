import { Box, Button, Divider, Text, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useMissingPostCommentsQuery } from 'generated/graphql';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import Comment from './Comment';
import CommentForm from './CommentForm';
import NoComments from './NoComments';

interface CommentsProps {
  postId: number;
}

const CommentsSection: React.FC<CommentsProps> = ({ postId }) => {
  const { data, loading, variables, fetchMore } = useMissingPostCommentsQuery({
    variables: { options: { postId, cursor: null, limit: 5 } },
    notifyOnNetworkStatusChange: true,
  });
  console.log(`🚀 ~ file: CommentsSection.tsx ~ line 16 ~ data`, data);

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
    const { createdAt: cursor } = comments[comments.length - 1];
    const newVariables = {
      ...variables,
      options: { ...variables?.options, limit: 5, cursor },
    };
    await fetchMore({ variables: newVariables });
  };
  return (
    <VStack w='100%' py={4}>
      <CommentForm
        postId={postId}
        parentId={null}
        avatarProps={{ w: '40px', h: '40px' }}
      />

      {loading ? (
        <Box h='200px' display={'grid'} placeItems={'center'}>
          <LoadingComponent progressProps={{ color: 'gray', size: '32px' }} />
        </Box>
      ) : noComments ? (
        <NoComments />
      ) : (
        <VStack w='100%'>
          <VStack w='100%' divider={<Divider />} py={5}>
            {data?.comments.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </VStack>
          {data?.comments.hasMore && (
            <Button
              size='sm'
              px='1rem'
              rightIcon={<FiMoreHorizontal />}
              onClick={fetchMoreComments}
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
