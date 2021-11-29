import { getDataFromTree } from '@apollo/client/react/ssr';
import { Box, Flex } from '@chakra-ui/layout';
import { Layout } from 'components/Layout';
import { SideFooter } from 'components/SideFooter';
import {
  MissingPostTypes,
  PostFilters,
  useMissingPostsQuery,
} from 'generated/graphql';
import { MissingPageContent } from 'modules/posts/missing/MissingPageContent';
import { RecommendationCardContainer } from 'modules/posts/missing/RecommendationCard';
import { SideFiltersColumn } from 'modules/posts/missing/SideFiltersColumn';
import React, { useState } from 'react';
import withApollo from 'utils/withApollo';
import { FixedAnnouncementIndication } from 'modules/posts/missing/FixedAnnouncementIndication';

export const MissingPageContext = React.createContext<{
  handleSelectFilters?: (filters: PostFilters) => void;
}>({});
const MissingPage = () => {
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);
  const [selectedType, setSelectedType] = useState<MissingPostTypes>(
    MissingPostTypes.All
  );

  const { data, loading, fetchMore, refetch, variables } = useMissingPostsQuery(
    {
      variables: {
        input: { limit: 5, cursor: null },
        length: 120,
        filters: { date: null, location: null },
      },
      notifyOnNetworkStatusChange: true,

      onCompleted: () => {
        setHasLoaded(true);
      },
    }
  );
  const [paginationLoading, setPaginationLoading] = useState(false);

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
      ...variables,
      input: { limit: 5, cursor },
    };
    setPaginationLoading(true);
    fetchMore({ variables: newVariables }).finally(() => {
      setPaginationLoading(false);
    });
  };

  return (
    <Layout title='Missing Pets - Paaws' includeFooter={false}>
      <MissingPageContext.Provider value={{ handleSelectFilters }}>
        <Flex
          w='100%'
          h='100vh'
          flexDirection={['column', 'row', 'row']}
          alignItems='flex-start'
          justifyContent={'center'}
          justify='center'
          sx={{ gap: '1.5rem' }}
        >
          <Box w={['100%', '220px', '230px']} flex='.175'>
            <SideFiltersColumn handleSelectType={handleSelectType} />
          </Box>
          <Box w='100%' h='100%' maxW='800px' p={0} flex='.6'>
            <MissingPageContent
              hasLoadedFirstTime={hasLoadedFirstTime}
              fetchMorePosts={fetchMorePosts}
              data={data}
              loading={loading}
              paginationLoading={paginationLoading}
            />
          </Box>
          <Box display={['none', 'none', 'block']} flex='.225'>
            <SideFooter>
              <RecommendationCardContainer />
            </SideFooter>
          </Box>
        </Flex>
      </MissingPageContext.Provider>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
