import {
  Box,
  Button,
  HStack,
  Input,
  ModalProps,
  Text,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';
import GenericModal from './common/overlays/CustomModal';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const shareUrl = (process.env.NEXT_PUBLIC_HOST_URL || '') + router.asPath;
  const { hasCopied, onCopy } = useClipboard(shareUrl);

  return (
    <GenericModal
      isOpen={true}
      onClose={onClose}
      title={
        <HStack w='100%' align={'flex-start'}>
          <Text>Share Post</Text>
        </HStack>
      }
      body={
        <VStack w='100%' align='flex-start'>
          <Box>
            <Text fontWeight={'semibold'}>Direct Link</Text>
            <Text fontWeight={'medium'} textStyle={'p2'}>
              You can share the post with your friends using the following link
            </Text>
          </Box>
          <HStack w='100%'>
            <Input
              size='sm'
              isReadOnly
              value={shareUrl}
              borderRadius={'md'}
              variant='filled'
              color='gray.400'
            />
            <Button
              size='sm'
              px={5}
              colorScheme={hasCopied ? 'teal' : 'gray'}
              onClick={onCopy}
            >
              {hasCopied ? '🥳 Voila' : 'Copy'}
            </Button>
          </HStack>
        </VStack>
      }
      footer={<div></div>}
      modalProps={{ size: 'lg' } as ModalProps}
    />
  );
};
export default ShareModal;
