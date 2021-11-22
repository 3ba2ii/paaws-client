import { getDataFromTree } from '@apollo/client/react/ssr';
import { Box, Flex } from '@chakra-ui/layout';
import { Layout } from 'components/Layout';
import {
  MissingPostTypes,
  PostFilters,
  useMissingPostsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import withApollo from 'utils/withApollo';
import { SideFooter } from '../../components/SideFooter';
import { MissingPageContent } from '../../modules/posts/missing/MissingPageContent';
import { SideFiltersColumn } from '../../modules/posts/missing/SideFiltersColumn';

export const MissingPageContext = React.createContext<{
  handleSelectFilters?: (filters: PostFilters) => void;
}>({});
const MissingPage = () => {
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);
  const [selectedType, setSelectedType] = useState<MissingPostTypes>(
    MissingPostTypes.All
  );

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

  const handleSelectType = (type: MissingPostTypes) => {
    refetch({ input: { limit: 5, cursor: null }, length: 120, type });
    setSelectedType(type);
  };
  const handleSelectFilters = (filters: PostFilters) => {
    refetch({
      input: { limit: 5, cursor: null },
      length: 120,
      type: selectedType,
      filters,
    });
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
      <MissingPageContext.Provider value={{ handleSelectFilters }}>
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
            <SideFiltersColumn handleSelectType={handleSelectType} />
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
      </MissingPageContext.Provider>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
