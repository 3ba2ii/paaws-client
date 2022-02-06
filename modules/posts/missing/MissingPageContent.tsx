import { OperationVariables, QueryResult } from '@apollo/client';
import { Divider, GridItem, HStack, VStack } from '@chakra-ui/layout';
import { Button, IconButton, Skeleton } from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import { MissingPostsQuery } from 'generated/graphql';
import React from 'react';
import { MissingPostsList } from './MissingPostsList';
import { PostsOptions } from './PostsOptions';

interface IMissingPageContent {
  hasLoadedFirstTime: boolean;
  fetchMorePosts: VoidFunction;
  data: QueryResult<MissingPostsQuery, OperationVariables>['data'];
  loading: boolean;
  paginationLoading: boolean;
}

const PostsLoadingSkeleton: React.FC = () => (
  <VStack w='100%'>
    <VStack w='100%' align='flex-start' spacing={4}>
      <HStack
        w='100%'
        alignSelf={'flex-end'}
        justify='flex-end'
        position='relative'
        wrap={['wrap', 'unset']}
      >
        <Skeleton as={IconButton} borderRadius={4} h='32px' />

        <Skeleton as={Button} borderRadius={4} h='32px'>
          New Post
        </Skeleton>
      </HStack>
      <Divider />
      <Skeleton as={Button} w='90px' h='28px' borderRadius={4}>
        Add Filter
      </Skeleton>
    </VStack>
    <DummyPostsSkeleton noOfPosts={3} />
  </VStack>
);

export const MissingPageContent: React.FC<IMissingPageContent> = ({
  fetchMorePosts,
  data,
  loading,
  paginationLoading,
  hasLoadedFirstTime = false,
}) => {
  if (!hasLoadedFirstTime) return <PostsLoadingSkeleton />;

  if (!data || !data.missingPosts || data.missingPosts.errors?.length) {
    return (
      <NotFound
        title='404 No Posts Found 📭'
        subtitle='There were an error while trying to fetch the missing posts, Please try again later'
        includeBackButton={false}
      />
    );
  }

  return (
    <VStack spacing={4} w='100%' h='100%' pos='relative'>
      <GridItem w='100%'>
        <PostsOptions />
      </GridItem>
      <GridItem w='100%' h='100%'>
        {loading && !paginationLoading ? (
          <DummyPostsSkeleton noOfPosts={3} />
        ) : (
          <MissingPostsList
            fetchMorePosts={fetchMorePosts}
            loading={paginationLoading}
            posts={data.missingPosts.missingPosts}
            hasMore={data.missingPosts.hasMore}
          />
        )}
      </GridItem>
    </VStack>
  );
};
