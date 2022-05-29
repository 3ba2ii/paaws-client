import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import ProfileMenu from 'components/overlays/ProfileMenu';
import { Layout } from 'components/common/Layout';
import Logo from 'components/common/Logo';
import router, { useRouter } from 'next/router';
import React from 'react';
import { getUrlBaseOnUserInfo } from 'utils/getUrlBasedOnUserInfo';
import { useIsAuth } from 'hooks/useIsAuth';

interface CompleteInfoProps {
  pageTitle: string;
}

const CompleteInfoStaticComponent = () => {
  const bgColor = useColorModeValue('rgb(241, 243, 247)', 'gray.900');
  return (
    <VStack
      w='100%'
      h='100%'
      flex='.4'
      align={'flex-start'}
      justify='center'
      px='65px'
      bg={bgColor}
      display={['none', 'flex', 'flex', 'flex']}
    >
      <Heading color='inherit' size='xl' fontWeight='medium'>
        Let's make your account <br />
        more attractive
      </Heading>
    </VStack>
  );
};

const CompleteInfoLayout: React.FC<CompleteInfoProps> = ({
  pageTitle,
  children,
}) => {
  const { user } = useIsAuth();
  const { setColorMode } = useColorMode();
  const { pathname } = useRouter();

  const isCompletedProfile = !!(
    user &&
    user.avatar?.url &&
    user.bio &&
    user.phone &&
    user.phoneVerified &&
    user.lat &&
    user.lng
  );
  React.useEffect(() => {
    setColorMode('light');
  }, []);

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
        <ProfileMenu />
      </HStack>
      <HStack position={'absolute'} w='100%' h='100vh'>
        <CompleteInfoStaticComponent />
        <Center pos='relative' w='100%' h='100%' flex='.8'>
          {children}
          <HStack pos={'absolute'} bottom='32px' right='65px'>
            {!isCompletedProfile ? (
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
              <Button
                colorScheme='teal'
                fontSize='sm'
                onClick={() => router.push('/')}
              >
                Finish Profile
              </Button>
            )}
          </HStack>
        </Center>
      </HStack>
    </Layout>
  );
};
export default CompleteInfoLayout;
