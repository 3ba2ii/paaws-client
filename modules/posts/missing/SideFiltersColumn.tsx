import { Box, Flex, VStack, Text, Heading } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { MissingPostTypes } from 'generated/graphql';
import React from 'react';
import { MissingPageTaps } from './MissingPageTaps';

export const SideFiltersColumn: React.FC<{
  handleSelectFilter: (type: MissingPostTypes) => void;
}> = ({ handleSelectFilter }) => {
  return (
    <Flex
      w='100%'
      flexDirection={['row', 'column']}
      h={['fit-content', 'calc(100vh - 12rem)']}
      align='flex-start'
      justify='space-between'
      maxW={['100%', '250px']}
      position='relative'
    >
      <MissingPageTaps handleSelectFilter={handleSelectFilter} />
      <VStack
        display={['none', 'none', 'flex']}
        flexDir={'column'}
        width='fit-content'
        align='center'
        justify='flex-start'
      >
        <Image
          src='/illustrations/CTA.svg'
          w='130px'
          h='100%'
          objectFit='cover'
          marginBottom='16px'
        />
        <VStack marginBottom='20px'>
          <Heading size={'xs'}>Thinking of Adoption?</Heading>
          <Text
            fontWeight='medium'
            color='gray.500'
            fontSize={'xs'}
            textAlign={'center'}
            maxW='25ch'
          >
            Find the perfect pet for you and your family now.
          </Text>
        </VStack>
        <Button
          w='fit-content'
          variant='ghost'
          colorScheme='teal'
          fontWeight='bold'
          borderRadius={6}
          size='sm'
          py={4}
          minW='180px'
        >
          Adopt Now
        </Button>
      </VStack>
    </Flex>
  );
};
