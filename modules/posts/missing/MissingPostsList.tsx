import { Divider, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { MissingPostsQuery } from 'generated/graphql';
import React, { useEffect, useRef } from 'react';
import useOnScreen from 'hooks/useOnScreen';
import { DummyPostsSkeleton } from '../../../components/skeltons/DummyPostSkelton';
import { SinglePostCard } from './SinglePostCard';

/* Missing Posts Grid Container */
export const MissingPostsList: React.FC<{
  fetchMorePosts: VoidFunction;
  hasMore?: boolean | null;
  loading: boolean;
  posts: MissingPostsQuery['missingPosts']['missingPosts'];
}> = ({ fetchMorePosts, posts, loading, hasMore = false }) => {
  const loadMorButtonRef = useRef(null);
  const isVisible = useOnScreen(loadMorButtonRef);

  // to check if the last pre last element is visible on screen or not
  useEffect(() => {
    //if (isVisible && hasMore) fetchMorePosts();
  }, [isVisible]);

  if (!posts || !posts.length)
    return (
      <NotFound
        title='No Posts Found 📭'
        subtitle="Unfortunately, We didn't find posts with you selected category or filters, Try
          change them or add the first post yourself"
        includeBackButton={false}
        containerProps={{ h: '80%' }}
      />
    );
  return (
    <VStack spacing={4} w='100%' divider={<Divider />}>
      {posts.map((post) => {
        return <SinglePostCard key={post.id} post={post} />;
      })}
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
