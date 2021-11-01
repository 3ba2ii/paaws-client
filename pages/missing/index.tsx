import { getDataFromTree } from '@apollo/client/react/ssr';
import { Container, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import {
  MissingPost,
  MissingPostsQuery,
  MissingPostTypes,
  useMissingPostsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import withApollo from 'utils/withApollo';
import { MissingPostsGridContainer } from './_MissingPostsGridContainer';

const MissingPageContent: React.FC<{
  data?: MissingPostsQuery;
  hasLoadedFirstTime?: boolean;
  loading: boolean;
  fetchMore: Function;
}> = ({ loading, data, hasLoadedFirstTime, fetchMore }) => {
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
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);
  const [filters, setFilters] = useState<MissingPostTypes[]>([]); //will hold the filters for the posts

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
  return (
    <Layout title='Missing Pets - Paaws'>
      <Grid templateColumns='1fr auto 1fr' gap={'24px'}>
        <GridItem>
          Anim labore laboris amet exercitation sunt amet adipisicing. Do elit
          est ullamco Lorem ut elit nisi reprehenderit. Non duis aliquip sunt
          dolor minim nisi ex fugiat quis tempor nostrud nulla reprehenderit.
          Duis eu nostrud incididunt adipisicing ut adipisicing culpa laboris eu
          veniam anim esse ea aliquip. Eu fugiat mollit dolor mollit ad.
          Deserunt eu non velit voluptate id ipsum fugiat.
        </GridItem>
        <GridItem>
          <Container maxW={['100%', '900px']}>
            <MissingPageContent
              {...{ data, loading, hasLoadedFirstTime, fetchMore }}
            />
          </Container>
        </GridItem>
        <GridItem>
          Anim labore laboris amet exercitation sunt amet adipisicing. Do elit
          est ullamco Lorem ut elit nisi reprehenderit. Non duis aliquip sunt
          dolor minim nisi ex fugiat quis tempor nostrud nulla reprehenderit.
          Duis eu nostrud incididunt adipisicing ut adipisicing culpa laboris eu
          veniam anim esse ea aliquip. Eu fugiat mollit dolor mollit ad.
          Deserunt eu non velit voluptate id ipsum fugiat.
        </GridItem>
      </Grid>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
