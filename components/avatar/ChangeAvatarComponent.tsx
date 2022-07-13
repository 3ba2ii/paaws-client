import { Button, HStack, VStack } from '@chakra-ui/react';
import { FastField, Field } from 'formik';
import {
  MeQuery,
  useRemoveUserAvatarMutation,
  useUploadAvatarMutation,
} from 'generated/graphql';
import React, { useCallback, useMemo } from 'react';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import SelectAvatarComponent from './SelectAvatarComponent';

interface ChangeAvatarComponentsProps {
  user: MeQuery['me'];
  currentUserAvatarURL?: string | null;
  newAvatarFile: File | null;
  onChange: (file: File | null) => void;
  uploadSuccessCB?: VoidFunction;
  uploadFailedCB?: VoidFunction;
  removeSuccessCB?: VoidFunction;
  removeFailedCB?: VoidFunction;
}

const ChangeAvatarComponents: React.FC<ChangeAvatarComponentsProps> = ({
  user,
  currentUserAvatarURL,
  newAvatarFile,
  onChange,
  uploadSuccessCB,
  uploadFailedCB,
  removeSuccessCB,
  removeFailedCB,
}) => {
  const [updateUserAvatar, { loading: uploadAvatarLoading }] =
    useUploadAvatarMutation();
  const [removeUserAvatar, { loading: removeAvatarLoading }] =
    useRemoveUserAvatarMutation();

  const onUploadUserAvatar = async () => {
    if (!newAvatarFile || !user) return;

    await updateUserAvatar({
      variables: { uploadAvatarImage: newAvatarFile },
      update: (cache, { data: result }) => {
        if (
          result &&
          result.uploadAvatar.url &&
          !result?.uploadAvatar.errors?.length
        ) {
          /* success case */
          updateMeQueryCache(cache, {
            ...user,
            avatar: { url: result.uploadAvatar.url, id: Math.random() * 110 },
          });
          return uploadSuccessCB && uploadSuccessCB();
        }
        return uploadFailedCB && uploadFailedCB();
      },
    });
  };

  const onRemoveAvatar = async () => {
    if (!user) return null;

    await removeUserAvatar({
      update: (cache, { data }) => {
        if (data?.removeAvatar.success) {
          updateMeQueryCache(cache, { ...user, avatar: null });
          return removeSuccessCB && removeSuccessCB();
        }
        return removeFailedCB && removeFailedCB();
      },
    });
  };

  const handleChange = useCallback(
    (file: File | null) => {
      onChange(file);
    },
    [onChange]
  );

  const memoizedInputField = useMemo(() => {
    return (
      <Field
        as={() => (
          <SelectAvatarComponent
            user={user}
            avatarURL={
              newAvatarFile
                ? URL.createObjectURL(newAvatarFile)
                : currentUserAvatarURL
            }
            onChange={handleChange}
            avatarProps={{ size: '2xl', borderRadius: 0 }}
          />
        )}
        variant='flushed'
        id='avatar'
        name='Avatar'
        opacity='.8'
      />
    );
  }, [newAvatarFile, currentUserAvatarURL]);

  return (
    <HStack align='center' spacing={5}>
      <SelectAvatarComponent
        user={user}
        avatarURL={
          newAvatarFile
            ? URL.createObjectURL(newAvatarFile)
            : currentUserAvatarURL
        }
        onChange={handleChange}
        avatarProps={{ size: '2xl', borderRadius: 0 }}
      />
      <VStack w='200px' py={4}>
        <Button
          variant='outline'
          w='100%'
          size='sm'
          disabled={!!!newAvatarFile || uploadAvatarLoading}
          isLoading={uploadAvatarLoading}
          onClick={onUploadUserAvatar}
        >
          Upload Photo
        </Button>
        <Button
          variant='link'
          size='sm'
          fontWeight={'medium'}
          colorScheme='red'
          onClick={onRemoveAvatar}
          isLoading={removeAvatarLoading}
          isDisabled={!!!newAvatarFile && !!!currentUserAvatarURL}
        >
          Remove Photo
        </Button>
      </VStack>
    </HStack>
  );
};
export default React.memo(ChangeAvatarComponents, (nextProps, currentProps) => {
  return (
    nextProps.newAvatarFile === currentProps.newAvatarFile &&
    nextProps.currentUserAvatarURL === currentProps.currentUserAvatarURL
  );
});
