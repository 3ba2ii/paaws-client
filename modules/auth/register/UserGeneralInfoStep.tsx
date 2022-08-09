import { Avatar } from '@chakra-ui/avatar';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { MeQuery } from 'generated/graphql';
import React, { useMemo, useState } from 'react';
import styles from 'styles/register.module.css';

interface Step1Props {
  handleChange: (e: any, field: string) => void;
  userInfo: MeQuery | undefined;
  values: any;
}
export const UserGeneralInfoStep: React.FC<Step1Props> = ({
  handleChange,
  userInfo,
  values,
}) => {
  const [uploadedAvatar, setUploadedAvatar] = useState<
    File | Blob | MediaSource | null
  >(null);
  const avatarRef = React.useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  };
  const handleSelectFile = (event: any) => {
    const file = event.target.files[0];
    setUploadedAvatar(file);
    handleChange(file, 'avatar');
  };
  const MyAvatarInputField = () => {
    return (
      <Input
        hidden
        type='file'
        ref={avatarRef}
        onChange={handleSelectFile}
        name='avatar'
        accept='image/*'
      />
    );
  };

  const AvatarImage = useMemo(
    () => (
      <Avatar
        rounded='xl'
        w={'120px'}
        h={'120px'}
        shadow='base'
        zIndex={1}
        className={styles['avatar-image']}
        onClick={openFileDialog}
        name={userInfo?.me?.full_name}
        src={
          uploadedAvatar
            ? URL.createObjectURL(uploadedAvatar)
            : userInfo?.me?.avatar?.url || ''
        }
      />
    ),
    [uploadedAvatar, userInfo?.me?.avatar?.url, userInfo?.me?.full_name]
  );
  return (
    <section className={styles['step-container']}>
      <Flex alignItems='center' justifyContent='center' mb={4}>
        {/* Avatar Input */}
        <MyAvatarInputField />
        {AvatarImage}
        <div>
          <Heading fontSize='1.3rem' fontWeight='bold'>
            {userInfo?.me?.full_name}
          </Heading>
          <Text color='gray.500' fontSize='.875rem'>
            {userInfo?.me?.email}
          </Text>
          <Text color='gray.500' fontSize='.875rem'>
            {userInfo?.me?.phone}
          </Text>
        </div>
      </Flex>
      <FormControl className={styles['complete-info-form-container']}>
        <FormLabel htmlFor='bio'>Bio</FormLabel>
        <Textarea
          borderWidth='1.5px'
          id='bio'
          value={values.bio}
          placeholder={
            'Creator. Passionate tv nerd. Problem solver. Proud alcohol evangelist. Lifelong web junkie.'
          }
          onChange={(e) => {
            handleChange(e.target.value, 'bio');
          }}
        />
      </FormControl>
    </section>
  );
};
