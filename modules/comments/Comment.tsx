import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { CommentFragmentFragment } from 'generated/graphql';
import React from 'react';

interface CommentProps {
  comment: CommentFragmentFragment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { id, user, createdAt, isReply, text, postId, isEdited } = comment;
  const createdAtDistance = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });
  return (
    <VStack w='100%' align='flex-start'>
      <HStack w='100%' align='center' justify={'space-between'}>
        <HStack>
          <Avatar
            name={user.displayName}
            src={user.avatar?.url + ''}
            size='xs'
          />
          <Button
            size='sm'
            fontWeight={'medium'}
            colorScheme={'blue'}
            variant='link'
          >
            {user.displayName}
          </Button>
        </HStack>
        <Text textStyle={'p3'}>{createdAtDistance}</Text>
      </HStack>
      <Text textStyle={'p1'}>{text}</Text>
    </VStack>
  );
};
export default Comment;
