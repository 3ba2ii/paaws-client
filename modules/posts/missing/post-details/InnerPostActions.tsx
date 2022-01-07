import {
  Button,
  DrawerProps,
  HStack,
  IconButton,
  Tooltip,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { CustomDrawer } from 'components/common/overlays/CustomDrawer';
import ContactInfoModal from 'components/ContactInfoModal';
import ShareModal from 'components/ShareModal';
import {
  MissingPostQuery,
  useDeleteMissingPostMutation,
} from 'generated/graphql';
import router from 'next/router';
import React from 'react';
import { FiEdit2, FiPhoneCall, FiShare2, FiTrash2 } from 'react-icons/fi';
import { MissingPostForm } from '../post-form/MissingPostForm';
import { DeletePostModal } from './DeletePostModal';

interface InnerPostActionsProps {
  isOwner: MissingPostQuery['missingPost']['isOwner'];
  missingPost: MissingPostQuery['missingPost']['missingPost'];
}

const InnerPostActions: React.FC<InnerPostActionsProps> = ({
  isOwner,
  missingPost,
}) => {
  const [openModals, setOpenModals] = React.useState({
    delete: false,
    share: false,
    edit: false,
    contact: false,
  });

  const contactButton = useBreakpointValue({ base: IconButton, md: Button });
  const toaster = useToast();
  const [deleteMP, { loading }] = useDeleteMissingPostMutation();

  const toggleModals = (modal: 'delete' | 'share' | 'edit' | 'contact') => {
    setOpenModals({ ...openModals, [modal]: !openModals[modal] });
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
      return toggleModals('delete');
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
    toggleModals('delete');
  };

  return (
    <HStack>
      <Tooltip label='Share Post'>
        <IconButton
          aria-label='share-post'
          icon={<FiShare2 />}
          size='sm'
          onClick={() => toggleModals('share')}
        />
      </Tooltip>
      {isOwner && (
        <HStack>
          <Tooltip label='Delete Post'>
            <IconButton
              aria-label='delete-post'
              icon={<FiTrash2 />}
              size='sm'
              onClick={() => toggleModals('delete')}
            />
          </Tooltip>
          <Tooltip label='Edit Post'>
            <IconButton
              aria-label='edit-post'
              icon={<FiEdit2 />}
              size='sm'
              onClick={() => toggleModals('edit')}
            />
          </Tooltip>
        </HStack>
      )}

      {!missingPost?.showEmail && !missingPost?.showPhoneNumber ? null : (
        <Button
          as={contactButton}
          icon={<FiPhoneCall />}
          size='sm'
          colorScheme={'teal'}
          onClick={() => toggleModals('contact')}
        >
          Contact {missingPost?.user.displayName.split(' ')[0].slice(0, 15)}
        </Button>
      )}

      <DeletePostModal
        {...{
          loading,
          handleDeletePost,
          isOpen: openModals.delete,
          onClose: () => toggleModals('delete'),
        }}
      />
      <ShareModal
        {...{
          isOpen: openModals.share,
          onClose: () => toggleModals('share'),
        }}
      />
      <CustomDrawer
        isOpen={openModals.edit}
        onClose={() => toggleModals('edit')}
        drawerHeader='Edit Post'
        drawerBody={
          <MissingPostForm
            closeDrawer={() => toggleModals('edit')}
            editMode
            missingPost={missingPost}
          />
        }
        drawerProps={{ closeOnOverlayClick: false } as DrawerProps}
      />
      <ContactInfoModal
        {...{
          isOpen: openModals.contact,
          onClose: () => toggleModals('contact'),
          missingPost,
        }}
      />
    </HStack>
  );
};
export default InnerPostActions;
