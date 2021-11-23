import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Avatar, Tag, useColorModeValue } from '@chakra-ui/react';
import ImageWithFallback from 'components/common/media/ImageWithFallback';
import { formatDistance } from 'date-fns';
import { Maybe, MissingPostTags, Photo } from 'generated/graphql';
import React, { useMemo } from 'react';
import { fallbackSrc } from 'utils/constants';
import { PostActions } from './PostActions';
import { PostTags } from '../common/PostTags';
import { rgbDataURL } from 'utils/rgbDataURL';

interface SinglePostCardProps {
  id: number;
  title: string;
  descriptionSnippet: string;
  thumbnail?: Partial<Photo> | null;
  points: number;
  createdAt: string;
  voteStatus?: number | null;
  commentsCount: number;
  user: {
    id: number;
    displayName: string;
    avatar?: Maybe<{ __typename?: 'Photo'; url?: Maybe<string> }>;
  };
  tags?: MissingPostTags[];
  address?: Maybe<{
    __typename?: 'Address';
    distance?: Maybe<number>;
  }>;
}
export const SinglePostCard: React.FC<SinglePostCardProps> = ({
  id,
  title,
  thumbnail,
  createdAt,
  points,
  user,
  tags,
  address,
  voteStatus,
  descriptionSnippet,
  commentsCount,
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
  const { displayName, avatar } = user;
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
            whiteSpace={'nowrap'}
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
      flexDirection={['column', 'column', 'row']}
      p={'0px'}
      boxShadow='base'
      border='1px'
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      w='100%'
      h='100%'
      borderRadius={'10px'}
      overflow='hidden'
    >
      <Box
        w={['clamp(250px, 100%, minmax(350px,100%))', '100%', '250px']}
        h='100%'
        borderTopLeftRadius={['0px', '0px', '10px']}
        borderBottomLeftRadius={['0px', '0px', '10px']}
        overflow='hidden'
        boxShadow='base'
      >
        <ImageWithFallback
          fallbackSrc={fallbackSrc}
          props={{
            src: thumbnailImage,
            alt: title,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            placeholder: 'blur',
            blurDataURL: rgbDataURL(229, 229, 229),
          }}
        />
      </Box>

      <VStack
        w='100%'
        align='flex-start'
        justify='space-between'
        overflow='hidden'
        p={['16px', '10px 0 10px 16px']}
        sx={{ gap: ['24px', '18px'] }}
      >
        <VStack w='100%' pr={[1, 2, 4]} spacing='6px' align='flex-start'>
          <HStack
            w='100%'
            h='inherit'
            justify='space-between'
            flexWrap={'wrap'}
          >
            <HStack spacing={4}>
              <Text
                color={useColorModeValue('gray.700', 'gray.400')}
                as='h2'
                textStyle='h5'
              >
                {title}
              </Text>
              {/* Post Tags */}
              <ComponentTags />
            </HStack>

            <Text textStyle='p3' textAlign={'center'} whiteSpace={'nowrap'}>
              {createdAtDistance}
            </Text>
          </HStack>
          <HStack>
            <Avatar
              size='xs'
              name={displayName}
              src={avatar?.url || ''}
              cursor='default'
            />
            <Text fontSize='14px' fontWeight='normal' color='gray.500'>
              Posted by{' '}
              <Text
                aria-label='name'
                as='a'
                href={`localhost:3000/user/${displayName}`}
                color='blue.500'
                fontWeight='medium'
              >
                {displayName}
              </Text>
            </Text>
          </HStack>
          <Text as='p' textStyle='p1' maxW={'70ch'} fontWeight='normal'>
            {descriptionSnippet}
          </Text>
        </VStack>
        {/* Actions */}
        <PostActions
          {...{ postId: id, hasVoted, voteStatus, points, commentsCount }}
        />
      </VStack>
    </Flex>
  );
};
