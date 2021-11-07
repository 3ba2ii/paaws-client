import { Box, Heading, Text, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { GoChevronRight } from 'react-icons/go';

export const NotAuthenticatedComponent: React.FC<{
  title: string;
  subtitle?: string;
}> = ({ title, subtitle }): JSX.Element => {
  const router = useRouter();
  return (
    <VStack mt={4} spacing={4}>
      <Box>
        <Heading size='md' textAlign={'center'}>
          {title}
        </Heading>
        <Text textStyle={'p1'}> {subtitle}</Text>
      </Box>
      <Button
        aria-label='Login'
        colorScheme='teal'
        rightIcon={<GoChevronRight />}
        onClick={() => {
          router.push('/login?next=' + router.pathname);
        }}
      >
        Login Now
      </Button>
    </VStack>
  );
};
