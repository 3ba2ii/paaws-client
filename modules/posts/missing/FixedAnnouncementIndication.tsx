import { HStack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React from 'react';

export const FixedAnnouncementIndication: React.FC = () => {
  return (
    <HStack
      w='100%'
      h='42px'
      bg='cyan.700'
      bgGradient='linear(to-r, cyan.700, purple.500)'
      position={'fixed'}
      top='5.2rem'
      px={'150px'}
      color='white'
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Text fontWeight={'medium'} fontSize={'sm'}>
        The location results for nearby posts are shown based on your saved
        location{' '}
        <Text as='span' fontWeight={'semibold'}>
          Tanta, Egypt
        </Text>
      </Text>
      <Button size='xs' colorScheme={'gray'}>
        Change Location
      </Button>
    </HStack>
  );
};
