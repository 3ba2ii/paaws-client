import { Box, Button, HStack, Textarea } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEditCommentMutation } from 'generated/graphql';
import React from 'react';

export const EditCommentForm: React.FC<{
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
            <HStack w='100%' justifyContent='flex-end'>
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
