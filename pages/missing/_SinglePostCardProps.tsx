import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Avatar,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';
import ImageWithFallback from 'components/ImageWithFallback';
import { formatDistance } from 'date-fns';
import { Maybe, MissingPostTags, Photo } from 'generated/graphql';
import React, { useMemo } from 'react';
import { fallbackSrc } from 'utils/constants';
import { PostActions } from './_PostActions';
import { PostTags } from './_PostTags';

interface SinglePostCardProps {
  isLoaded?: boolean;

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
  isLoaded = true,
}) => {
  let isNear = false;
  if (address?.distance) {
    isNear = address.distance <= 100;
  }

  const thumbnailImage = thumbnail?.url || '';

  const createdAtDistance = useMemo(
    () => formatDistance(new Date(createdAt), new Date(), { addSuffix: true }),
    [createdAt]
  );
  const { full_name, avatar } = user;
  const hasVoted = voteStatus != null;

  const ComponentTags = () => {
    return (
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
    );
  };

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
        <Skeleton isLoaded={isLoaded}>
          <ImageWithFallback
            fallbackSrc={fallbackSrc}
            props={{
              src: thumbnailImage,
              loading: 'eager',
              alt: title,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Skeleton>
      </Box>

      <Flex
        flexDirection='column'
        align='flex-start'
        justify='space-between'
        w='100%'
        h='100%'
        overflow='hidden'
        p={['16px', '10px 0']}
        sx={{ gap: ['24px', '18px'] }}
      >
        <VStack spacing='6px' align='flex-start'>
          <HStack w='100%' justify='space-between'>
            <HStack spacing={4}>
              <Skeleton isLoaded={isLoaded}>
                <Text
                  maxW='60ch'
                  color={useColorModeValue('gray.700', 'gray.400')}
                  as='h2'
                  textStyle='h5'
                >
                  {title}
                </Text>
              </Skeleton>
              <Skeleton hidden={!isLoaded} isLoaded={isLoaded}>
                <ComponentTags />
              </Skeleton>
            </HStack>
            <Skeleton height='fit-content' isLoaded={isLoaded}>
              <Text textStyle='p3' textAlign={'center'} whiteSpace={'nowrap'}>
                {createdAtDistance}
              </Text>
            </Skeleton>
          </HStack>
          <HStack>
            <SkeletonCircle
              isLoaded={isLoaded}
              width='fit-content'
              height='fit-content'
            >
              <Avatar
                size='xs'
                name={full_name}
                src={avatar?.url || ''}
                cursor='default'
              />
            </SkeletonCircle>
            <Skeleton height='fit-content' isLoaded={isLoaded}>
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
            </Skeleton>
          </HStack>
          <SkeletonText w='fit-content' h='fit-content' isLoaded={isLoaded}>
            <Text as='p' textStyle='p1' maxW={'70ch'} fontWeight='normal'>
              {description}
              Labore voluptate ex eiusmod
            </Text>
          </SkeletonText>
        </VStack>
        {/* Actions */}
        <Skeleton isLoaded={isLoaded} width='fit-content'>
          <PostActions {...{ postId: id, hasVoted, voteStatus, points }} />
        </Skeleton>
      </Flex>
    </Flex>
  );
};
