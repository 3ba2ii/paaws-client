import { ApolloCache, gql } from '@apollo/client';
import { HStack, Text } from '@chakra-ui/layout';
import {
  Button,
  IconButton,
  IconButtonProps,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import VoteIcon from 'modules/posts/common/VoteIconComponent';
import { MissingPost, usePostVoteMutation } from 'generated/graphql';
import React from 'react';
import { BiMessageRounded, BiShareAlt } from 'react-icons/bi';
import { VoteComponent } from 'components/VoteComponent';

export const PostActions: React.FC<{
  postId: number;
  hasVoted: boolean;
  voteStatus?: number | null;
  points: number;
  commentsCount: number;
}> = ({ postId, hasVoted, voteStatus, points, commentsCount }) => {
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
  const updateCache = (
    cache: ApolloCache<any>,
    data: any,
    votingValue: 1 | -1
  ) => {
    if (!data?.vote?.success) return;
    const cachedPost = cache.readFragment({
      id: `MissingPost:${postId}`,
      fragment: gql`
        fragment MissingPost on MissingPost {
          id
          points
          voteStatus
        }
      `,
    }) as Partial<MissingPost>;

    if (cachedPost && typeof cachedPost.points === 'number') {
      /* update the cache
      updated points value has 3 cases
       1. the user has already voted
       2. the user did not vote before 
       3. the user revoted the  same vote again (he wants to remove his vote)
       */

      let addedPoints = 0;
      let newVoteStatus: 1 | -1 | null = null;
      //if the user has already voted, then the did not change his vote value then just decrease it by the voting value
      if (cachedPost.voteStatus === votingValue) {
        //then the user want to just delete his vote
        //1. decrease the points by the voting value
        addedPoints = -votingValue;
        //2. set the voteStatus to null
      } else {
        addedPoints = hasVoted ? votingValue * 2 : votingValue;
        newVoteStatus = votingValue;
      }
      cache.writeFragment({
        id: `MissingPost:${postId}`,
        fragment: gql`
          fragment MissingPost on MissingPost {
            points
            voteStatus
          }
        `,
        data: {
          points: cachedPost.points + addedPoints,
          voteStatus: newVoteStatus,
        },
      });
    }
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
          updateCache(cache, returnedData, votingValue);
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
