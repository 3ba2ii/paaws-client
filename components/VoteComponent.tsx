import {
  Flex,
  FlexProps,
  IconButton,
  IconButtonProps,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { usePostVoteMutation } from 'generated/graphql';
import VoteIcon from 'modules/posts/common/VoteIconComponent';
import React from 'react';
import { updateMissingPostCacheOnVote } from 'utils/cache/updateMissingPostOnVote';

function getPointsColor(voteStatus: number | undefined | null): string {
  if (!voteStatus) {
    return 'gray.400';
  }
  return voteStatus === 1 ? 'teal.400' : 'red.400';
}

interface VoteComponentProps {
  voteStatus?: number | 1 | -1 | null;
  points: number;
  postId: number;
  flexProps?: FlexProps;
  buttonProps?: IconButtonProps;
}

export const VoteComponent: React.FC<VoteComponentProps> = ({
  voteStatus,
  points,
  flexProps,
  buttonProps,
  postId,
}) => {
  const toaster = useToast();

  const [vote] = usePostVoteMutation();
  const [actionLoading, setLoading] = React.useState({
    upvoteLoading: false,
    downvoteLoading: false,
  });

  const handleVotingLoading =
    (type: 'upvote' | 'downvote') => (loading: boolean) => {
      setLoading({
        ...actionLoading,
        [`${type}Loading`]: loading,
      });
    };

  const onVote = async (votingValue: 1 | -1) => {
    handleVotingLoading(votingValue === 1 ? 'upvote' : 'downvote')(true);
    try {
      const { data } = await vote({
        variables: {
          postId,
          value: votingValue,
        },
        update: (cache, { data: returnedData, errors }) => {
          if (!returnedData || errors?.length) return;
          updateMissingPostCacheOnVote(
            cache,
            returnedData,
            votingValue,
            postId,
            voteStatus
          );
        },
      });
      if (data?.vote.errors?.length) {
        if (data?.vote.errors[0].field === 'spam') {
          toaster({
            title: 'Spam detected',
            description:
              'You have changed your vote 5 times in the last 10 minutes, Stop spamming before your get banned',
            status: 'warning',
            variant: 'solid',
            duration: 5000,
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      handleVotingLoading(votingValue === 1 ? 'upvote' : 'downvote')(false);
    }
  };
  return (
    <Flex align={'center'} sx={{ gap: '8px' }} {...flexProps}>
      <Tooltip label='Upvote'>
        <IconButton
          onClick={() => onVote(1)}
          icon={<VoteIcon type='up' voteStatus={voteStatus} />}
          aria-label='upvote'
          isLoading={actionLoading.upvoteLoading}
          {...buttonProps}
        />
      </Tooltip>
      <Text textStyle={'p1'} color={getPointsColor(voteStatus)}>
        {points}
      </Text>
      <Tooltip label='Downvote'>
        <IconButton
          onClick={() => onVote(-1)}
          icon={<VoteIcon type='down' voteStatus={voteStatus} />}
          aria-label='downvote'
          isLoading={actionLoading.downvoteLoading}
          {...buttonProps}
        />
      </Tooltip>
    </Flex>
  );
};
