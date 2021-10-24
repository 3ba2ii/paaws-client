import { Layout } from 'components/Layout';
import {
  Container,
  Text,
  Heading,
  Flex,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/layout';
import React, { useMemo } from 'react';
import withApollo from 'utils/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import {
  Maybe,
  MissingPost,
  Photo,
  useMissingPostsQueryQuery,
  User,
} from 'generated/graphql';
import {
  Image,
  Avatar,
  IconButton,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { formatDistance } from 'date-fns';

interface SinglePostProps {
  id: number;
  title: string;
  description: string;
  thumbnail?: Partial<Photo> | null;
  points: number;
  createdAt: string;
  user: {
    id: number;
    full_name: string;
    avatar?: Maybe<{ __typename?: 'Photo'; url?: Maybe<string> }>;
  };
}

const SinglePost: React.FC<SinglePostProps> = ({
  title,
  description,
  thumbnail,
  createdAt,
  points,
  user,
}) => {
  const thumbnailImage = thumbnail?.url || '';

  const { id, full_name, avatar } = user;
  const createdAtDistance = useMemo(
    () => formatDistance(new Date(createdAt), new Date(), { addSuffix: true }),
    [createdAt]
  );
  return (
    <Flex
      key={id}
      flexDirection={['column', 'row']}
      p={['0px', '12px']}
      boxShadow='md'
      border='1px'
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      h='100%'
      w='100%'
      borderRadius={'10px'}
      overflow='hidden'
    >
      <Box
        w={['100%', '250px']}
        mr={4}
        borderTopLeftRadius={['0px', '10px']}
        borderBottomLeftRadius={['0px', '10px']}
        overflow='hidden'
        boxShadow='md'
      >
        <Image
          src={thumbnailImage}
          alt={title}
          w='100%'
          h='100%'
          objectFit='cover'
          fallbackSrc='https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445'
        />
      </Box>
      <Flex
        flexDirection='column'
        justify='space-between'
        w='100%'
        overflow='hidden'
        p={['10px 16px', '0px']}
      >
        <Flex flexDirection='column' w='100%' sx={{ gap: '6px' }}>
          <Flex alignItems='center' justifyContent='space-between' w='100%'>
            <Text
              textStyle='h5'
              maxW='50ch'
              color={useColorModeValue('gray.700', 'gray.400')}
            >
              {title} Cupidatat pariatur anim id sunt sit et sit{' '}
            </Text>
            <Text textStyle='p3' fontSize={'11px'} textAlign={'center'}>
              {createdAtDistance}
            </Text>
          </Flex>
          <Flex align='center' sx={{ gap: '6px' }}>
            <Avatar size='xs' name={full_name} src={avatar?.url || ''} />
            <Text fontSize='14px' fontWeight='normal' color='gray.500'>
              Posted by{' '}
              <Text
                aria-label='name'
                as='a'
                href={`localhost:3000/user/${full_name}`}
                color='blue.500'
                fontWeight='medium'
              >
                {full_name}
              </Text>
            </Text>
          </Flex>
          <Text as='p' textStyle='p1' maxW={'70ch'} fontWeight='normal'>
            {description}
            Labore voluptate ex eiusmod
          </Text>
        </Flex>
        <Flex align='center' sx={{ gap: '6px' }} color='#A0AEC0'>
          <Button variant={'ghost'} p='2px'>
            <FaChevronUp width={'100%'} />
          </Button>
          <Text color='gray.500' textStyle='p1'>
            {points}
          </Text>
          <Button variant={'ghost'} p='2px'>
            <FaChevronDown />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

/* Missing Posts Grid Container */
const MissingPostsGridContainer = () => {
  const { data, loading } = useMissingPostsQueryQuery();

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  const posts = data.missingPosts;
  return (
    <Grid
      templateRows={[
        `repeat(${posts.length}, fit-content),repeat(${posts.length}, 200px)`,
      ]}
      gap={'24px'}
    >
      {posts.map(
        ({ id, title, description, points, user, createdAt, thumbnail }) => {
          return (
            <GridItem w='100%' h='100%' key={id}>
              <SinglePost
                {...{
                  id,
                  title,
                  description,
                  points,
                  createdAt,
                  user,
                  thumbnail,
                }}
              />
            </GridItem>
          );
        }
      )}
    </Grid>
  );
};

interface MissingPageProps {}

const MissingPage: React.FC<MissingPageProps> = ({}) => {
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
              <Button colorScheme={'teal'}>Report Missing Pet</Button>
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
