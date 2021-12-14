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
import { CommentFragmentFragment, useMeQuery } from 'generated/graphql';
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
  const { data } = useMeQuery({ fetchPolicy: 'cache-only' });

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

  //user can delete or edit the post if they are the author of the post or the comment author
  const isPostAuthor = data?.me?.id === postId;
  const isCommentAuthor = data?.me?.id === user.id;

  return (
    <VStack w='100%' align='flex-start' py={2}>
      <HStack w='100%' align='flex-start' justify={'space-between'}>
        <CommentOwnerHeader user={user} />
        <Text textStyle={'p3'}>{createdAtDistance}</Text>
      </HStack>
      <Text textStyle={'p1'} maxW='65ch'>
        {text}
      </Text>
      <HStack w='100%' justify='space-center' spacing={4}>
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
        <Button variant={'link'} fontWeight={'medium'} size={'xs'}>
          Reply
        </Button>
        {isCommentAuthor && (
          <Button variant={'link'} fontWeight={'medium'} size={'xs'}>
            Edit
          </Button>
        )}
        {(isPostAuthor || isCommentAuthor) && (
          <Button variant={'link'} fontWeight={'medium'} size={'xs'}>
            Delete
          </Button>
        )}
      </HStack>
    </VStack>
  );
};
export default Comment;
