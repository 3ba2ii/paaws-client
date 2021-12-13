import {
  FormControl,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  VStack,
} from '@chakra-ui/react';
import { UserAvatar } from 'components/UserAvatar';
import { useMissingPostCommentsQuery } from 'generated/graphql';
import React from 'react';
import { FiSend } from 'react-icons/fi';
import CommentForm from './CommentForm';

interface CommentsProps {
  postId: number;
}

const CommentsSection: React.FC<CommentsProps> = ({ postId }) => {
  const { data, loading } = useMissingPostCommentsQuery({
    variables: { options: { postId, limit: 5, cursor: null } },
  });

  return (
    <VStack w='100%' py={4}>
      <CommentForm postId={postId} />
      {data?.comments.comments.map((comment) => (
        <div key={comment.id}>{comment.id}</div>
      ))}
    </VStack>
  );
};
export default CommentsSection;
