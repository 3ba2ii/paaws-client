import { QueryResult } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import {
  Text,
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
  Link,
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import {
  MissingPostsQuery,
  MissingPostTypes,
  useMissingPostsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import withApollo from 'utils/withApollo';
import { MissingPageContent } from '../../modules/posts/missing/MissingPageContent';
import { SideFiltersColumn } from '../../modules/posts/missing/SideFiltersColumn';

const SideFooter = () => {
  return (
    <VStack spacing={3}>
      <SimpleGrid w='100%' columns={2} spacing={3}>
        <Link textStyle='p2'>Help</Link>
        <Link textStyle='p2'>About</Link>
        <Link textStyle='p2' whiteSpace='nowrap'>
          Paaws Pro ✨
        </Link>
        <Link textStyle='p2'>Policy</Link>
        <Link textStyle='p2'>Security</Link>
        <Link textStyle='p2'>Help</Link>
        <Link textStyle='p2'>Report a bug</Link>
        <Link textStyle='p2'>Privacy</Link>
      </SimpleGrid>
      <Text textStyle='p2' w='100%'>
        &copy;2021 Paaws Platform.
      </Text>
    </VStack>
  );
};

export const MissingPageContext =
  React.createContext<QueryResult<MissingPostsQuery> | null>(null);
const MissingPage = () => {
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);

  const { data, loading, fetchMore, refetch } = useMissingPostsQuery({
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
    <Layout title='Missing Pets - Paaws' includeFooter={false}>
      <Flex
        w='100%'
        h='100%'
        flexDirection={['column', 'row', 'row']}
        alignItems='flex-start'
        justifyContent={'center'}
        justify='center'
        sx={{ gap: '2rem' }}
      >
        <Box w={['100%', '220px', '230px']} flex='.2'>
          <SideFiltersColumn handleSelectFilter={handleSelectFilter} />
        </Box>
        <Box w='100%' h='100%' maxW='800px' p={0} flex='.65'>
          <MissingPageContent
            hasLoadedFirstTime={hasLoadedFirstTime}
            fetchMorePosts={fetchMorePosts}
            data={data}
            loading={loading}
          />
        </Box>
        <Box display={['none', 'none', 'block']} flex='.15'>
          <SideFooter />
        </Box>
      </Flex>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
