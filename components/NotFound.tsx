import { VStack, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface NotFoundProps {
  title: string;
  subtitle: string;
  backPath?: string;
  backText?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  title,
  subtitle,
  backPath = '/',
  backText = 'Go Home',
}) => {
  return (
    <VStack w='100%' h='100%'>
      <Heading size='xl'>{title}</Heading>
      <Text color='gray.500' maxW={'40ch'} textAlign='center'>
        {subtitle}
      </Text>

      <Button
        rightIcon={<FiChevronRight />}
        onClick={() => router.replace(backPath)}
      >
        {backText}
      </Button>
    </VStack>
  );
};
export default NotFound;
