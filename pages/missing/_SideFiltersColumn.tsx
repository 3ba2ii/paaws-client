import { Box, Flex, VStack, Text, Heading } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { MissingPostTypes } from 'generated/graphql';
import React from 'react';
import { MissingPageTaps } from './_MissingPageTaps';

export const SideFiltersColumn: React.FC<{
  handleSelectFilter: (type: MissingPostTypes) => void;
}> = ({ handleSelectFilter }) => {
  return (
    <Flex
      w='100%'
      flexDirection={['row', 'column']}
      h={['fit-content', '90vh']}
      maxH='100%'
      align='flex-start'
      justify='space-between'
      maxW={['100%', '250px']}
      position='relative'
    >
      <MissingPageTaps handleSelectFilter={handleSelectFilter} />
      <VStack
        display={['none', 'none', 'flex']}
        flexDir={'column'}
        width='100%'
        align='center'
        justify='center'
        position={'absolute'}
        bottom={'8vh'}
      >
        <Image
          src='/illustrations/CTA.svg'
          w='100%'
          h='100%'
          objectFit='cover'
          maxW='150px'
          marginBottom='16px'
        />
        <VStack marginBottom='20px'>
          <Heading size={'sm'}>Thinking of Adoption?</Heading>
          <Text
            fontWeight='medium'
            color='gray.500'
            fontSize={'sm'}
            textAlign={'center'}
            maxW='20ch'
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
