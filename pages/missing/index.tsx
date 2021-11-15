import { QueryResult } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { Box, Flex } from '@chakra-ui/layout';
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
    <Layout title='Missing Pets - Paaws'>
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
          Voluptate ipsum Lorem tempor quis voluptate deserunt id eiusmod
          occaecat consequat nostrud irure incididunt. Amet occaecat est enim
          amet ex minim exercitation culpa. Cillum irure laborum labore laborum
          veniam sunt. Incididunt laborum laborum quis sunt enim nulla tempor
          consequat aliquip eiusmod ea esse. Sunt cillum ea reprehenderit irure
          commodo nisi nostrud laboris adipisicing magna labore nostrud dolore.
          Do adipisicing incididunt occaecat ipsum eu cillum non cupidatat
          eiusmod ex. Esse qui dolore voluptate anim fugiat.
        </Box>
      </Flex>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
