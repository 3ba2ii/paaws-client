import {
  Button,
  Divider,
  Heading,
  SimpleGrid,
  VStack,
  Link,
} from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { SideFooter } from 'components/SideFooter';
import { MeQuery } from 'generated/graphql';
import useIsMounted from 'hooks/useIsMounted';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SettingsTabsList } from './_types';

interface SettingsPageLayoutProps {
  user: MeQuery['me'];
}

const SettingsPageLayout: React.FC<SettingsPageLayoutProps> = ({
  children,
}) => {
  const isMounted = useIsMounted();
  const { pathname } = useRouter();

  useEffect(() => {
    isMounted();
  }, [isMounted]);

  return (
    <Layout
      title='Settings Page - Paaws'
      includeFooter={false}
      childrenProps={{ justifyContent: 'flex-start' }}
    >
      {isMounted() ? (
        <SimpleGrid w='100%' gridTemplateColumns={'265px 4.5fr'} gap={14}>
          <VStack
            w='100%'
            h='100%'
            alignItems='flex-start'
            spacing={8}
            pos='fixed'
            maxWidth='265px'
          >
            <Heading fontSize='22px'>Settings</Heading>
            <VStack alignItems='flex-start' spacing={4}>
              {SettingsTabsList.map(({ key, title, url }) => (
                <Button
                  height={'fit-content'}
                  variant='unstyled'
                  as={Link}
                  key={key}
                  href={url}
                  fontSize='18px'
                  color={pathname === url ? 'blackAlpha.800' : 'blackAlpha.600'}
                  fontWeight={pathname === url ? 'semibold' : '400'}
                  _dark={{ color: 'whiteAlpha.800' }}
                >
                  {title}
                </Button>
              ))}
            </VStack>
            <Divider />
            <SideFooter />
          </VStack>
          <VStack
            alignItems='flex-start'
            w='100%'
            h='100%'
            spacing={5}
            gridColumn={'2/3'}
          >
            {children}
          </VStack>
        </SimpleGrid>
      ) : (
        <LoadingComponent />
      )}
    </Layout>
  );
};
export default SettingsPageLayout;
