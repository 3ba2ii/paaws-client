import { Avatar, AvatarProps } from '@chakra-ui/react';
import { useMeQuery } from 'generated/graphql';
import withApollo from 'utils/withApollo';

export const UserAvatar: React.FC<{ avatarProps?: AvatarProps }> = ({
  avatarProps,
}) => {
  const { data } = useMeQuery({ fetchPolicy: 'cache-first' });
  if (!data || !data.me) return null;
  const { avatar, displayName } = data.me;
  return <Avatar name={displayName} src={avatar?.url || ''} {...avatarProps} />;
};

export default withApollo(UserAvatar);
