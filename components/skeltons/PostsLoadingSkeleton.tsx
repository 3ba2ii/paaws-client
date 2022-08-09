import { Divider, HStack, VStack } from '@chakra-ui/layout';
import { Button, IconButton, Skeleton } from '@chakra-ui/react';
import { DummyPostsSkeleton } from 'components/skeltons/DummyPostSkelton';
import React from 'react';

export const PostsLoadingSkeleton: React.FC = () => (
  <VStack w='100%'>
    <VStack w='100%' alignItems='flex-start' spacing={4}>
      <HStack
        w='100%'
        alignSelf={'flex-end'}
        justifyContent='flex-end'
        position='relative'
        wrap={['wrap', 'unset']}
      >
        <Skeleton as={IconButton} borderRadius={4} h='32px' />

        <Skeleton as={Button} borderRadius={4} h='32px'>
          New Post
        </Skeleton>
      </HStack>
      <Divider />
      <Skeleton as={Button} w='90px' h='28px' borderRadius={4}>
        Add Filter
      </Skeleton>
    </VStack>
    <DummyPostsSkeleton noOfPosts={3} />
  </VStack>
);
