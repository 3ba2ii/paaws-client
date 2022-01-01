import {
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react';
import GenericModal from 'components/common/overlays/CustomModal';
import {
  MissingPostQuery,
  useDeleteMissingPostMutation,
} from 'generated/graphql';
import router from 'next/router';
import React from 'react';
import { FiEdit2, FiShare2, FiTrash2 } from 'react-icons/fi';

interface InnerPostActionsProps {
  isOwner: MissingPostQuery['missingPost']['isOwner'];
  missingPost: MissingPostQuery['missingPost']['missingPost'];
}

const InnerPostActions: React.FC<InnerPostActionsProps> = ({
  isOwner,
  missingPost,
}) => {
  const [openDeletePostModal, setOpenDeletePostModal] = React.useState(false);
  const [deleteInputValue, setDeleteInputValue] = React.useState('');
  const [deleteMP, { loading }] = useDeleteMissingPostMutation();
  const toaster = useToast();

  const handleChangeInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteInputValue(e.target.value);
  };

  const toggleDeletePostModal = () => {
    setOpenDeletePostModal(!openDeletePostModal);
  };
  const errorToaster = () =>
    toaster({
      title: 'Something went wrong',
      status: 'error',
      description: `We couldn't delete your post right now, please try again later`,
    });
  const successToast = () =>
    toaster({
      title: 'Your post has been deleted',
      status: 'success',
    });
  const handleDeletePost = async () => {
    if (
      !missingPost ||
      !missingPost?.id ||
      deleteInputValue !== 'Delete Post'
    ) {
      errorToaster();
      return setOpenDeletePostModal(false);
    }

    const { data } = await deleteMP({
      variables: {
        deleteMissingPostId: missingPost.id,
      },
    });

    if (
      !data ||
      !data.deleteMissingPost?.deleted ||
      data.deleteMissingPost.errors?.length
    ) {
      errorToaster();
    } else {
      router.replace('/missing');
      successToast();
    }

    setOpenDeletePostModal(false);
  };

  return (
    <HStack>
      <Tooltip label='Share Post'>
        <IconButton aria-label='share-post' icon={<FiShare2 />} size='sm' />
      </Tooltip>
      {isOwner && (
        <HStack>
          <Tooltip label='Delete Post'>
            <IconButton
              aria-label='delete-post'
              icon={<FiTrash2 />}
              size='sm'
              onClick={toggleDeletePostModal}
            />
          </Tooltip>
          <Tooltip label='Edit Post'>
            <IconButton aria-label='edit-post' icon={<FiEdit2 />} size='sm' />
          </Tooltip>
        </HStack>
      )}

      <Button size='sm' colorScheme={'teal'}>
        Contact {missingPost?.user.displayName.split(' ')[0]}
      </Button>
      {
        <GenericModal
          isOpen={openDeletePostModal}
          onClose={() => setOpenDeletePostModal(false)}
          title={
            <VStack align='flex-start'>
              <Heading size='md'>🗑 Delete Post</Heading>
            </VStack>
          }
          body={
            <VStack spacing={4}>
              <Text textStyle='p1' fontSize='sm'>
                Deleting this post will remove it, as well as its comments,
                replies and votes from the site <strong>permanently</strong>.
                Are you sure you want to delete it?
              </Text>
              <VStack>
                <Text textStyle='p1' fontSize='sm'>
                  If you want to delete it, Type{' '}
                  <Text as='span' color='red.300'>
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
                colorScheme={'red'}
                disabled={deleteInputValue !== 'Delete Post'}
                isLoading={loading}
                onClick={handleDeletePost}
              >
                I understand the consequences, Just delete it 🗑
              </Button>
            </HStack>
          }
        />
      }
    </HStack>
  );
};
export default InnerPostActions;
