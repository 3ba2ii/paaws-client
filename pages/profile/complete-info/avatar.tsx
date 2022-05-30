import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import SelectAvatarComponent from 'components/SelectAvatarComponent';
import { useAddUserAvatarMutation } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import { useRouter } from 'next/router';
import React from 'react';
import withApollo from 'utils/withApollo';

const SelectAvatar: React.FC = ({}) => {
  const { user, loading } = useIsAuth();
  console.log(`🚀 ~ file: avatar.tsx ~ line 13 ~ loading`, loading);
  const [userAvatar, setUserAvatar] = React.useState<File | null>(null);
  console.log(`🚀 ~ file: avatar.tsx ~ line 14 ~ userAvatar`, userAvatar);
  const [uploadUserAvatar] = useAddUserAvatarMutation();

  const router = useRouter();

  async function createFile(url: string): Promise<File | null> {
    try {
      let response = await fetch(url);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg',
      };
      return new File([data], 'initial.jpg', metadata);
    } catch (e) {
      return null;
    }
  }

  const uploadAvatar = async () => {
    if (!userAvatar) return;

    const { data } = await uploadUserAvatar({
      variables: {
        avatar: userAvatar,
      },
    });

    if (!data?.addUserAvatar) return;

    router.push('/profile/complete-info');
  };

  React.useEffect(() => {
    async function setInitialFile() {
      if (!loading && user && user.avatar?.url) {
        const file = await createFile(user.avatar.url);
        setUserAvatar(file);
      }
    }

    setInitialFile();
  }, [loading]);

  if (loading) return <LoadingComponent />;
  if (!user) return null;

  return (
    <CompleteInfoLayout pageTitle='Set your profile picture'>
      <VStack w='100%' maxW='600px'>
        <VStack align='flex-start' w='100%'>
          <Heading size='md'>Set your profile picture</Heading>
          <Text color='gray.500' fontSize='md' maxW='45ch'>
            We would 💖 to see your face. Your photo will make it easier for
            your friends to recognize you
          </Text>
        </VStack>
        <VStack w='100%' spacing={10} align='flex-start' py='4'>
          <SelectAvatarComponent
            user={user}
            onChange={(newURL) => {
              newURL && setUserAvatar(newURL);
            }}
            avatarURL={userAvatar ? URL.createObjectURL(userAvatar) : ''}
          />
          <HStack w='100%' justify={'flex-end'}>
            <Button variant='ghost' fontSize='sm' onClick={() => router.back()}>
              Back
            </Button>
            <Button
              colorScheme={'teal'}
              isLoading={loading}
              px={4}
              fontSize='sm'
              onClick={uploadAvatar}
            >
              Upload
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </CompleteInfoLayout>
  );
};
export default withApollo(SelectAvatar);
