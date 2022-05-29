import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import SelectAvatarComponent from 'components/SelectAvatarComponent';
import { useIsAuth } from 'hooks/useIsAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import { useRouter } from 'next/router';
import React from 'react';
import withApollo from 'utils/withApollo';

const SelectAvatar: React.FC = ({}) => {
  const { user, loading } = useIsAuth();
  const [userAvatar, setUserAvatar] = React.useState<File | null>(null);

  const router = useRouter();

  const uploadAvatar = () => {};

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
            onChange={(newURL) => setUserAvatar(newURL)}
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
