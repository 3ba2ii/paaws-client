import {
  Avatar,
  Button,
  HStack,
  IconButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  usePopover,
  usePopoverContext,
  VStack,
} from '@chakra-ui/react';
import { VoteComponent } from 'components/VoteComponent';
import { formatDistance } from 'date-fns';
import {
  CommentFragmentFragment,
  MissingPostCommentsDocument,
  MissingPostCommentsQuery,
  useDeleteCommentMutation,
  useMeQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import { deleteCommentFromCache } from 'utils/cache/deleteCommentFromCache';
import { EditCommentForm } from './EditCommentForm';

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

const DeleteButtonPopOver: React.FC<{ commentId: number; postId: number }> = ({
  commentId,
  postId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteComment, { loading }] = useDeleteCommentMutation();

  const togglePopOver = () => setIsOpen(!isOpen);

  const onDeleteComment = async () => {
    await deleteComment({
      variables: {
        commentId,
      },
      update: (cache, { data, errors }) => {
        if (!data || errors?.length) {
          return;
        }
        deleteCommentFromCache(cache, data, postId, commentId);
      },
    });

    togglePopOver();
  };
  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          onClick={togglePopOver}
          variant={'link'}
          fontWeight={'medium'}
          size={'xs'}
        >
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent w={'350px'}>
        <PopoverArrow />
        <PopoverCloseButton onClick={togglePopOver} />
        <PopoverHeader fontWeight={'semibold'}>🗑 Delete Comment?</PopoverHeader>
        <PopoverBody color='gray.400' fontSize={'sm'} py={4}>
          Are you sure you want to delete this comment? Deleting this comment
          will also delete all of its <strong>replies</strong> as well.
        </PopoverBody>
        <PopoverFooter>
          <HStack w='100%' justify='flex-end'>
            <Button size='sm' variant='ghost' onClick={togglePopOver}>
              Cancel
            </Button>
            <Button
              size='sm'
              colorScheme='red'
              onClick={onDeleteComment}
              isLoading={loading}
            >
              Delete Comment
            </Button>
          </HStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [mode, setMode] = useState<'edit' | 'view'>('view');
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

  const toggleMode = () => {
    if (mode === 'view') {
      setMode('edit');
    } else {
      setMode('view');
    }
  };
  return (
    <VStack w='100%' align='flex-start' py={2}>
      <HStack w='100%' align='flex-start' justify={'space-between'}>
        <CommentOwnerHeader user={user} />
        <Text textStyle={'p3'}>{createdAtDistance}</Text>
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
        <Button variant={'link'} fontWeight={'medium'} size={'xs'}>
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
          <DeleteButtonPopOver commentId={id} postId={postId} />
        )}
      </HStack>
    </VStack>
  );
};
export default Comment;
