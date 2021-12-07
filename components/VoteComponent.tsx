import {
  Flex,
  FlexProps,
  IconButton,
  IconButtonProps,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import VoteIcon from 'modules/posts/common/VoteIconComponent';
import React from 'react';

function getPointsColor(voteStatus: number | undefined | null): string {
  if (!voteStatus) {
    return 'gray.400';
  }
  return voteStatus === 1 ? 'teal.400' : 'red.400';
}

interface VoteComponentProps {
  onUpvote: () => void;
  onDownvote: () => void;
  voteStatus?: number | 1 | -1 | null;
  points: number;
  flexProps?: FlexProps;
  buttonProps?: IconButtonProps;
  loading?: 'upvote' | 'downvote' | null;
}

export const VoteComponent: React.FC<VoteComponentProps> = ({
  onUpvote,
  onDownvote,
  voteStatus,
  points,
  flexProps,
  buttonProps,
  loading,
}) => {
  return (
    <Flex align={'center'} sx={{ gap: '8px' }} {...flexProps}>
      <Tooltip label='Upvote'>
        <IconButton
          onClick={onUpvote}
          icon={<VoteIcon type='up' voteStatus={voteStatus} />}
          aria-label='upvote'
          isLoading={loading === 'upvote'}
          {...buttonProps}
        />
      </Tooltip>
      <Text textStyle={'p1'} color={getPointsColor(voteStatus)}>
        {points}
      </Text>
      <Tooltip label='Downvote'>
        <IconButton
          onClick={onDownvote}
          icon={<VoteIcon type='down' voteStatus={voteStatus} />}
          aria-label='downvote'
          isLoading={loading === 'downvote'}
          {...buttonProps}
        />
      </Tooltip>
    </Flex>
  );
};
