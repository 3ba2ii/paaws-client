import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { MissingPostQuery } from 'generated/graphql';
import React from 'react';
import VoteIcon from '../common/VoteIconComponent';

interface MissingPostContainerProps {
  post: MissingPostQuery['missingPost'];
}

const MissingPostContainer: React.FC<MissingPostContainerProps> = ({
  post,
}) => {
  console.log(`🚀 ~ file: MissingPostContainer.tsx ~ line 9 ~ post`, post);
  const { missingPost, isOwner } = post;

  if (!missingPost)
    return (
      <NotFound
        title='404 Not Found'
        subtitle='We did not find your post, please try again later'
      />
    );
  const { voteStatus, points, title, description, tags, id } = missingPost;
  return (
    <Flex>
      {/* First Column - Voting column */}
      <VStack>
        <VoteIcon isUpvote />
        <Text>{points}</Text>
        <VoteIcon />
      </VStack>
    </Flex>
  );
};
export default MissingPostContainer;
