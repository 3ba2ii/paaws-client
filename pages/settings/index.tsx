import {
  Button,
  Divider,
  Heading,
  Link,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { Layout } from 'components/common/Layout';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { SideFooter } from 'components/SideFooter';
import { useIsAuth } from 'hooks/useIsAuth';
import AboutYouSettings from 'modules/settings/AboutYou';
import React from 'react';
import withApollo from 'utils/withApollo';

interface SettingsPageProps {}

const SettingsTabsList: { key: string; label: string }[] = [
  { key: 'about-you', label: 'About you' },
  { key: 'security', label: 'Security' },
  { key: 'account', label: 'Account' },
  { key: 'connections', label: 'Connections' },
  { key: 'email-settings', label: 'Email Settings' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'display', label: 'Display' },
  { key: 'danger-area', label: 'Danger Area' },
];
const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  const { user, loading } = useIsAuth();
  if (loading) return <LoadingComponent />;
  if (!user) return <Heading>You are not logged in</Heading>;
  return (
    <Layout title='Settings Page - Paaws' includeFooter={false}>
      <SimpleGrid
        w='100%'
        h='100vh'
        gridTemplateColumns={'265px 4.5fr'}
        gap={10}
      >
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
            {SettingsTabsList.map(({ key, label }) => (
              <Button
                height={'fit-content'}
                variant='unstyled'
                as={Link}
                key={key}
                fontSize='18px'
                color='blackAlpha.600'
                fontWeight={'400'}
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
          <AboutYouSettings user={user} />
        </VStack>
      </SimpleGrid>
    </Layout>
  );
};
export default withApollo(SettingsPage);
