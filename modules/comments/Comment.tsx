import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButtonProps,
  ScaleFade,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { VoteComponent } from 'components/VoteComponent';
import { formatDistance } from 'date-fns';
import { CommentFragmentFragment, useMeQuery } from 'generated/graphql';
import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { DeleteCommentPopover } from './DeleteCommentPopover';
import { EditCommentForm } from './EditCommentForm';
import RepliesSection from './RepliesSection';

interface CommentProps {
  comment: CommentFragmentFragment & { replies?: CommentFragmentFragment[] };
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
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  const [replyVisible, setReplyVisible] = useState(false);
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
    repliesCount,
  } = comment;
  const createdAtDistance = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });

  //user can delete or edit the post if they are the author of the post or the comment author
  const isPostAuthor = data?.me?.id === postId;
  const isCommentAuthor = data?.me?.id === user.id;

  const toggleMode = () => {
    if (mode === 'view') {
      setMode('edit');
    } else {
      setMode('view');
    }
  };

  const toggleReplyMode = () => {
    setReplyVisible(!replyVisible);
  };
  return (
    <VStack
      w='100%'
      align='flex-start'
      py={2}
      pos='relative'
      _before={
        isReply
          ? {
              content: '""',
              w: '2px',
              h: '100%',
              borderLeft: '1px solid',
              borderColor: useColorModeValue('gray.300', 'gray.600'),
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
            }
          : {}
      }
    >
      <HStack w='100%' align='flex-start' justify={'space-between'}>
        <CommentOwnerHeader user={user} />
        <Text textStyle={'p3'}>
          {createdAtDistance} - {id}
        </Text>
      </HStack>
      {mode === 'view' ? (
        <Text textStyle={'p1'} maxW='65ch'>
          {text}{' '}
          {isEdited && (
            <Text textStyle={'p3'} as='span' opacity={'.75'}>
              (edited)
            </Text>
          )}
        </Text>
      ) : (
        <EditCommentForm {...{ commentId: id, text, toggleMode }} />
      )}
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
        <Button
          variant={'link'}
          fontWeight={'medium'}
          size={'xs'}
          onClick={toggleReplyMode}
        >
          Reply
        </Button>
        {isCommentAuthor && (
          <Button
            variant={'link'}
            fontWeight={'medium'}
            size={'xs'}
            onClick={toggleMode}
          >
            {mode === 'edit' ? 'Cancel' : 'Edit'}
          </Button>
        )}
        {(isPostAuthor || isCommentAuthor) && (
          <DeleteCommentPopover commentId={id} postId={postId} />
        )}
      </HStack>
      {repliesCount && (
        <RepliesSection repliesCount={repliesCount} parentId={id} />
      )}
      {replyVisible && (
        <Box w='100%' pt={2}>
          <ScaleFade in={replyVisible}>
            <CommentForm
              postId={postId}
              parentId={id}
              avatarProps={{ size: 'sm' }}
              inputGroupProps={{
                size: 'sm',
                placeholder: 'What do you think? ',
              }}
            />
          </ScaleFade>
        </Box>
      )}
    </VStack>
  );
};
export default Comment;
