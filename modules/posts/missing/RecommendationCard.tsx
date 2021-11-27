import { Box, Heading, VStack, Text } from '@chakra-ui/layout';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useAdoptionPostsQuery } from 'generated/graphql';
import Image from 'next/image';
import React from 'react';
export const RecommendationCard: React.FC = () => {
  const { data, loading } = useAdoptionPostsQuery({ variables: { limit: 5 } });
  const noPosts = data && !data?.adoptionPosts?.posts.length;
  console.log(`🚀 ~ file: RecommendationCard.tsx ~ line 9 ~ data`, data);
  return (
    <Box
      w='100%'
      minH='250px'
      p={'16px'}
      borderRadius={'6px'}
      boxShadow='sm'
      borderWidth={'0.5px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      overflow='hidden'
      bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.100')}
    >
      <Heading
        as='h3'
        size='sm'
        color={useColorModeValue('gray.700', 'white')}
        mt={2}
      >
        Pets for Adoption
      </Heading>
      <VStack mt={5} w='100%' h='100%' align='center' justify={'center'}>
        {loading ? (
          <LoadingComponent progressProps={{ size: '32px' }} />
        ) : noPosts ? (
          <VStack align='center' textAlign={'center'} spacing={2}>
            <Image
              src='/illustrations/cat-sleeping.svg'
              width='250px'
              height='150px'
              alt='Adopt a pet'
            />
            <Box>
              <Heading
                as='h3'
                size='sm'
                fontWeight={'semibold'}
                textAlign={'center'}
                mb={1}
              >
                No pets for adoption
              </Heading>
              <Text textStyle='p1' fontSize={'sm'} maxW='26ch'>
                Click the button below to offer one of your pets for adoption.
              </Text>
            </Box>
            <Button size='sm' colorScheme={'teal'} w='80%' variant='ghost'>
              Offer a Pet
            </Button>
          </VStack>
        ) : null}
      </VStack>
    </Box>
  );
};
