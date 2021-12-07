import { ApolloCache, gql } from '@apollo/client';
import { HStack } from '@chakra-ui/layout';
import {
  Button,
  IconButton,
  IconButtonProps,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { VoteComponent } from 'components/VoteComponent';
import { MissingPost, usePostVoteMutation } from 'generated/graphql';
import React from 'react';
import { BiMessageRounded, BiShareAlt } from 'react-icons/bi';
import { updateMissingPostCacheOnVote } from 'utils/cache/updateMissingPostOnVote';

export const PostActions: React.FC<{
  postId: number;
  voteStatus?: number | null;
  points: number;
  commentsCount: number;
}> = ({ postId, voteStatus, points, commentsCount }) => {
  const hasVoted = voteStatus != null;

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
          //updateCache(cache, returnedData, votingValue);
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
    <HStack
      w='100%'
      color={'gray.400'}
      sx={{ gap: '2px' }}
      css={{
        button: {
          minWidth: 'auto',
          height: 'auto',
          padding: '6px',
        },
      }}
      tabIndex={5}
    >
      {/* Upvote and downvote section */}
      <VoteComponent
        {...{
          points,
          voteStatus,
          onUpvote: () => onVote(1),
          onDownvote: () => onVote(-1),
          loading: actionLoading.upvoteLoading
            ? 'upvote'
            : actionLoading.downvoteLoading
            ? 'downvote'
            : null,
          buttonProps: {
            minW: 'auto',
            height: 'auto',
            padding: '6px',
            variant: 'ghost',
          } as IconButtonProps,
        }}
      />

      {/* Comments Section */}
      <Tooltip label='Comment'>
        {commentsCount > 0 ? (
          <Button
            size='sm'
            variant={'ghost'}
            color='inherit'
            leftIcon={<BiMessageRounded />}
          >
            {commentsCount}
          </Button>
        ) : (
          <IconButton
            color='inherit'
            variant='ghost'
            aria-label='Comments'
            icon={<BiMessageRounded />}
          />
        )}
      </Tooltip>
      {/* Share  */}
      <Tooltip label='Share'>
        <IconButton
          variant={'ghost'}
          color='inherit'
          icon={<BiShareAlt />}
          aria-label={'Share'}
        />
      </Tooltip>
    </HStack>
  );
};
