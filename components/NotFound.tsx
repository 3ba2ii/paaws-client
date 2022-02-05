import { VStack, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface NotFoundProps {
  title: string;
  subtitle: string;
  containerProps?: React.ComponentProps<typeof VStack>;
  includeBackButton?: boolean;
  backPath?: string;
  backText?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  title,
  subtitle,
  containerProps,
  includeBackButton = true,
  backPath = '/',
  backText = 'Go Home',
}) => {
  return (
    <VStack
      w='100%'
      h='100%'
      justify={'center'}
      align='center'
      {...containerProps}
    >
      <Heading size='xl'>{title}</Heading>
      <Text color='gray.500' maxW={'50ch'} textAlign='center'>
        {subtitle}
      </Text>

      {includeBackButton && (
        <Button
          rightIcon={<FiChevronRight />}
          onClick={() => router.replace(backPath)}
        >
          {backText}
        </Button>
      )}
    </VStack>
  );
};
export default NotFound;
