import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import UserAvatar from 'components/common/UserAvatar';
import { useUserProfilePageQuery } from 'generated/graphql';
import { useRequireAuth } from 'hooks/useRequireAuth';
import AddUserOwnedPetForm from 'modules/pet/AddUserPetForm';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UserProfileStats from './UserProfileStats';

export const UserProfileHeader: React.FC<{ userId: number }> = ({ userId }) => {
  const { user: loggedInUser, loading: loggedInUserLoading } = useRequireAuth();
  const { data, loading } = useUserProfilePageQuery({
    variables: { userId },
  });
  const [modals, setModal] = useState({ addPet: false });
  const router = useRouter();

  useEffect(() => {
    if (data?.user) {
      document.title = `${data.user.displayName}'s Profile`;
    }
  }, [data, loading]);

  if (loading || loggedInUserLoading) return <LoadingComponent />;

  if ((!loading && !data) || !data?.user || !loggedInUser) return null;

  const { displayName, full_name, bio, avatar } = data?.user;

  const isProfileOwner = () => userId === loggedInUser.id;

  return (
    <Flex
      w='100%'
      flexDir={['column', 'column', 'column', 'row']}
      align={['flex-start', 'center', 'center', 'center']}
      justify={['flex-start', 'center', 'center', 'center']}
      css={{ gap: '16px' }}
    >
      <Box h='100%'>
        <UserAvatar
          name={displayName}
          avatarURL={avatar?.url}
          avatarProps={{ size: '2xl' }}
        />
      </Box>
      <VStack h='100%' w='100%' align='flex-start' justify='flex-start'>
        <HStack w='100%' align='center' justify={'space-between'}>
          <Heading size='lg'>{full_name}</Heading>
          {isProfileOwner() && (
            <HStack>
              <Button
                variant='outline'
                size='sm'
                onClick={() => router.push('/settings/profile')}
              >
                Edit Profile
              </Button>
              <Button
                colorScheme='teal'
                size='sm'
                onClick={() => setModal({ addPet: true })}
              >
                Add New Pet
              </Button>
            </HStack>
          )}
        </HStack>
        <Text maxW={'60ch'} fontWeight='medium' color='gray.500'>
          {bio}
        </Text>

        {/* STATS */}
        <UserProfileStats user={data.user} />

        {/* Tags */}
        <HStack py={2}>
          <Tag>#cat-person</Tag>
          <Tag>#dog-person</Tag>
          <Tag>#pet-lover</Tag>
        </HStack>
      </VStack>
      <Modal
        isOpen={modals.addPet}
        onClose={() => {
          setModal({ addPet: false });
        }}
        size='6xl'
        closeOnEsc
      >
        <ModalOverlay />
        <ModalContent css={{ aspectRatio: '16/12' }}>
          <AddUserOwnedPetForm
            onCloseForm={() => setModal({ addPet: false })}
          />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Flex>
  );
};
