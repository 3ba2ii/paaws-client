import {
  Button,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import SelectAvatarComponent from 'components/avatar/SelectAvatarComponent';
import { useAddUserAvatarMutation } from 'generated/graphql';
import { useRequireAuth } from 'hooks/useRequireAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { BiCloudUpload, BiUpload } from 'react-icons/bi';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import { createFileWithURL } from 'utils/createFilewithURL';
import withApollo from 'utils/withApollo';

const SelectAvatar: React.FC = () => {
  const { user, loading } = useRequireAuth();
  const [userAvatar, setUserAvatar] = React.useState<File | null>(null);
  const [uploadUserAvatar, { loading: uploadLoading }] =
    useAddUserAvatarMutation();

  const toaster = useToast();
  const router = useRouter();

  const uploadAvatar = async () => {
    if (!userAvatar) return;

    const { data } = await uploadUserAvatar({
      variables: {
        avatar: userAvatar,
      },
      update: (cache, { data: result, errors }) => {
        try {
          if (!result?.addUserAvatar || errors) return;
          const url = URL.createObjectURL(userAvatar);
          console.log(
            `🚀 ~ file: avatar.tsx ~ line 30 ~ uploadAvatar ~ url`,
            url
          );
          if (!url || typeof url !== 'string') return;

          //@ts-ignore
          updateMeQueryCache(cache, { ...user, avatar: { url, id: 1243 } });
        } catch (e) {
          console.log(`🚀 ~ file: avatar.tsx ~ line 40 ~ uploadAvatar ~ e`, e);
        }
      },
    });

    if (data?.addUserAvatar) {
      toaster({
        status: 'success',
        title: "You're beautiful 😍",
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true,
      });
      return router.push('/profile/complete-info');
    }

    return toaster({
      status: 'error',
      title: 'An error occurred while updating your info',
      description:
        'We could not update your info at this time. Please try again later.',
      position: 'bottom-right',
      variant: 'subtle',
      isClosable: true,
    });
  };

  React.useEffect(() => {
    (async () => {
      if (!loading && user && user.avatar?.url) {
        const file = await createFileWithURL(user.avatar.url);
        setUserAvatar(file);
      }
    })();
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
              isLoading={uploadLoading}
              px={4}
              fontSize='sm'
              onClick={uploadAvatar}
              leftIcon={<BiCloudUpload size='20px' />}
              loadingText='Uploading'
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
