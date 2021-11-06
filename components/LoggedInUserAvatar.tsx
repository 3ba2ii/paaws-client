import { Avatar, AvatarProps } from '@chakra-ui/react';
import { useMeQuery } from 'generated/graphql';
import React from 'react';

const LoggedInUserAvatar: React.FC<AvatarProps> = ({ ...props }) => {
  let src;
  let name;
  const { data } = useMeQuery({ fetchPolicy: 'cache-only' });
  if (data && data.me) {
    const { displayName, avatar } = data.me;
    src = avatar?.url;
    name = displayName;
  }

  return (
    <Avatar
      {...props}
      src={props.src || src || undefined}
      name={props.name || name || undefined}
    />
  );
};
export default LoggedInUserAvatar;
