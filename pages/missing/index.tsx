import { getDataFromTree } from '@apollo/client/react/ssr';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
} from '@chakra-ui/layout';
import {
  Avatar,
  Button,
  IconButton,
  Image,
  Tag,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { formatDistance } from 'date-fns';
import {
  Maybe,
  MissingPostTags,
  Photo,
  useMissingPostsQueryQuery,
} from 'generated/graphql';
import React, { useMemo } from 'react';
import {
  BiComment,
  BiCommentDots,
  BiCommentX,
  BiDownvote,
  BiMessageRounded,
  BiShareAlt,
  BiUpvote,
} from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import withApollo from 'utils/withApollo';
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
  tags?: MissingPostTags[];
  address:
    | Maybe<{
        __typename?: 'Address' | undefined;
        distance?: Maybe<number> | undefined;
      }>
    | undefined;
}
const PostTags: React.FC<{ tags: MissingPostTags[] }> = ({ tags }) => {
  const getColorProps = (tag: MissingPostTags) => {
    switch (tag) {
      case 'Missing':
        return { colorScheme: 'red' };
      case 'Found':
        return { colorScheme: 'blue' };
      case 'Urgent':
        return { colorScheme: 'red' };
      default:
        return '';
    }
  };
  return (
    <>
      {tags?.map((tag) => (
        <Tag
          key={tag}
          borderRadius='3'
          boxShadow='sm'
          fontSize='12px'
          fontWeight='semibold'
          size='sm'
          {...getColorProps(tag)}
        >
          {tag}
        </Tag>
      ))}
    </>
  );
};

const SinglePost: React.FC<SinglePostProps> = ({
  title,
  description,
  thumbnail,
  createdAt,
  points,
  user,
  tags,
  address,
}) => {
  let isNear = false;
  if (address?.distance) {
    isNear = address.distance <= 100;
  }

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
      w='100%'
      h={['100%', '200px']}
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
            <Flex alignItems='center' w='100%' sx={{ gap: '12px' }}>
              <Box
                color={useColorModeValue('gray.700', 'gray.400')}
                overflow='hidden'
                maxW='60ch'
              >
                <Text as='h2' textStyle='h5'>
                  {title}
                </Text>
              </Box>
              <HStack>
                {tags && <PostTags tags={tags} />}
                {isNear && (
                  <Tag
                    colorScheme='cyan'
                    borderRadius='3'
                    boxShadow='sm'
                    size='sm'
                    fontSize='12px'
                    fontWeight='semibold'
                  >
                    Near you
                  </Tag>
                )}
              </HStack>
            </Flex>
            <Text
              textStyle='p3'
              fontSize={'11px'}
              textAlign={'center'}
              whiteSpace={'nowrap'}
            >
              {createdAtDistance}
            </Text>
          </Flex>
          <Flex align='center' sx={{ gap: '6px' }}>
            <Avatar
              size='xs'
              name={full_name}
              src={avatar?.url || ''}
              cursor='default'
            />
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
          <Box maxW={'inherit'} overflow='hidden'>
            <Text as='p' textStyle='p1' maxW={'70ch'} fontWeight='normal'>
              {description}
              Labore voluptate ex eiusmod
            </Text>
          </Box>
        </Flex>
        <Flex
          align='center'
          color={'gray.400'}
          mb={2}
          ml={1}
          sx={{ gap: '4px' }}
        >
          <Button
            sx={{
              minWidth: 'auto',
              height: 'auto',
              p: '6px',
            }}
            variant={'ghost'}
            fontSize={'18px'}
            color='inherit'
          >
            <BiUpvote width={'100%'} height={'100%'} />
          </Button>
          <Text color='inherit' textStyle='p1'>
            {points}
          </Text>
          <Button
            sx={{
              minWidth: 'auto',
              height: 'auto',
              padding: '6px',
            }}
            variant={'ghost'}
            fontSize={'18px'}
            color='inherit'
          >
            <BiDownvote />
          </Button>

          {/* Comments Section */}
          <Button
            sx={{
              minWidth: 'auto',
              height: 'auto',
              padding: '6px',
            }}
            variant={'ghost'}
            color='inherit'
            leftIcon={<BiMessageRounded />}
          >
            11
          </Button>
          {/* Share  */}
          <IconButton
            sx={{
              minWidth: 'auto',
              height: 'auto',
              padding: '6px',
            }}
            variant={'ghost'}
            color='inherit'
            icon={<BiShareAlt />}
            aria-label={'Share'}
          />
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
        }) => {
          return (
            <GridItem key={id} w='100%' h='100%'>
              <SinglePost
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
                }}
              />
            </GridItem>
          );
        }
      )}
    </Flex>
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
