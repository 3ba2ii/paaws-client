import {
  Button,
  Center,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import Logo from 'components/common/Logo';
import ProfileMenu from 'components/overlays/ProfileMenu';
import { useRequireAuth } from 'hooks/useRequireAuth';
import router, { useRouter } from 'next/router';
import React from 'react';
import { getUrlBaseOnUserInfo } from 'utils/helpers/getUrlBasedOnUserInfo';
import { isCompleteProfile } from 'utils/helpers/isCompletedProfile';

interface CompleteInfoProps {
  pageTitle: string;
}

const CompleteInfoStaticComponent = () => {
  const bgColor = useColorModeValue('rgb(241, 243, 247)', 'gray.900');
  return (
    <VStack
      w='100%'
      h='100%'
      flex='.3'
      align={'flex-start'}
      justify='center'
      px='3%'
      bg={bgColor}
      display={['none', 'none', 'flex', 'flex']}
    >
      <Heading color='inherit' size='xl' fontWeight='medium'>
        Let's make your account more attractive
      </Heading>
    </VStack>
  );
};

const CompleteInfoLayout: React.FC<CompleteInfoProps> = ({
  pageTitle,
  children,
}) => {
  const { user } = useRequireAuth();
  const { pathname } = useRouter();

  const isCompleteInfoPage = pathname === '/profile/complete-info';

  const isCompleted = isCompleteProfile(user);

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
        w='100%'
        px={['3%']}
        top={['48px', '48px', '65px']}
        justify={'space-between'}
        zIndex={2}
      >
        <Logo imageProps={{ maxW: '90px' }} />
        <ProfileMenu />
      </HStack>
      <HStack position={'absolute'} w='100%' h='100vh'>
        <CompleteInfoStaticComponent />
        <Center
          pos='relative'
          w='100%'
          h='100%'
          flex={['auto', '.9', '.8']}
          px={['3%']}
        >
          {children}
          <HStack pos={'absolute'} bottom='48px' right={['3%']}>
            {!isCompleted ? (
              <Button
                variant='ghost'
                opacity='.6'
                onClick={() =>
                  router.push(
                    getUrlBaseOnUserInfo(user, '/profile/complete-info')
                  )
                }
              >
                Complete later
              </Button>
            ) : (
              isCompleteInfoPage && (
                <Button
                  colorScheme='teal'
                  fontSize='sm'
                  onClick={() => router.push('/')}
                >
                  Go Home
                </Button>
              )
            )}
          </HStack>
        </Center>
      </HStack>
    </Layout>
  );
};
export default CompleteInfoLayout;
