import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Tag, useColorModeValue } from '@chakra-ui/react';
import ImageWithFallback from 'components/media/ImageWithFallback';
import { formatDistance } from 'date-fns';
import { MissingPostsQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { fallbackSrc } from 'utils/constants';
import { rgbDataURL } from 'utils/helpers/rgbDataURL';
import { PostOwner } from '../../../components/PostOwner';
import { PostTags } from '../common/PostTags';
import { PostActions } from './PostActions';
import { MissingPostType } from './posts.types';

interface SinglePostCardProps {
  post: MissingPostType;
}
export const SinglePostCard: React.FC<SinglePostCardProps> = ({
  post: {
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
  },
}) => {
  const router = useRouter();
  const { displayName, avatar } = user;
  const isNear = address?.distance ? address.distance <= 100 : false;
  const createdAtDistance = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });

  const redirectToPost = () => {
    router.push(`/missing/${id}`);
  };
  const TagsComponent = () => {
    return (
      <HStack>
        {tags && (
          <PostTags
            tags={tags}
            tagProps={{
              borderRadius: '3',
              boxShadow: 'sm',
              fontSize: '12px',
              fontWeight: 'semibold',
              size: 'sm',
            }}
          />
        )}
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
      boxShadow='sm'
      w='100%'
      h='100%'
      borderRadius={'6px'}
      overflow='hidden'
      alignItems={['unset', 'center']}
      sx={{ gap: ['10px', '0px'] }}
      cursor={'pointer'}
      transition={'all 0.2s ease-in-out'}
      tabIndex={1}
      //borderWidth={'0.5px'}
      //borderColor={useColorModeValue('gray.200', 'gray.700')}
      //bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.200')}
    >
      <Box
        w={['clamp(150px, 100%, minmax(350px,100%))', '100%', '200px']}
        h='100%'
        borderTopLeftRadius={['0px', '0px', '4px']}
        borderBottomLeftRadius={['0px', '0px', '4px']}
        overflow='hidden'
        boxShadow='base'
        onClick={redirectToPost}
      >
        <ImageWithFallback
          fallbackSrc={fallbackSrc}
          props={{
            src: thumbnail?.url || '',
            alt: title,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            placeholder: 'blur',
            blurDataURL: rgbDataURL(200, 200, 200),
          }}
        />
      </Box>
      <VStack
        w='100%'
        alignItems='flex-start'
        justifyContent='space-between'
        overflow='hidden'
        p={['16px', '0 0 0 16px']}
        sx={{ gap: ['24px', '18px'] }}
      >
        <VStack
          w='100%'
          pr={[1, 2, 4]}
          spacing='6px'
          alignItems='flex-start'
          onClick={redirectToPost}
        >
          <HStack
            w='100%'
            h='inherit'
            justifyContent='space-between'
            flexWrap={'wrap'}
          >
            <HStack spacing={4}>
              <Text
                color={useColorModeValue('gray.700', 'gray.400')}
                as='h2'
                textStyle='h5'
                noOfLines={1}
                maxW='30ch'
                wordBreak={'break-all'}
              >
                {title}
              </Text>
              {/* Post Tags */}
              <TagsComponent />
            </HStack>

            <Text textStyle='p3' textAlign={'center'} whiteSpace={'nowrap'}>
              {createdAtDistance}
            </Text>
          </HStack>
          <PostOwner {...{ displayName, id, avatarUrl: avatar?.url }} />
          <Text as='p' textStyle='p1' fontWeight='normal' noOfLines={2}>
            {descriptionSnippet}
          </Text>
        </VStack>
        {/* Actions */}
        <PostActions {...{ id, voteStatus, points, commentsCount }} />
      </VStack>
    </Flex>
  );
};
