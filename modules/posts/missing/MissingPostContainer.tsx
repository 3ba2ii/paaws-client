import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { VoteComponent } from 'components/VoteComponent';
import { MissingPostQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FiArrowLeft, FiEdit2, FiShare2 } from 'react-icons/fi';
import MissingPostDetails from './MissingPostDetails';

interface MissingPostContainerProps {
  post: MissingPostQuery['missingPost'];
}

const MissingPostContainer: React.FC<MissingPostContainerProps> = ({
  post,
}) => {
  const router = useRouter();
  const { missingPost, isOwner } = post;

  useEffect(() => {
    document.title = `${missingPost?.title || 'Missing Post'} - Paaws`;
  }, [post, missingPost]);

  if (!missingPost)
    return (
      <NotFound
        title='404 Not Found'
        subtitle='We did not find your post, please try again later'
      />
    );
  const { voteStatus, points, id } = missingPost;
  return (
    <Flex
      w='100%'
      h='100%'
      align={'flex-start'}
      justifyContent={'space-between'}
    >
      {/* First Column - Voting column */}
      <HStack flex='.15' align={'base-line'} justify={'space-between'}>
        <Button
          aria-label='back'
          leftIcon={<FiArrowLeft />}
          variant={'ghost'}
          size='sm'
          fontWeight={'normal'}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <VoteComponent
          {...{
            points,
            voteStatus,
            postId: id,
            flexProps: { flexDir: 'column' } as FlexProps,
            buttonProps: { variant: 'ghost' } as IconButtonProps,
          }}
        />
      </HStack>
      <Box flex='.55'>
        <MissingPostDetails post={missingPost} isOwner={isOwner || false} />
      </Box>
      <Box flex='.15'>
        <HStack>
          <IconButton aria-label='contact-user' icon={<FiShare2 />} size='sm' />
          {isOwner && (
            <IconButton aria-label='edit-post' icon={<FiEdit2 />} size='sm' />
          )}
          <Button size='sm' colorScheme={'teal'}>
            Contact {missingPost.user.displayName.split(' ')[0]}
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};
export default MissingPostContainer;
