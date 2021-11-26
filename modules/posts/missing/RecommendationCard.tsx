import { Box, Heading, VStack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useAdoptionPostsQuery } from 'generated/graphql';
import React from 'react';

export const RecommendationCard: React.FC = () => {
  const { data, loading } = useAdoptionPostsQuery({ variables: { limit: 5 } });
  const noPosts = data && !data?.adoptionPosts?.posts.length;
  console.log(`🚀 ~ file: RecommendationCard.tsx ~ line 9 ~ data`, data);
  return (
    <Box
      w='100%'
      h='400px'
      p={'16px'}
      borderRadius={'8px'}
      boxShadow='sm'
      borderWidth={'0.5px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      overflow='hidden'
      bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.200')}
    >
      <Heading
        as='h3'
        size='sm'
        color={useColorModeValue('gray.700', 'white')}
        mt={3}
      >
        Recommendations
      </Heading>
      <VStack h='100%' align='center' justify={'center'}>
        {loading ? (
          <LoadingComponent progressProps={{ size: '32px' }} />
        ) : noPosts ? (
          <VStack>
            <Heading
              as='h3'
              size='sm'
              color={useColorModeValue('gray.700', 'gray.500')}
              fontWeight={'semibold'}
              textAlign={'center'}
            >
              There are no pets offered for adoption right now.
            </Heading>
          </VStack>
        ) : null}
      </VStack>
    </Box>
  );
};
