import { getDataFromTree } from '@apollo/client/react/ssr';
import { Box, Flex, Grid, GridItem, HStack } from '@chakra-ui/layout';
import {
  Button,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useMediaQuery,
} from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import {
  MissingPost,
  MissingPostsQuery,
  MissingPostTypes,
  useMissingPostsQuery,
} from 'generated/graphql';
import { SearchIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { BiFilter, BiFilterAlt, BiPlus } from 'react-icons/bi';
import { GoPlus, GoSettings } from 'react-icons/go';
import { FaChevronDown } from 'react-icons/fa';
import withApollo from 'utils/withApollo';
import { MissingPageTaps } from './_MissingPageTaps';
import { MissingPostsGridContainer } from './_MissingPostsGridContainer';
import { FcSettings } from 'react-icons/fc';

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
        {/* Search bar */}
        <HStack justify='flex-end' w='100%'>
          {/*  <InputGroup alignItems='center' justify='center'>
            <InputLeftElement
              py={5}
              px={7}
              pointerEvents='none'
              children={<SearchIcon color='gray.500' />}
            />
            <Input
              shadow='base'
              py={5}
              pl={12}
              rounded='lg'
              variant='filled'
              placeholder='Search for pets, people or anything...'
            />
          </InputGroup> */}
          <IconButton
            aria-label='Search Icon'
            icon={<SearchIcon />}
            colorScheme='gray'
          />
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
          >
            New Post
          </Button>
        </HStack>
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
      position='fixed'
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

const MissingPage = () => {
  const [hasLoadedFirstTime, setHasLoaded] = useState(false);
  const [filters, setFilters] = useState<MissingPostTypes[]>([]); //will hold the filters for the posts
  const [isSmallerThan1440] = useMediaQuery('(max-width: 1440px)');

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
        <GridItem hidden={isSmallerThan1440} w='250px' area='right'></GridItem>
      </Grid>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
