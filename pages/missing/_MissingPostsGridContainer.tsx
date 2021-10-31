import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { MissingPost } from 'generated/graphql';
import React, { useEffect, useRef } from 'react';
import useOnScreen from 'utils/useOnScreen';
import { SinglePostCard } from './_SinglePostCardProps';

/* Missing Posts Grid Container */
export const MissingPostsGridContainer: React.FC<{
  posts: Array<MissingPost>;
  fetchMorePosts: VoidFunction;
  hasMore: boolean | undefined | null;
  loading: boolean;
}> = ({ posts, fetchMorePosts, hasMore, loading = false }) => {
  const loadMorButtonRef = useRef(null);
  const isVisible = useOnScreen(loadMorButtonRef);

  // to check if the last pre last element is visible on screen or not
  useEffect(() => {
    if (isVisible && hasMore) {
      fetchMorePosts();
    }
  }, [isVisible]);
  return (
    <Flex flexDirection='column' sx={{ gap: '24px' }} w='100%'>
      {posts.map(
        (
          {
            id,
            title,
            description,
            points,
            user,
            createdAt,
            tags,
            thumbnail,
            address,
            voteStatus,
          },
          index
        ) => {
          return (
            <Box key={id}>
              <>{index === posts.length - 1 ? 'This is the one' : null}</>
              <SinglePostCard
                {...{
                  id,
                  title,
                  description,
                  points,
                  createdAt,
                  user,
                  thumbnail,
                  tags,
                  address,
                  voteStatus,
                }}
              />
            </Box>
          );
        }
      )}

      {hasMore ? (
        <Button
          isLoading={loading}
          ref={loadMorButtonRef}
          onClick={fetchMorePosts}
        >
          Load More
        </Button>
      ) : null}
    </Flex>
  );
};
