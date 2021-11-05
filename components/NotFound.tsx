import { VStack, Heading, Text } from '@chakra-ui/layout';
import React from 'react';

interface NotFoundProps {
  title: string;
  subtitle: string;
}

const NotFound: React.FC<NotFoundProps> = ({ title, subtitle }) => {
  return (
    <VStack mt={'15vh'}>
      <Heading size='xl'>{title}</Heading>
      <Text color='gray.500' maxW={'50ch'} textAlign='center'>
        {subtitle}
      </Text>
    </VStack>
  );
};
export default NotFound;
