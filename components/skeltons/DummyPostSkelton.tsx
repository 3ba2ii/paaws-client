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
      flexDirection={['column', 'row']}
      boxShadow='base'
      //border='1px'
      //borderColor={useColorModeValue('gray.200', 'gray.700')}
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
        <Skeleton w='100%' h='100%' />
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
      divider={<Divider />}
    >
      {[...Array(noOfPosts)].map((_, index) => (
        <SingleDummySkeleton key={index} />
      ))}
    </VStack>
  );
};
