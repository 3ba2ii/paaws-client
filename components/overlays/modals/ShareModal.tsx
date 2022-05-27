import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  ModalProps,
  Text,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import GenericModal from '../CustomModal';

const ShareSocialMediaList = [
  {
    Wrapper: FacebookShareButton,
    Child: (
      <Button
        size='sm'
        bg='facebook.500'
        color='whiteAlpha.900'
        leftIcon={<FaFacebook size='18px' />}
      >
        Facebook
      </Button>
    ),
  },
  {
    Wrapper: TwitterShareButton,
    Child: (
      <Button
        size='sm'
        colorScheme={'twitter'}
        leftIcon={<FaTwitter size='18px' />}
      >
        Twitter
      </Button>
    ),
  },
  {
    Wrapper: WhatsappShareButton,
    Child: (
      <Button
        size='sm'
        colorScheme={'whatsapp'}
        leftIcon={<FaWhatsapp size='18px' />}
      >
        Whatsapp
      </Button>
    ),
  },
];
interface ShareModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  shareTitle?: string;
  hashtags?: string[];
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareTitle,
  hashtags,
}) => {
  const shareUrl = (process.env.NEXT_PUBLIC_HOST_URL || '') + router.asPath;
  const shareTitleText = shareTitle || 'Missing Post';
  const { hasCopied, onCopy } = useClipboard(shareUrl);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <HStack w='100%' align={'flex-start'} pb={3}>
            <Text>Share Post</Text>
          </HStack>
          <Divider />
        </>
      }
      body={
        <VStack w='100%' divider={<Divider />} spacing={5}>
          <VStack w='100%' align='flex-start'>
            <Box>
              <Heading fontWeight={'semibold'} size='sm'>
                Direct Link
              </Heading>
              <Text fontWeight={'medium'} textStyle={'p2'}>
                You can share the post with your friends using the following
                link
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
                {hasCopied ? '🥳 Copied' : 'Copy'}
              </Button>
            </HStack>
          </VStack>
          <VStack w='100%' align='flex-start'>
            <Box>
              <Heading fontWeight={'semibold'} size='sm' mb={1}>
                Share to Social Media
              </Heading>
              <Text fontWeight={'medium'} textStyle={'p2'} maxW='45ch'>
                You can share the post with your friends using the following
                social media links
              </Text>
            </Box>
            <HStack
              w='100%'
              align={'flex-start'}
              justify={'flex-start'}
              wrap={'wrap'}
              pt={2}
            >
              {ShareSocialMediaList.map(({ Wrapper, Child }, index) => (
                <Wrapper
                  key={index}
                  url={shareUrl}
                  title={shareTitleText}
                  hashtags={hashtags}
                >
                  {Child}
                </Wrapper>
              ))}
            </HStack>
          </VStack>
        </VStack>
      }
      footer={<div></div>}
      modalProps={{ size: 'lg' } as ModalProps}
    />
  );
};
export default ShareModal;
