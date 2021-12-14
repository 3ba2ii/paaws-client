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
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const toaster = useToast();

  const onCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const onCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, errors } = await addComment({
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

      if (errors?.length || data?.addMPComment.errors?.length) {
        toaster({
          status: 'error',
          title: 'Error while adding comment',
          description:
            data?.addMPComment?.errors?.[0].message || errors?.[0]?.message,
        });
      }
    } catch (e: any) {
      if (e.message === 'Not Authenticated') {
        toaster({
          variant: 'subtle',
          status: 'warning',
          title: 'Not Authenticated',
          description:
            'You will be redirected to the login page, Just login and then come back',
        });
        router.replace(`/login?next=/missing/${postId}`);
      }
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
