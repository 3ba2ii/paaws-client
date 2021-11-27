import { Box, Heading, HStack, VStack, Text, Divider } from '@chakra-ui/layout';
import {
  Avatar,
  Button,
  IconButton,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useAdoptionPostsQuery } from 'generated/graphql';
import Image from 'next/image';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const RecommendationCard: React.FC = () => {
  return (
    <HStack w='100%' align='flex-start'>
      <Avatar name='Katy Katy' src='/illustrations/loading-lazy-cat.gif' />
      <VStack w='100%' align='flex-start'>
        <HStack w='100%' justify={'space-between'}>
          <Box>
            <HStack>
              <Heading as='h4' size='xs' fontWeight='semibold'>
                Katy Katy
              </Heading>
              <Text fontSize='xs' color='gray.500'>
                M
              </Text>
            </HStack>
            <Text fontSize='sm' color='blue.500'>
              Bulldog, Husky
            </Text>
          </Box>
          <IconButton
            aria-label='go-to-pet'
            icon={<FiChevronRight />}
            variant='ghost'
          />
        </HStack>
        <HStack>
          <Tag
            colorScheme={'blue'}
            size='sm'
            fontSize={'10px'}
            borderRadius={'2px'}
          >
            Near you
          </Tag>
          <Tag
            colorScheme={'pink'}
            size='sm'
            fontSize={'10px'}
            borderRadius={'2px'}
          >
            Ball Catcher
          </Tag>
        </HStack>
        <Text fontSize='xs' textStyle={'p2'}>
          Est est incididunt adipisicing do consectetur dolor proident
        </Text>
      </VStack>
    </HStack>
  );
};

const NoAdoptionPostsContainer: React.FC = () => {
  return (
    <VStack align='center' textAlign={'center'} spacing={2}>
      <Image
        src='/illustrations/cat-sleeping.svg'
        width='250px'
        height='150px'
        alt='Offer a pet'
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
  );
};
export const RecommendationCardContainer: React.FC = () => {
  const { data, loading } = useAdoptionPostsQuery({ variables: { limit: 5 } });
  const noPosts = data && !data?.adoptionPosts?.posts.length;
  console.log(`🚀 ~ file: RecommendationCard.tsx ~ line 9 ~ data`, data);

  const displayContent = () => {
    if (loading)
      return (
        <LoadingComponent
          progressProps={{
            size: '28px',
            color: 'teal.400',
            marginTop: '25%',
          }}
        />
      );
    else if (noPosts) return <NoAdoptionPostsContainer />;
    return (
      <VStack spacing={5}>
        <VStack divider={<Divider />} w='100%'>
          {[1, 2].map((_) => (
            <RecommendationCard />
          ))}
        </VStack>
        <Button
          size='sm'
          colorScheme={'blue'}
          w='100%'
          rightIcon={<FiChevronRight />}
        >
          Find More
        </Button>
      </VStack>
    );
  };
  return (
    <Box
      w='100%'
      minH='250px'
      p={'16px 8px 16px 16px'}
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
      <VStack w='100%' h='100%' align='center' justify={'center'} mt={5}>
        {displayContent()}
      </VStack>
    </Box>
  );
};
