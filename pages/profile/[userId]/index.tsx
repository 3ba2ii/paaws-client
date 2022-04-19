import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import AddUserOwnedPetForm from 'modules/pet/AddUserPetForm';
import { UserProfileHeader } from 'modules/profile/user/UserProfileHeader';
import UserProfileTabs from 'modules/profile/user/UserProfileTabs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import withApollo from 'utils/withApollo';

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  if (!userId) {
    return null;
  }

  return (
    <Layout
      title='Profile Page'
      childrenProps={{ h: '100%', justifyContent: 'flex-start' }}
    >
      <Box w='100%' h='100%' display={'flex'} justifyContent='center'>
        <VStack w='100%' h='100%' flex={['auto', '.8', '.6']} spacing={'30px'}>
          <UserProfileHeader userId={parseInt(userId as string)} />
          <Box w='100%' h='100%'>
            <UserProfileTabs userId={parseInt(userId as string)} />
          </Box>
        </VStack>
        <Modal isOpen={true} onClose={() => {}} size='6xl' closeOnEsc>
          <ModalOverlay />
          <ModalContent css={{ aspectRatio: '16/12' }}>
            <AddUserOwnedPetForm />
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};
export default withApollo(UserProfilePage);
