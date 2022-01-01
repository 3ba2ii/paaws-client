import {
  Button,
  HStack,
  IconButton,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import ShareModal from 'components/ShareModal';
import {
  MissingPostQuery,
  useDeleteMissingPostMutation,
} from 'generated/graphql';
import router from 'next/router';
import React from 'react';
import { FiEdit2, FiShare2, FiTrash2 } from 'react-icons/fi';
import { DeletePostModal } from './DeletePostModal';

interface InnerPostActionsProps {
  isOwner: MissingPostQuery['missingPost']['isOwner'];
  missingPost: MissingPostQuery['missingPost']['missingPost'];
}

const InnerPostActions: React.FC<InnerPostActionsProps> = ({
  isOwner,
  missingPost,
}) => {
  const [openDeletePostModal, setOpenDeletePostModal] = React.useState(false);
  const [deleteMP, { loading }] = useDeleteMissingPostMutation();
  const toaster = useToast();

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
    if (!missingPost || !missingPost?.id) {
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
      <DeletePostModal
        {...{
          loading,
          handleDeletePost,
          isOpen: openDeletePostModal,
          onClose: toggleDeletePostModal,
        }}
      />
      <ShareModal {...{ isOpen: true, onClose: () => {} }} />
    </HStack>
  );
};
export default InnerPostActions;
