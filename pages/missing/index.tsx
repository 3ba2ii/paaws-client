import { QueryResult } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Grid, GridItem, HStack } from '@chakra-ui/layout';
import {
  Button,
  IconButton,
  Image,
  Input,
  useMediaQuery,
} from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import { motion } from 'framer-motion';
import {
  MissingPost,
  MissingPostsQuery,
  MissingPostTypes,
  useMissingPostsQuery,
} from 'generated/graphql';
import React, { useContext, useEffect, useState } from 'react';
import { GoPlus, GoSettings } from 'react-icons/go';
import withApollo from 'utils/withApollo';
import { MissingPageTaps } from './_MissingPageTaps';
import { MissingPostsGridContainer } from './_MissingPostsGridContainer';

const variants = {
  closed: {
    opacity: 0,
    x: '98%',
    y: '-100%',
  },
  open: {
    opacity: 1,
    x: '0',
    y: '-100%',
  },
};

const PostsOptions: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <HStack
      justify='flex-end'
      w='100%'
      position='relative'
      wrap={['wrap', 'unset']}
      sx={{
        rowGap: '1rem',
      }}
    >
      <Box
        position='relative'
        w='100%'
        display='flex'
        align='flex-start'
        justify='flex-start'
        overflow='hidden'
      >
        <IconButton
          aria-label='Search Icon'
          icon={<SearchIcon />}
          colorScheme='gray'
          ml='auto'
          w='24px'
          onClick={toggleShowOptions}
          zIndex={2}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: '90%',
            height: '100%',
            top: '100%',
          }}
          animate={showOptions ? 'open' : 'closed'}
          variants={variants as any}
        >
          <Input
            w='100%'
            shadow='base'
            variant='filled'
            placeholder='Search for post title, pet type or just description'
            zIndex={1}
          />
        </motion.div>
      </Box>

      <Button
        aria-label='Report Missing Pet'
        colorScheme='gray'
        leftIcon={<GoSettings />}
      >
        Filters
      </Button>
      <Button
        leftIcon={<GoPlus />}
        aria-label='Report Missing Pet'
        colorScheme='teal'
        px={6}
      >
        New Post
      </Button>
    </HStack>
  );
};
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
      <GridItem w='100%'>
        <PostsOptions />
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
  refetch: Function;
}> = ({ handleSelectFilter, refetch }) => {
  const [isHeightSmallerThan600] = useMediaQuery('(max-height: 600px)');

  return (
    <Flex
      flexDirection={['row', 'column']}
      w='100%'
      h={['fit-content', '90vh']}
      maxH='100%'
      align='flex-start'
      justify='space-between'
      maxW={['100%', '250px']}
      position='relative'
      paddingInlineEnd='2rem'
    >
      <MissingPageTaps handleSelectFilter={handleSelectFilter} />
      <Box
        display={['none', 'none', 'block']}
        width='200px'
        position='absolute'
        placeSelf='left'
        bottom='8vh'
        hidden={isHeightSmallerThan600}
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
const MissingPageContext =
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
            <SideFiltersColumn
              handleSelectFilter={handleSelectFilter}
              refetch={refetch}
            />
          </GridItem>
          <GridItem area='center' w='100%'>
            <MissingPageContent
              {...{ data, loading, hasLoadedFirstTime, fetchMore }}
            />
          </GridItem>
        </Grid>
      </MissingPageContext.Provider>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
