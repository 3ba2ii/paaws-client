import {
  Box,
  Flex,
  FlexProps,
  Heading,
  IconButtonProps,
} from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { VoteComponent } from 'components/VoteComponent';
import { MissingPostQuery } from 'generated/graphql';
import React from 'react';
import MissingPostDetails from './MissingPostDetails';

interface MissingPostContainerProps {
  post: MissingPostQuery['missingPost'];
}

const MissingPostContainer: React.FC<MissingPostContainerProps> = ({
  post,
}) => {
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
      <Box flex='.2'>
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
      </Box>
      <Box flex='.8'>
        <MissingPostDetails post={missingPost} />
      </Box>
    </Flex>
  );
};
export default MissingPostContainer;
