import { Heading, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useMySettingsQuery } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import AboutYouSettings from 'modules/settings/AboutYou';
import SettingsPageLayout from 'modules/settings/layout';
import React from 'react';
import withApollo from 'utils/withApollo';
import EmailSettings from './email-settings';

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  const { user, loading } = useIsAuth();
  const { data, loading: loadingSettings } = useMySettingsQuery();
  if (loading || loadingSettings) return <LoadingComponent />;
  if (!user) return <Heading>You are not logged in</Heading>;

  const settings = data?.mySettings;

  if (!settings) return <Heading>404 Error occurred</Heading>;
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
