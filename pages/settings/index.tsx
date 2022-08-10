import { Heading, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import SomethingWentWrong from 'components/errors/SomethingWentWrong';
import { useMySettingsQuery } from 'generated/graphql';
import { useAuth } from 'hooks/useAuth';
import { useRequireAuth } from 'hooks/useRequireAuth';
import AboutYouSettings from 'modules/settings/AboutYou';
import AccountSettings from 'modules/settings/AccountSettings';
import SettingsPageLayout from 'modules/settings/layout';
import React from 'react';
import withApollo from 'utils/withApollo';
import EmailSettings from '../../modules/settings/EmailSettings';

const SettingsPage: React.FC = () => {
  useRequireAuth();
  const { user } = useAuth();

  const { data, loading } = useMySettingsQuery();

  const settings = data?.mySettings;

  return (
    <SettingsPageLayout user={user}>
      {loading ? (
        <LoadingComponent />
      ) : settings && user ? (
        <VStack w='100%' h='100%' maxW='800px' gap={5}>
          <AboutYouSettings user={user} />
          <EmailSettings {...{ user, settings }} />
          <AccountSettings {...{ user, settings }} />
        </VStack>
      ) : (
        <SomethingWentWrong />
      )}
    </SettingsPageLayout>
  );
};
export default withApollo(SettingsPage);
