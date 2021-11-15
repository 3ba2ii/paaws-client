import { OperationVariables, QueryResult } from '@apollo/client';
import { GridItem, Heading, HStack, VStack } from '@chakra-ui/layout';
import { Button, IconButton, Skeleton } from '@chakra-ui/react';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import { MissingPost, MissingPostsQuery } from 'generated/graphql';
import React from 'react';
import { MissingPostsGridContainer } from './_MissingPostsGridContainer';
import { PostsOptions } from './_PostsOptions';

interface IMissingPageContent {
  hasLoadedFirstTime: boolean;
  fetchMorePosts: VoidFunction;
  data: QueryResult<MissingPostsQuery, OperationVariables>['data'];
  loading: boolean;
}

const PostsLoadingSkeleton: React.FC = () => (
  <VStack w='100%' sx={{ gap: '24px' }}>
    <HStack
      w='100%'
      alignSelf={'flex-end'}
      justify='flex-end'
      position='relative'
      wrap={['wrap', 'unset']}
      sx={{ rowGap: '1rem' }}
    >
      <Skeleton>
        <IconButton disabled aria-label='loading-skeleton' />
      </Skeleton>

      <Skeleton>
        <Button disabled>Filters</Button>
      </Skeleton>
      <Skeleton>
        <Button disabled>New Post</Button>
      </Skeleton>
    </HStack>
    <DummyPostsSkeleton noOfPosts={3} />
  </VStack>
);
export const MissingPageContent: React.FC<IMissingPageContent> = ({
  hasLoadedFirstTime = false,
  fetchMorePosts,
  data,
  loading,
}) => {
  if (!hasLoadedFirstTime) return <PostsLoadingSkeleton />;

  if (!data || !data.missingPosts || data.missingPosts.errors?.length) {
    return <Heading size='md'>Error 404</Heading>;
  }
  const { missingPosts: posts, hasMore } = data.missingPosts;

  return (
    <VStack spacing={4} w='100%' h='100%' pos='relative'>
      <GridItem w='100%'>
        <PostsOptions />
      </GridItem>
      <GridItem w='100%' h='100%'>
        <MissingPostsGridContainer
          posts={posts as Array<MissingPost>}
          fetchMorePosts={fetchMorePosts}
          hasMore={hasMore}
          loading={loading}
        />
      </GridItem>
    </VStack>
  );
};
