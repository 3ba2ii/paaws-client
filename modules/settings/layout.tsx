import {
  Button,
  Divider,
  Heading,
  SimpleGrid,
  VStack,
  Link,
} from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import { SideFooter } from 'components/SideFooter';
import { MeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { SettingsTabsList } from './_types';

interface SettingsPageLayoutProps {
  user: MeQuery['me'];
}

const SettingsPageLayout: React.FC<SettingsPageLayoutProps> = ({
  children,
  user,
}) => {
  const { pathname } = useRouter();
  if (!user) return <Heading>You are not logged in</Heading>;

  const getCurrentTitleFromURL = (): string => {
    const tab = SettingsTabsList.find((tab) => {
      return tab.url === pathname;
    });

    return tab?.title || 'Settings';
  };
  return (
    <Layout
      title='Settings Page - Paaws'
      includeFooter={false}
      childrenProps={{ justifyContent: 'flex-start' }}
    >
      <SimpleGrid w='100%' gridTemplateColumns={'265px 4.5fr'} gap={14}>
        <VStack
          w='100%'
          h='100%'
          align='flex-start'
          spacing={8}
          pos='fixed'
          maxWidth='265px'
        >
          <Heading fontSize='22px'>Settings</Heading>
          <VStack align='flex-start' spacing={4}>
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
          align='flex-start'
          w='100%'
          h='100%'
          spacing={5}
          gridColumn={'2/3'}
        >
          <VStack align='flex-start' w='100%' spacing={5}>
            <Heading fontSize='24px' fontWeight={'bold'}>
              {getCurrentTitleFromURL()}
            </Heading>
            <Divider maxW='800px' />
            {children}
          </VStack>
        </VStack>
      </SimpleGrid>
    </Layout>
  );
};
export default SettingsPageLayout;
