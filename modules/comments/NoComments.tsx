import { VStack, Text, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import { focusOnElement } from 'utils/helpers/focusOnElement';

const NoComments: React.FC = () => {
  return (
    <VStack h='200px' justify={'center'}>
      <Heading fontSize={'28px'} mb={1}>
        No Comments
      </Heading>
      <Text textStyle={'p1'} textAlign='center'>
        No one commented on this post <br />
        <Button
          size='sm'
          variant='link'
          colorScheme={'blue'}
          onClick={() => focusOnElement('comment-input-field')}
        >
          Start the conversation
        </Button>
      </Text>
    </VStack>
  );
};
export default NoComments;
