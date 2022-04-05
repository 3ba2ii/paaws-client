import { Box, HStack, VStack } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { useRouter } from 'next/router';
import React from 'react';

interface UserProfileProps {}

const UserProfilePage: React.FC<UserProfileProps> = () => {
  const router = useRouter();
  const { userId } = router.query;

  if (!userId) {
    return null;
  }

  return (
    <Layout title='Profile Page'>
      <Box bg='red' w='100%' h='100vh' display={'flex'} justifyContent='center'>
        <VStack bg='blue' flex='.7'>
          <HStack w='100%'>
            Sunt ullamco id elit anim deserunt. HEADER HEADER
          </HStack>

          <Box>Tabs</Box>
        </VStack>
      </Box>
    </Layout>
  );
};
export default UserProfilePage;
