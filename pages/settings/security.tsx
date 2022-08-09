import { Box } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import SettingsPageLayout from 'modules/settings/layout';
import React from 'react';
import withApollo from 'utils/withApollo';

interface SecuritySettingsProps {}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({}) => {
  const { user } = useAuth();
  /* What should be in this components
  
    1. Sign out of all the sessions
    2. Delete Account
  */
  return (
    <SettingsPageLayout user={user}>
      <Box w='100%' h='100%'>
        settings
      </Box>
    </SettingsPageLayout>
  );
};
export default withApollo(SecuritySettings);
