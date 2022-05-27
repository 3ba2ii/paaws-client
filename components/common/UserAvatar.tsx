import { Avatar, AvatarProps } from '@chakra-ui/react';

export const UserAvatar: React.FC<{
  avatarProps?: AvatarProps;
  name?: string | null;
  avatarURL?: string | null;
}> = ({ avatarProps, avatarURL, name }) => {
  if (!name) return null;

  return <Avatar name={name} src={avatarURL || ''} {...avatarProps} />;
};

export default UserAvatar;
