import { VStack, Divider } from '@chakra-ui/react';
import { CommentFragmentFragment } from 'generated/graphql';
import React from 'react';
import Comment from './Comment';

interface RepliesProps {
  replies: CommentFragmentFragment[];
}

const RepliesSection: React.FC<RepliesProps> = ({ replies }) => {
  return (
    <VStack w='100%' pl='10%' align={'flex-end'} divider={<Divider />}>
      {replies &&
        replies.map((reply) => <Comment key={reply.id} comment={reply} />)}
    </VStack>
  );
};
export default RepliesSection;
