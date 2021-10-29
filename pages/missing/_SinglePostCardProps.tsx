import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Avatar, Image, Tag, useColorModeValue } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { Maybe, MissingPostTags, Photo } from 'generated/graphql';
import React, { useMemo } from 'react';
import { PostActions } from './_PostActions';
import { PostTags } from './_PostTags';

interface SinglePostCardProps {
  id: number;
  title: string;
  description: string;
  thumbnail?: Partial<Photo> | null;
  points: number;
  createdAt: string;
  voteStatus?: number | null;
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
export const SinglePostCard: React.FC<SinglePostCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  createdAt,
  points,
  user,
  tags,
  address,
  voteStatus,
}) => {
  let isNear = false;
  if (address?.distance) {
    isNear = address.distance <= 100;
  }

  const thumbnailImage = thumbnail?.url || '';

  const { full_name, avatar } = user;
  const createdAtDistance = useMemo(
    () => formatDistance(new Date(createdAt), new Date(), { addSuffix: true }),
    [createdAt]
  );
  const hasVoted = voteStatus != null;

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
        h='100%'
        overflow='hidden'
        p={['24px 16px 6px 16px', '10px 0 10px 0']}
        position='relative'
        sx={{ gap: ['24px', '18px'] }}
      >
        <Flex flexDirection='column' w='100%' sx={{ gap: '6px' }}>
          <Flex alignItems='center' justifyContent='space-between' w='100%'>
            <Flex alignItems='center' w='100%' sx={{ gap: '12px' }}>
              <Box overflow='hidden' maxW='60ch'>
                <Text
                  color={useColorModeValue('gray.700', 'gray.400')}
                  as='h2'
                  textStyle='h5'
                >
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
            <Text textStyle='p3' textAlign={'center'} whiteSpace={'nowrap'}>
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
        {/* Actions */}
        <PostActions {...{ postId: id, hasVoted, voteStatus, points }} />
      </Flex>
    </Flex>
  );
};
