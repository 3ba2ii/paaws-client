import { getDataFromTree } from '@apollo/client/react/ssr';
import { Container, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import { MissingPost, useMissingPostsQuery } from 'generated/graphql';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import withApollo from 'utils/withApollo';
import { MissingPostsGridContainer } from './_MissingPostsGridContainer';

const MissingPageContent: React.FC = () => {
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);

  const { data, loading, fetchMore } = useMissingPostsQuery({
    variables: {
      input: { limit: 5, cursor: null },
      length: 120,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setHasLoaded(true);
    },
  });
  if (!hasLoadedFirstTime) return <DummyPostsSkeleton noOfPosts={3} />;
  if (!data && !hasLoadedFirstTime && !loading) return <h1>No data</h1>;
  if (!data || !data.missingPosts) return <h1>No data</h1>;

  const { missingPosts, hasMore, errors } = data.missingPosts;
  if (errors?.length) return <div>Error occurred</div>;

  const fetchMorePosts = async () => {
    if (!hasMore) return;
    const { createdAt: cursor } = missingPosts[missingPosts.length - 1];
    const variables = {
      input: { limit: 5, cursor },
    };

    await fetchMore({ variables });
  };

  return (
    <Grid
      templateColumns='1fr'
      templateRows='1fr auto'
      placeContent={'center'}
      w='100%'
      h='100%'
      gap={'24px'}
    >
      <GridItem ml='auto'>
        <Flex sx={{ gap: '16px' }}>
          <Button
            rightIcon={<FaChevronDown />}
            variant='outline'
            aria-label='sorting'
          >
            Most Recent
          </Button>
          <Button colorScheme={'teal'} size='md'>
            Report Missing Pet
          </Button>
        </Flex>
      </GridItem>
      <GridItem>
        <MissingPostsGridContainer
          posts={missingPosts as Array<MissingPost>}
          fetchMorePosts={fetchMorePosts}
          hasMore={hasMore}
          loading={loading}
        />
      </GridItem>
    </Grid>
  );
};

const MissingPage = () => {
  return (
    <Layout title='Missing Pets - Paaws'>
      {/* This will be divided into 2 sections
        1. Filters Section (32% width)     
        2. Pet Listing Section (68% width)
      */}
      <Container maxW={['100%', '900px']}>
        <MissingPageContent />
      </Container>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
