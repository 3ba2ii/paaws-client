import { Flex, FlexProps, IconButtonProps } from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { VoteComponent } from 'components/VoteComponent';
import { MissingPostQuery } from 'generated/graphql';
import React from 'react';

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
      <VoteComponent
        {...{
          points,
          voteStatus,
          onDownvote: () => {},
          onUpvote: () => {},
          flexProps: { flexDir: 'column' } as FlexProps,
          buttonProps: { variant: 'ghost' } as IconButtonProps,
        }}
      />
    </Flex>
  );
};
export default MissingPostContainer;
