import {
  AvatarProps,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputRightElement,
  ScaleFade,
  useToast,
} from '@chakra-ui/react';
import { UserAvatar } from 'components/UserAvatar';
import {
  GetCommentRepliesDocument,
  MissingPostCommentsDocument,
  useAddMpCommentMutation,
} from 'generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { FiSend } from 'react-icons/fi';

interface CommentFormProps {
  postId: number;
  parentId: number | null;
  avatarProps?: AvatarProps;
  inputGroupProps?: InputGroupProps;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentId,
  avatarProps,
  inputGroupProps,
}) => {
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
        refetchQueries: [
          GetCommentRepliesDocument,
          MissingPostCommentsDocument,
        ],
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
      if (e?.message === 'Not Authenticated') {
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
        <UserAvatar avatarProps={avatarProps} />
        <InputGroup variant={'filled'} w='100%' overflow={'hidden'}>
          <Input
            value={commentText}
            onChange={onCommentTextChange}
            placeholder='What do you think?'
            borderRadius={'full'}
            id='comment-input-field'
            required
            {...inputGroupProps}
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
                  borderRadius='full'
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
