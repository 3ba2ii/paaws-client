import { Heading, Text, VStack } from '@chakra-ui/layout';
import React from 'react';

const ModalHeader: React.FC<{ title: string; subtitle: string }> = React.memo(
  ({ title, subtitle }) => {
    return (
      <VStack align='flex-start' mt={4}>
        <Heading size='md'>{title}</Heading>
        <Text
          fontSize='.875rem'
          color={'gray.500'}
          fontWeight={'medium'}
          textAlign={'left'}
        >
          {subtitle}
        </Text>
      </VStack>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';
export default ModalHeader;
