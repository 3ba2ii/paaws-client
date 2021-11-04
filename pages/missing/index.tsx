import { QueryResult } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { Grid, GridItem } from '@chakra-ui/layout';
import { Layout } from 'components/Layout';
import {
  MissingPostsQuery,
  MissingPostTypes,
  useMissingPostsQuery,
} from 'generated/graphql';
import React, { useEffect, useState } from 'react';
import withApollo from 'utils/withApollo';
import { SideFiltersColumn } from './_SideFiltersColumn';
import { MissingPageContent } from './_MissingPageContent';

export const MissingPageContext =
  React.createContext<QueryResult<MissingPostsQuery> | null>(null);
const MissingPage = () => {
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);
  const [filters, setFilters] = useState<MissingPostTypes>(
    MissingPostTypes.All
  ); //will hold the filters for the posts

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
    setFilters(type);
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

  useEffect(() => {
    refetch({ ...variables, type: filters });
  }, [filters]);

  return (
    <Layout title='Missing Pets - Paaws'>
      <MissingPageContext.Provider
        value={{ data, loading, fetchMore, refetch, variables, ...rest }}
      >
        <Grid
          w='100%'
          templateAreas={[
            `"left"
          "center"`,
            '"left center"',
            '"left center"',
          ]}
          gap={'24px'}
          alignItems='baseline'
        >
          <GridItem w={['100%', '220px', '250px']} area='left'>
            <SideFiltersColumn handleSelectFilter={handleSelectFilter} />
          </GridItem>
          <GridItem area='center' w='100%'>
            <MissingPageContent
              hasLoadedFirstTime={hasLoadedFirstTime}
              fetchMorePosts={fetchMorePosts}
            />
          </GridItem>
        </Grid>
      </MissingPageContext.Provider>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
