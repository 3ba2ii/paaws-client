import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useDeleteCommentMutation } from 'generated/graphql';
import React, { useState } from 'react';
import { deleteCommentFromCache } from 'utils/cache/deleteCommentFromCache';

export const DeleteCommentPopover: React.FC<{
  commentId: number;
  postId: number;
}> = ({ commentId, postId }) => {
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
    <Popover isOpen={isOpen} closeOnBlur>
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
        <PopoverBody color='gray.400' fontSize={'sm'}>
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
