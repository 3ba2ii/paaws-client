import {
  Button,
  Center,
  Heading,
  HStack,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import ProfileMenu from 'components/common/overlays/ProfileMenu';
import { Layout } from 'components/Layout';
import Logo from 'components/Logo';
import router, { useRouter } from 'next/router';
import React from 'react';

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
        Let's make your account <br /> attractive 😉
      </Heading>
    </VStack>
  );
};

const CompleteInfoLayout: React.FC<CompleteInfoProps> = ({
  pageTitle,
  children,
}) => {
  const { setColorMode } = useColorMode();
  const { pathname } = useRouter();
  const isPhoneNumberStep = pathname.includes('phone');

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
          <Button
            pos={'absolute'}
            bottom='32px'
            right='65px'
            variant='ghost'
            opacity='.6'
            fontWeight={'medium'}
            onClick={() =>
              router.push(
                isPhoneNumberStep ? '/profile/complete-info/location' : '/'
              )
            }
          >
            Complete Later
          </Button>
        </Center>
      </HStack>
    </Layout>
  );
};
export default CompleteInfoLayout;
