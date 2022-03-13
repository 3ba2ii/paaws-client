import { Avatar, AvatarProps } from '@chakra-ui/react';

export const UserAvatar: React.FC<{
  avatarProps?: AvatarProps;
  name: string;
  avatarURL?: string;
}> = ({ avatarProps, avatarURL, name }) => {
  return <Avatar name={name} src={avatarURL} {...avatarProps} />;
};

export default UserAvatar;
