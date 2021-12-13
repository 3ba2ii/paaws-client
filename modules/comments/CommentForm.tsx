import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
} from '@chakra-ui/react';
import { UserAvatar } from 'components/UserAvatar';
import React from 'react';
import { FiSend } from 'react-icons/fi';

interface CommentFormProps {
  postId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [commentText, setCommentText] = React.useState('');

  const onCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const onCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(commentText);

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
