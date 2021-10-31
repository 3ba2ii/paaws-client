import { getDataFromTree } from '@apollo/client/react/ssr';
import { Box, Container, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { MissingPost, useMissingPostsQuery } from 'generated/graphql';
import React, { useEffect, useMemo, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import useOnScreen from 'utils/useOnScreen';
import withApollo from 'utils/withApollo';
import { SinglePostCard } from './_SinglePostCardProps';

/* Missing Posts Grid Container */
const MissingPostsGridContainer: React.FC<{
  posts: Array<MissingPost>;
  fetchMorePosts: VoidFunction;
}> = ({ posts, fetchMorePosts }) => {
  const preLastElementRef = useRef(null);
  console.log(
    `🚀 ~ file: index.tsx ~ line 18 ~ preLastElementRef`,
    preLastElementRef
  );
  const isVisible = useOnScreen(preLastElementRef);

  // to check if the last pre last element is visible on screen or not

  console.log(`🚀 ~ file: index.tsx ~ line 18 ~ isVisible`, isVisible);

  useEffect(() => {
    if (isVisible) {
      console.log(`🚀 ~ file: index.tsx ~ line 22 ~ isVisible`, isVisible);
      // if the last pre last element is visible on screen then fetch more posts
      fetchMorePosts();
    }
  }, [isVisible]);
  return (
    <Flex flexDirection='column' sx={{ gap: '24px' }} w='100%'>
      {posts.map(
        (
          {
            id,
            title,
            description,
            points,
            user,
            createdAt,
            tags,
            thumbnail,
            address,
            voteStatus,
          },
          index
        ) => {
          return (
            <Box
              key={id}
              ref={index === posts.length - 1 ? preLastElementRef : null}
            >
              <>{index === posts.length - 1 ? 'This is the one' : null}</>
              <SinglePostCard
                {...{
                  id,
                  title,
                  description,
                  points,
                  createdAt,
                  user,
                  thumbnail,
                  tags,
                  address,
                  voteStatus,
                }}
              />
            </Box>
          );
        }
      )}
    </Flex>
  );
};

const MissingPage: React.FC = (props) => {
  const { data, loading, fetchMore } = useMissingPostsQuery({
    variables: {
      input: {
        limit: 5,
        cursor: null,
      },
    },
  });

  /*  const checkIfLastPostScrolled = (): boolean => {
    console.log('Scrolling');
    if (!lastPostRef?.current) return false;
    const lastPost = lastPostRef.current;
    const lastPostBottom = (lastPost as HTMLElement).getBoundingClientRect()
      .bottom;
    const windowHeight = window.innerHeight;
    const windowBottom = window.scrollY + windowHeight;
    const hasScrolled = lastPostBottom <= windowBottom;
    console.log(
      `🚀 ~ file: index.tsx ~ line 39 ~ checkIfLastPostScrolled ~ hasScrolled`,
      hasScrolled
    );
    return hasScrolled;
  }; */
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const { missingPosts, hasMore, errors } = data.missingPosts;
  if (errors?.length) return <div>Error occurred</div>;

  const fetchMorePosts = async () => {
    if (!hasMore) return;
    const { createdAt: cursor } = missingPosts[missingPosts.length - 1];
    const variables = {
      input: {
        limit: 5,
        cursor,
      },
    };

    await fetchMore({
      variables,
    });
  };

  return (
    <Layout title='Missing Pets - Paaws'>
      {/* This will be divided into 2 sections
        1. Filters Section (32% width)     
        2. Pet Listing Section (68% width)
      */}
      <Container maxW={['100%', '900px']}>
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
            />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
