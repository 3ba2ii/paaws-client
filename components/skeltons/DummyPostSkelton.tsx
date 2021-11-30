import { Divider, VStack } from '@chakra-ui/layout';
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const SingleDummySkeleton = (): JSX.Element => {
  return (
    <Flex
      flexDirection={['column', 'column', 'row']}
      boxShadow='base'
      p={'0px'}
      borderWidth={'.5px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      w='100%'
      borderRadius={'10px'}
      sx={{ gap: '10px' }}
    >
      <Skeleton
        as={Box}
        w={['clamp(150px, 100%, minmax(350px,100%))', '100%', '200px']}
        h='100%'
        borderTopLeftRadius={['0px', '0px', '4px']}
        borderBottomLeftRadius={['0px', '0px', '4px']}
        overflow='hidden'
        boxShadow='base'
      />

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
        <VStack spacing='8px' align='flex-start' w='95%'>
          <HStack w='100%' justify='space-between'>
            <HStack spacing={4} w='100%'>
              <Skeleton h='20px'>
                Esse ut elit minim veniam. elit minim veniam.
              </Skeleton>
            </HStack>
          </HStack>
          <HStack>
            <SkeletonCircle width='24px' height='24px' />
            <Skeleton height='12px'>Lorem Lorem Ipsum</Skeleton>
          </HStack>
          <SkeletonText w='100%' h='100%' />
        </VStack>
        <HStack>
          <Skeleton width='100%'>
            <Box w={'90px'} h='20px' />
          </Skeleton>
        </HStack>
      </Flex>
    </Flex>
  );
};

export const DummyPostsSkeleton: React.FC<{ noOfPosts?: number }> = ({
  noOfPosts = 2,
}): JSX.Element => {
  return (
    <VStack
      sx={{
        gap: '16px',
      }}
      w='100%'
      h='100%'
      divider={<Divider />}
    >
      {[...Array(noOfPosts)].map((_, index) => (
        <SingleDummySkeleton key={index} />
      ))}
    </VStack>
  );
};
