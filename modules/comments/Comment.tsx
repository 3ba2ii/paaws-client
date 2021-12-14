import {
  Avatar,
  Button,
  HStack,
  IconButtonProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { VoteComponent } from 'components/VoteComponent';
import { formatDistance } from 'date-fns';
import { CommentFragmentFragment } from 'generated/graphql';
import React from 'react';

interface CommentProps {
  comment: CommentFragmentFragment;
}

const CommentOwnerHeader: React.FC<{ user: CommentFragmentFragment['user'] }> =
  ({ user }) => {
    return (
      <HStack>
        <Avatar name={user.displayName} src={user.avatar?.url + ''} size='xs' />
        <Button
          size='sm'
          fontWeight={'medium'}
          colorScheme={'blue'}
          variant='link'
        >
          {user.displayName}
        </Button>
      </HStack>
    );
  };

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const {
    id,
    user,
    createdAt,
    text,
    points,
    voteStatus,
    postId,
    isEdited,
    isReply,
    parentId,
  } = comment;
  const createdAtDistance = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });
  return (
    <VStack w='100%' align='flex-start'>
      <HStack w='100%' align='center' justify={'space-between'}>
        <CommentOwnerHeader user={user} />
        <Text textStyle={'p3'}>{createdAtDistance}</Text>
      </HStack>
      <Text textStyle={'p1'} maxW='65ch'>
        {text}
      </Text>
      <VoteComponent
        {...{
          id,
          points,
          voteStatus,
          entityType: 'comment',
          buttonProps: {
            minW: 'auto',
            height: 'auto',
            padding: '6px',
            variant: 'ghost',
            size: 'xs',
          } as IconButtonProps,
        }}
      />
    </VStack>
  );
};
export default Comment;
