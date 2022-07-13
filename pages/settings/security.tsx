import { Box, Heading } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useIsAuth } from 'hooks/useIsAuth';
import SettingsPageLayout from 'modules/settings/layout';
import React from 'react';
import withApollo from 'utils/withApollo';

interface SecuritySettingsProps {}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({}) => {
  const { user, loading } = useIsAuth();
  if (loading) return <LoadingComponent />;
  if (!user) return <Heading>You are not logged in</Heading>;
  return (
    <SettingsPageLayout user={user}>
      <Box w='100%' h='100%'>
        settings
      </Box>
    </SettingsPageLayout>
  );
};
export default withApollo(SecuritySettings);
