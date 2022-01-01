import {
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import GenericModal from 'components/common/overlays/CustomModal';
import React from 'react';

export const DeletePostModal: React.FC<{
  isOpen: boolean;
  onClose: VoidFunction;
  loading: boolean;
  handleDeletePost: VoidFunction;
}> = ({ isOpen, onClose, loading, handleDeletePost }) => {
  const [deleteInputValue, setDeleteInputValue] = React.useState('');
  const handleChangeInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteInputValue(e.target.value);
  };
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <VStack align='flex-start' spacing={6}>
          <Heading size='md'>🗑 Delete Post</Heading>
          <Divider />
        </VStack>
      }
      body={
        <VStack spacing={4}>
          <Text textStyle='p1' fontSize='sm'>
            Deleting this post will remove it, as well as its comments, replies
            and votes from the site <strong>permanently</strong>. Are you sure
            you want to delete it?
          </Text>
          <VStack>
            <Text textStyle='p1' fontSize='sm'>
              If you want to delete it, Type{' '}
              <Text as='span' color='red.300' fontWeight={'semibold'}>
                Delete Post
              </Text>{' '}
              in the box below. and click delete.
            </Text>
            <Input
              size='sm'
              placeholder='Delete Post'
              borderRadius={'md'}
              value={deleteInputValue}
              onChange={handleChangeInputVal}
            />
          </VStack>
        </VStack>
      }
      footer={
        <HStack w='100%' mt='-3'>
          <Button
            w='100%'
            size='sm'
            h='38px'
            colorScheme={'red'}
            disabled={deleteInputValue !== 'Delete Post'}
            isLoading={loading}
            onClick={handleDeletePost}
          >
            I understand the consequences, just delete it 🗑
          </Button>
        </HStack>
      }
    />
  );
};
