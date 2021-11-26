import { Link, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import React from 'react';

export const SideFooter: React.FC = ({ children }) => {
  return (
    <VStack align='flex-start' w='100%' spacing={5}>
      {children}
      <VStack spacing={3} color='white' textStyle='p2'>
        <SimpleGrid w='100%' columns={2} spacing={3}>
          <Link>Help</Link>
          <Link>About</Link>
          <Link whiteSpace='nowrap'>Paaws Pro ✨</Link>
          <Link>Policy</Link>
          <Link>Security</Link>
          <Link>Help</Link>
          <Link>Report a bug</Link>
          <Link>Privacy</Link>
        </SimpleGrid>
        <Text textStyle='p2' w='100%'>
          &copy;2021 Paaws Platform.
        </Text>
      </VStack>
    </VStack>
  );
};
