import { Button, Divider, Heading, SimpleGrid, VStack,Link } from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import { SideFooter } from 'components/SideFooter';
import { MeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

interface SettingsPageLayoutProps {
  user: MeQuery['me'];
}
const SettingsTabsList: { key: string; label: string; url: string }[] = [
  { key: 'about-you', label: 'About you', url: '/settings' },
  { key: 'security', label: 'Security', url: `/settings/security` },
  { key: 'account', label: 'Account', url: '/settings/account' },
  { key: 'connections', label: 'Connections', url: '/settings/connections' },
  {
    key: 'email-settings',
    label: 'Email Settings',
    url: '/settings/email-settings',
  },
  { key: 'preferences', label: 'Preferences', url: '/settings/preferences' },
  {
    key: 'notifications',
    label: 'Notifications',
    url: '/settings/notifications',
  },
  { key: 'display', label: 'Display', url: '/settings/display' },
  { key: 'danger-area', label: 'Danger Area', url: '/settings/danger-area' },
];

const SettingsPageLayout: React.FC<SettingsPageLayoutProps> = ({
  children,
  user,
}) => {
  const { pathname } = useRouter();
  if (!user) return <Heading>You are not logged in</Heading>;
  return (
    <Layout title='Settings Page - Paaws' includeFooter={false}>
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
            {SettingsTabsList.map(({ key, label, url }) => (
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
                {label}
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
          {children}
        </VStack>
      </SimpleGrid>
    </Layout>
  );
};
export default SettingsPageLayout;
