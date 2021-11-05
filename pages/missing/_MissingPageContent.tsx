import { Grid, GridItem, VStack } from '@chakra-ui/layout';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import { MissingPost } from 'generated/graphql';
import React, { useContext } from 'react';
import { MissingPostsGridContainer } from './_MissingPostsGridContainer';
import { MissingPageContext } from './index';
import { PostsOptions } from './_PostsOptions';

export const MissingPageContent: React.FC<{
  hasLoadedFirstTime: boolean;
  fetchMorePosts: VoidFunction;
}> = ({ hasLoadedFirstTime = false, fetchMorePosts }) => {
  const queryResponse = useContext(MissingPageContext);

  if (!hasLoadedFirstTime) return <DummyPostsSkeleton noOfPosts={3} />;

  if (
    !queryResponse ||
    !queryResponse.data ||
    !queryResponse.data.missingPosts ||
    queryResponse.data.missingPosts.errors?.length
  ) {
    return <h1>Error 404</h1>;
  }
  const { data, loading } = queryResponse;
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
