import { Box, Divider, VStack } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import UserProfileTabs from 'modules/profile/user/UserProfileTabs';
import { useRouter } from 'next/router';
import React from 'react';
import withApollo from 'utils/withApollo';
import { UserProfileHeader } from '../../modules/profile/user/UserProfileHeader';

interface UserProfileProps {}

const UserProfilePage: React.FC<UserProfileProps> = () => {
  const router = useRouter();
  const { userId } = router.query;

  if (!userId) {
    return null;
  }

  return (
    <Layout title='Profile Page'>
      <Box w='100%' h='100vh' display={'flex'} justifyContent='center'>
        <VStack flex={['auto', '.8', '.6']} spacing={'30px'}>
          <UserProfileHeader userId={parseInt(userId as string)} />
          <Box w='100%'>
            <UserProfileTabs userId={parseInt(userId as string)} />
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};
export default withApollo(UserProfilePage);
