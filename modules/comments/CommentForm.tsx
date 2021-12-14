import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  useToast,
} from '@chakra-ui/react';
import { UserAvatar } from 'components/UserAvatar';
import { useAddMpCommentMutation } from 'generated/graphql';
import React from 'react';
import { FiSend } from 'react-icons/fi';
import { updateCommentsCache } from 'utils/cache/updateCommentCache';

interface CommentFormProps {
  postId: number;
  parentId: number | null;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, parentId }) => {
  const [commentText, setCommentText] = React.useState('');
  const [addComment] = useAddMpCommentMutation();
  const toaster = useToast();

  const onCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const onCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await addComment({
      variables: {
        input: {
          postId,
          parentId,
          text: commentText,
        },
      },
      update: (cache, { data: result, errors }) => {
        if (!result || !result?.addMPComment || errors?.length) return;
        updateCommentsCache(cache, result, postId, parentId);
      },
    });

    if (data?.addMPComment.errors?.length) {
      toaster({
        status: 'error',
        title: 'Error adding comment',
        description: data.addMPComment.errors[0].message,
      });
    }

    setCommentText('');
  };
  return (
    <form style={{ width: '100%' }} onSubmit={onCommentSubmit}>
      <HStack w='100%'>
        <UserAvatar avatarProps={{ w: '40px', h: '40px' }} />
        <InputGroup variant={'filled'} w='100%' overflow={'hidden'}>
          <Input
            value={commentText}
            onChange={onCommentTextChange}
            placeholder='What do you think?'
            borderRadius={'full'}
            id='comment-input-field'
            required
          />
          <ScaleFade in={commentText.length > 0}>
            <InputRightElement
              children={
                <IconButton
                  w='100%'
                  type='submit'
                  colorScheme='blue'
                  icon={<FiSend />}
                  aria-label='add-comment'
                  variant='ghost'
                  borderRadius={'full'}
                />
              }
            />
          </ScaleFade>
        </InputGroup>
      </HStack>
    </form>
  );
};
export default CommentForm;
