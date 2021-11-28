import { Link, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import React from 'react';

export const SideFooter = () => {
  return (
    <VStack spacing={3}>
      <SimpleGrid w='100%' columns={2} spacing={3}>
        <Link textStyle='p2'>Help</Link>
        <Link textStyle='p2'>About</Link>
        <Link textStyle='p2' whiteSpace='nowrap'>
          Paaws Pro ✨
        </Link>
        <Link textStyle='p2'>Policy</Link>
        <Link textStyle='p2'>Security</Link>
        <Link textStyle='p2'>Help</Link>
        <Link textStyle='p2'>Report a bug</Link>
        <Link textStyle='p2'>Privacy</Link>
      </SimpleGrid>
      <Text textStyle='p2' w='100%'>
        &copy;2021 Paaws Platform.
      </Text>
    </VStack>
  );
};
