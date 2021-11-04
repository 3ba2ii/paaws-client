import { Box, Flex } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { MissingPostTypes } from 'generated/graphql';
import React from 'react';
import { MissingPageTaps } from './_MissingPageTaps';

export const SideFiltersColumn: React.FC<{
  handleSelectFilter: (type: MissingPostTypes) => void;
}> = ({ handleSelectFilter }) => {
  return (
    <Flex
      flexDirection={['row', 'column']}
      w='100%'
      h={['fit-content', '90vh']}
      maxH='100%'
      align='flex-start'
      justify='space-between'
      maxW={['100%', '250px']}
      position='relative'
      paddingInlineEnd='2rem'
    >
      <MissingPageTaps handleSelectFilter={handleSelectFilter} />
      <Box
        display={['none', 'none', 'block']}
        width='200px'
        position='absolute'
        placeSelf='left'
        bottom='8vh'
      >
        <Image
          src='/illustrations/CTA.svg'
          w='100%'
          h='100%'
          objectFit='cover'
        />
        <Button
          position='absolute'
          bottom='8%'
          left='50%'
          transform='translateX(-50%)'
          variant='solid'
          colorScheme='red'
          bg='red.400'
          w='80%'
          color='white'
          fontWeight='bold'
          borderRadius={6}
          size='sm'
        >
          Discover More
        </Button>
      </Box>
    </Flex>
  );
};
