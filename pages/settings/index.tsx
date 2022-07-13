import { Heading } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useIsAuth } from 'hooks/useIsAuth';
import AboutYouSettings from 'modules/settings/AboutYou';
import SettingsPageLayout from 'modules/settings/layout';
import React from 'react';
import withApollo from 'utils/withApollo';

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  const { user, loading } = useIsAuth();
  if (loading) return <LoadingComponent />;
  if (!user) return <Heading>You are not logged in</Heading>;
  return (
    <SettingsPageLayout user={user}>
      <AboutYouSettings user={user} />
    </SettingsPageLayout>
  );
};
export default withApollo(SettingsPage);
