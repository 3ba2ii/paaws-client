import { QueryResult } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { Box, Container, Flex } from '@chakra-ui/layout';
import { Layout } from 'components/Layout';
import {
  MissingPostsQuery,
  MissingPostTypes,
  useMissingPostsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import withApollo from 'utils/withApollo';
import { MissingPageContent } from './_MissingPageContent';
import { SideFiltersColumn } from './_SideFiltersColumn';

export const MissingPageContext =
  React.createContext<QueryResult<MissingPostsQuery> | null>(null);
const MissingPage = () => {
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);

  const { data, loading, fetchMore, refetch, variables, ...rest } =
    useMissingPostsQuery({
      variables: {
        input: { limit: 5, cursor: null },
        length: 120,
      },
      notifyOnNetworkStatusChange: true,

      onCompleted: () => {
        setHasLoaded(true);
      },
    });

  const handleSelectFilter = (type: MissingPostTypes) => {
    refetch({ input: { limit: 5, cursor: null }, length: 120, type });
  };
  const fetchMorePosts = async () => {
    if (!data?.missingPosts) return;
    const { missingPosts, hasMore } = data.missingPosts;
    if (!hasMore) return;
    const { createdAt: cursor } = missingPosts[missingPosts.length - 1];
    const newVariables = {
      input: { limit: 5, cursor },
    };
    fetchMore({ variables: newVariables });
  };

  return (
    <Layout title='Missing Pets - Paaws'>
      <Flex
        w='100%'
        h='100%'
        flexDirection={['column', 'row', 'row']}
        alignItems='flex-start'
        justify='center'
        p='inherit'
      >
        <Box w={['100%', '220px', '250px']}>
          <SideFiltersColumn handleSelectFilter={handleSelectFilter} />
        </Box>
        <Container w='100%' h='100%' maxW='1440px' flex={1}>
          <MissingPageContent
            hasLoadedFirstTime={hasLoadedFirstTime}
            fetchMorePosts={fetchMorePosts}
            data={data}
            loading={loading}
          />
        </Container>
      </Flex>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
