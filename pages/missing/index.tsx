import { getDataFromTree } from '@apollo/client/react/ssr';
import { Container, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { useMissingPostsQueryQuery } from 'generated/graphql';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import withApollo from 'utils/withApollo';
import { SinglePostCard } from './_SinglePostCardProps';
/* Missing Posts Grid Container */
const MissingPostsGridContainer = () => {
  const { data, loading } = useMissingPostsQueryQuery();

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  const posts = data.missingPosts;
  return (
    <Flex flexDirection='column' sx={{ gap: '24px' }} w='100%'>
      {posts.map(
        ({
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
        }) => {
          return (
            <GridItem key={id} w='100%' h='100%'>
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
            </GridItem>
          );
        }
      )}
    </Flex>
  );
};

const MissingPage: React.FC = ({}) => {
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
            <MissingPostsGridContainer />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};
export default withApollo(MissingPage, { getDataFromTree });
