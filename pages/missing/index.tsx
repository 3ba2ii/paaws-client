import { getDataFromTree } from '@apollo/client/react/ssr';
import { Container, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { Button, Skeleton } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { MissingPost, useMissingPostsQuery } from 'generated/graphql';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import withApollo from 'utils/withApollo';
import { MissingPostsGridContainer } from './_MissingPostsGridContainer';

const MissingPage: React.FC = () => {
  const { data, loading, fetchMore } = useMissingPostsQuery({
    variables: {
      input: {
        limit: 5,
        cursor: null,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!data) return <div>No data</div>;

  const { missingPosts, hasMore, errors } = data.missingPosts;
  if (errors?.length) return <div>Error occurred</div>;

  const fetchMorePosts = async () => {
    if (!hasMore) return;
    const { createdAt: cursor } = missingPosts[missingPosts.length - 1];
    const variables = {
      input: {
        limit: 5,
        cursor,
      },
    };

    await fetchMore({
      variables,
    });
  };

  return (
    <Layout title='Missing Pets - Paaws'>
      {/* This will be divided into 2 sections
        1. Filters Section (32% width)     
        2. Pet Listing Section (68% width)
      */}
      <Container maxW={['100%', '900px']}>
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
      </Container>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
