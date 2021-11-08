import { OperationVariables, QueryResult } from '@apollo/client';
import { GridItem, Heading, VStack } from '@chakra-ui/layout';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import { MissingPost, MissingPostsQuery } from 'generated/graphql';
import React from 'react';
import { MissingPostsGridContainer } from './_MissingPostsGridContainer';
import { PostsOptions } from './_PostsOptions';

export const MissingPageContent: React.FC<{
  hasLoadedFirstTime: boolean;
  fetchMorePosts: VoidFunction;
  data: QueryResult<MissingPostsQuery, OperationVariables>['data'];
  loading: boolean;
}> = ({ hasLoadedFirstTime = false, fetchMorePosts, data, loading }) => {
  if (!hasLoadedFirstTime) return <DummyPostsSkeleton noOfPosts={3} />;

  if (!data || !data.missingPosts || data.missingPosts.errors?.length) {
    return <Heading size='md'>Error 404</Heading>;
  }
  const { missingPosts: posts, hasMore } = data.missingPosts;

  return (
    <VStack spacing={4} w='100%' h='100%' paddingInline='3%' pos='relative'>
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
