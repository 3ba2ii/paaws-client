import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import Logo from 'components/Logo';
import UserAvatar from 'components/UserAvatar';
import router from 'next/router';
import React from 'react';

interface CompleteInfoProps {
  pageTitle: string;
}

const CompleteInfoStaticComponent = () => {
  return (
    <VStack
      w='100%'
      h='100%'
      flex='.4'
      align={'flex-start'}
      justify='center'
      px='65px'
      bg='#F2F5F8'
      display={['none', 'flex', 'flex', 'flex']}
    >
      <Heading color='gray.700' size='lg' fontWeight='semibold'>
        Welcome to Paaws 🐶
      </Heading>
      <Text fontSize={'md'} color='gray.500'>
        Help us complete your profile and make it more attractive to users
      </Text>
    </VStack>
  );
};

const CompleteInfoLayout: React.FC<CompleteInfoProps> = ({
  pageTitle,
  children,
}) => {
  return (
    <Layout
      title={pageTitle}
      includeFooter={false}
      includeNavbar={false}
      childrenProps={{ mt: '0' }}
      layoutProps={{ mt: '0', p: '0' }}
    >
      <HStack
        pos='absolute'
        px={'65px'}
        top='65px'
        w='100%'
        justify={'space-between'}
        zIndex={2}
      >
        <Logo imageProps={{ maxW: '90px' }} />
        {/* @ts-ignore */}
        <UserAvatar avatarProps={{ size: 'sm' }} />
      </HStack>
      <HStack position={'absolute'} w='100%' h='100vh'>
        <CompleteInfoStaticComponent />
        <Center pos='relative' w='100%' h='100%' flex='.8'>
          {children}
          <Button
            pos={'absolute'}
            bottom='32px'
            right='65px'
            variant='ghost'
            opacity='.6'
            fontWeight={'medium'}
            onClick={() => {
              router.push('/');
            }}
          >
            Complete Later
          </Button>
        </Center>
      </HStack>
    </Layout>
  );
};
export default CompleteInfoLayout;
