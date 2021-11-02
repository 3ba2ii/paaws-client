import { getDataFromTree } from '@apollo/client/react/ssr';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { Button, IconButton, Image, useMediaQuery } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import {
  MissingPost,
  MissingPostsQuery,
  MissingPostTypes,
  useMissingPostsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import withApollo from 'utils/withApollo';
import { MissingPageTaps } from './_MissingPageTaps';
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
        <Flex sx={{ gap: '8px' }}>
          <Button
            rightIcon={<FaChevronDown />}
            variant='outline'
            aria-label='sorting'
          >
            Most Recent
          </Button>
          <IconButton
            aria-label='Report Missing Pet'
            icon={<BiPlus />}
            colorScheme={'teal'}
            bg='teal.400'
            fontSize='24px'
          />
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

const SideFiltersColumn: React.FC<{
  handleSelectFilter: (type: MissingPostTypes) => void;
}> = ({ handleSelectFilter }) => {
  return (
    <Flex
      flexDirection={['row', 'column']}
      w='100%'
      h={['fit-content', '80vh']}
      align='flex-start'
      justify='space-between'
      position='relative'
      maxW={['100%', '250px']}
    >
      <MissingPageTaps handleSelectFilter={handleSelectFilter} />
      <Box
        display={['none', 'none', 'block']}
        width='200px'
        position='absolute'
        placeSelf='left'
        bottom='0'
      >
        <Image
          src='/illustrations/CTA.svg'
          w='100%'
          h='100%'
          objectFit='cover'
        />
        <Button
          position='absolute'
          bottom='8%'
          left='50%'
          transform='translateX(-50%)'
          variant='solid'
          colorScheme='red'
          bg='red.400'
          w='80%'
          color='white'
          fontWeight='bold'
          borderRadius={6}
          size='sm'
        >
          Discover More
        </Button>
      </Box>
    </Flex>
  );
};

const MissingPage = () => {
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);
  const [filters, setFilters] = useState<MissingPostTypes[]>([]); //will hold the filters for the posts
  const [isSmallerThan1440] = useMediaQuery('(max-width: 1440px)');
  console.log(
    `🚀 ~ file: index.tsx ~ line 129 ~ MissingPage ~ isSmallerThan720`,
    isSmallerThan1440
  );
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
  const handleSelectFilter = (type: MissingPostTypes) => {
    const index = filters.indexOf(type);
    if (index === -1) {
      setFilters([...filters, type]);
    }
  };

  return (
    <Layout title='Missing Pets - Paaws'>
      <Grid
        w='100%'
        templateAreas={[
          `"left"
          "center"`,
          '"left center"',
          '"left center right"',
        ]}
        gap={'24px'}
        alignItems='baseline'
      >
        <GridItem w={['100%', '220px', '220px']} area='left'>
          <SideFiltersColumn handleSelectFilter={handleSelectFilter} />
        </GridItem>
        <GridItem area='center' w='100%' maxW={['none', '800px']}>
          <MissingPageContent
            {...{ data, loading, hasLoadedFirstTime, fetchMore }}
          />
        </GridItem>
        <GridItem hidden={isSmallerThan1440} w='250px' area='right'>
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
