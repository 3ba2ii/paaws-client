import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButtonProps,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { VoteComponent } from 'components/VoteComponent';
import { formatDistance } from 'date-fns';
import { Form, Formik } from 'formik';
import {
  CommentFragmentFragment,
  useEditCommentMutation,
  useMeQuery,
} from 'generated/graphql';
import React, { useState } from 'react';

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

const EditCommentForm: React.FC<{
  commentId: number;
  text: string;
  toggleMode: VoidFunction;
}> = ({ commentId, text, toggleMode }) => {
  const [editComment] = useEditCommentMutation();

  return (
    <Box w='100%'>
      <Formik
        initialValues={{ text }}
        onSubmit={async ({ text: editedText }) => {
          await editComment({
            variables: {
              commentId,
              text: editedText,
            },
          });

          toggleMode();
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <Textarea
              name='text'
              value={values.text}
              onChange={handleChange}
              required
              mb={4}
            />
            <HStack w='100%' justify='flex-end'>
              <Button size='sm' variant='ghost' onClick={toggleMode}>
                Cancel
              </Button>
              <Button size='sm' isLoading={isSubmitting} type='submit'>
                Edit Comment
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
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
            <Text textStyle={'p3'} as='span'>
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
          <Button variant={'link'} fontWeight={'medium'} size={'xs'}>
            Delete
          </Button>
        )}
      </HStack>
    </VStack>
  );
};
export default Comment;
