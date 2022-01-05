import { Button, Divider, HStack, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useGetCommentRepliesLazyQuery } from 'generated/graphql';
import React from 'react';
import { FiCornerDownRight } from 'react-icons/fi';
import Comment from './Comment';

interface RepliesProps {
  parentId: number;
  repliesCount: number;
}

const RepliesSection: React.FC<RepliesProps> = React.memo(
  ({ parentId, repliesCount }) => {
    const [fetchFirstReplies, { data, loading, fetchMore, called }] =
      useGetCommentRepliesLazyQuery({
        fetchPolicy: 'no-cache',
        nextFetchPolicy: 'network-only',
      });

    const comments = data?.getCommentReplies.comments || [];
    const hasMore = comments.length < repliesCount;

    const handleLoadMoreReplies = async () => {
      if (!hasMore || !comments.length) return;

      const { createdAt: cursor } = comments[comments.length - 1];
      const newVariables = {
        options: { limit: 5, cursor, parentId },
      };
      fetchMore && (await fetchMore({ variables: newVariables }));
    };
    React.useEffect(() => {
      !called &&
        fetchFirstReplies({
          variables: {
            options: {
              parentId,
              cursor: null,
              limit: 3,
            },
          },
        });
    }, [parentId]);

    return (
      <VStack w='100%' spacing={5} align='flex-start'>
        {loading ? (
          <HStack w='100%' align={'center'} justify={'center'}>
            <LoadingComponent progressProps={{ trackColor: 'gray.500' }} />
          </HStack>
        ) : (
          <>
            <VStack w='100%' pl='10%' align={'flex-end'} divider={<Divider />}>
              {comments
                .filter(({ parentId: pID }) => parentId === pID)
                .map((reply) => (
                  <Comment key={reply.id} comment={reply} />
                ))}
            </VStack>
            {hasMore && (
              <Button
                pos={'relative'}
                left='8%'
                leftIcon={<FiCornerDownRight />}
                variant='ghost'
                colorScheme='gray'
                size='sm'
                onClick={handleLoadMoreReplies}
              >
                Load More Replies
              </Button>
            )}
          </>
        )}
      </VStack>
    );
  }
);
export default RepliesSection;
