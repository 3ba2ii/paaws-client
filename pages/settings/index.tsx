import { Heading, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useMySettingsQuery } from 'generated/graphql';
import { useAuth } from 'hooks/useAuth';
import { useRequireAuth } from 'hooks/useRequireAuth';
import AboutYouSettings from 'modules/settings/AboutYou';
import SettingsPageLayout from 'modules/settings/layout';
import React from 'react';
import withApollo from 'utils/withApollo';
import EmailSettings from './email-settings';

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  useRequireAuth();
  const { user, isLoadingUserInfo: loading } = useAuth();
  const { data, loading: loadingSettings } = useMySettingsQuery();
  console.log(`🚀 ~ file: index.tsx ~ line 18 ~ data`, data);

  if (loading || loadingSettings) return <LoadingComponent />;

  const settings = data?.mySettings;

  if (!settings && !loadingSettings)
    return <Heading>404 Error occurred</Heading>;
  return (
    <SettingsPageLayout user={user}>
      <VStack w='100%' h='100%' maxW='800px' gap={5}>
        <AboutYouSettings user={user} />
        <EmailSettings {...{ user, settings }} />
      </VStack>
    </SettingsPageLayout>
  );
};
export default withApollo(SettingsPage);
