import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButtonProps,
} from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { VoteComponent } from 'components/VoteComponent';
import { MissingPostQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import MissingPostDetails from './MissingPostDetails';

interface MissingPostContainerProps {
  post: MissingPostQuery['missingPost'];
}

const MissingPostContainer: React.FC<MissingPostContainerProps> = ({
  post,
}) => {
  const router = useRouter();
  const { missingPost, isOwner } = post;

  const onVote = (vote: 1 | -1) => {
    console.log('vote', vote);
  };

  if (!missingPost)
    return (
      <NotFound
        title='404 Not Found'
        subtitle='We did not find your post, please try again later'
      />
    );
  const { voteStatus, points, title, description, tags, id } = missingPost;
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
            onUpvote: () => onVote(1),
            onDownvote: () => onVote(-1),
            flexProps: { flexDir: 'column' } as FlexProps,
            buttonProps: { variant: 'ghost' } as IconButtonProps,
          }}
        />
      </HStack>
      <Box flex='.8'>
        <MissingPostDetails post={missingPost} isOwner={isOwner || false} />
      </Box>
    </Flex>
  );
};
export default MissingPostContainer;
