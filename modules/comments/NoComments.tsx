import { VStack, Text, Heading, Button } from '@chakra-ui/react';
import React from 'react';

const NoComments: React.FC = () => {
  const focusOnCommentInputField = () => {
    const commentForm = document.getElementById('comment-input-field');
    if (commentForm) {
      commentForm.focus();
    }
  };
  return (
    <VStack py={20}>
      <Heading fontSize={'28px'} mb={1}>
        No Comments
      </Heading>
      <Text textStyle={'p1'} textAlign='center'>
        No one commented on this post <br />
        <Button
          size='sm'
          variant='link'
          colorScheme={'blue'}
          onClick={focusOnCommentInputField}
        >
          Start the conversation now
        </Button>
      </Text>
    </VStack>
  );
};
export default NoComments;
