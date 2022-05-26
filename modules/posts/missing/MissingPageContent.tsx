import { OperationVariables, QueryResult } from '@apollo/client';
import { GridItem, VStack } from '@chakra-ui/layout';
import NotFound from 'components/NotFound';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import { MissingPostsQuery } from 'generated/graphql';
import React from 'react';
import { MissingPostsList } from './MissingPostsList';
import { PostsLoadingSkeleton } from '../../../components/skeltons/PostsLoadingSkeleton';
import { PostsOptions } from './PostsOptions';

interface IMissingPageContent {
  hasLoadedFirstTime: boolean;
  fetchMorePosts: VoidFunction;
  data: QueryResult<MissingPostsQuery, OperationVariables>['data'];
  loading: boolean;
  paginationLoading: boolean;
}

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
