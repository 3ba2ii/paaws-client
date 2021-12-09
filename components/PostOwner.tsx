import { HStack, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import React from 'react';

export const PostOwner: React.FC<{
  displayName: string;
  avatarUrl?: string | null;
  id: number;
}> = ({ displayName, id, avatarUrl }) => {
  return (
    <HStack>
      <Avatar
        size='xs'
        name={displayName}
        src={avatarUrl || ''}
        cursor='default'
      />
      <Text fontSize='14px' fontWeight='normal' color='gray.500'>
        Posted by{' '}
        <Text
          aria-label='name'
          as='a'
          href={`localhost:3000/user/${id}`}
          color='blue.500'
          fontWeight='medium'
        >
          {displayName}
        </Text>
      </Text>
    </HStack>
  );
};
