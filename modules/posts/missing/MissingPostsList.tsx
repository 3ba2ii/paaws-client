import { Divider, Flex, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { MissingPost } from 'generated/graphql';
import React, { useEffect, useRef } from 'react';
import useOnScreen from 'utils/useOnScreen';
import { DummyPostsSkeleton } from '../../../components/skeltons/DummyPostSkelton';
import { SinglePostCard } from './SinglePostCard';

/* Missing Posts Grid Container */
export const MissingPostsList: React.FC<{
  fetchMorePosts: VoidFunction;
  hasMore?: boolean | null;
  loading: boolean;
  posts: Array<MissingPost>;
}> = ({ fetchMorePosts, posts, loading, hasMore = false }) => {
  const loadMorButtonRef = useRef(null);
  const isVisible = useOnScreen(loadMorButtonRef);

  // to check if the last pre last element is visible on screen or not
  useEffect(() => {
    if (isVisible && hasMore) fetchMorePosts();
  }, [isVisible]);

  if (!posts || !posts.length)
    return (
      <NotFound
        title='No Posts Found 📭'
        subtitle="Unfortunately, We didn't find posts with you selected category or filters, Try
          change them or add the first post yourself"
      />
    );
  return (
    <VStack spacing={4} w='100%' divider={<Divider />}>
      {posts.map(
        ({
          id,
          title,
          points,
          user,
          createdAt,
          tags,
          thumbnail,
          address,
          voteStatus,
          descriptionSnippet,
          commentsCount,
        }) => {
          return (
            <SinglePostCard
              key={id}
              {...{
                id,
                title,
                descriptionSnippet,
                points,
                createdAt,
                user,
                thumbnail,
                tags,
                address,
                voteStatus,
                commentsCount,
              }}
            />
          );
        }
      )}
      {/* Add two skelton is if loading skelton */}
      {loading && hasMore && <DummyPostsSkeleton />}

      {hasMore ? (
        <Button
          isLoading={loading}
          ref={loadMorButtonRef}
          onClick={fetchMorePosts}
        >
          Load More
        </Button>
      ) : null}
    </VStack>
  );
};
