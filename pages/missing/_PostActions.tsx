import { ApolloCache, gql } from '@apollo/client';
import { HStack, Text } from '@chakra-ui/layout';
import { Button, IconButton, Tooltip } from '@chakra-ui/react';
import VoteComponent from 'components/VoteIconComponent';
import { MissingPost, usePostVoteMutation } from 'generated/graphql';
import React from 'react';
import { BiMessageRounded, BiShareAlt } from 'react-icons/bi';

function getPointsColor(voteStatus: number | undefined | null): string {
  if (!voteStatus) {
    return 'gray.400';
  }
  return voteStatus === 1 ? 'teal.400' : 'red.400';
}

export const PostActions: React.FC<{
  postId: number;
  hasVoted: boolean;
  voteStatus?: number | null;
  points: number;
  commentsCount: number;
}> = ({ postId, hasVoted, voteStatus, points, commentsCount }) => {
  const [vote] = usePostVoteMutation();
  const [actionLoading, setLoading] = React.useState({
    upvoteLoading: false,
    downvoteLoading: false,
  });
  const [isOpen, setIsOpen] = React.useState(false);

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
          //open a dialog to warn the user
          setIsOpen(true);
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
    >
      <Tooltip label='Upvote'>
        <IconButton
          aria-label='Upvote'
          icon={
            <VoteComponent
              isUpvote
              outlined={!(hasVoted && voteStatus === 1)}
            />
          }
          onClick={() => onVote(1)}
          isLoading={actionLoading.upvoteLoading}
          variant='ghost'
        />
      </Tooltip>
      <Text color={getPointsColor(voteStatus)} textStyle='p1'>
        {points}
      </Text>
      <Tooltip label='Downvote'>
        <IconButton
          variant='ghost'
          icon={<VoteComponent outlined={!(hasVoted && voteStatus === -1)} />}
          aria-label='Downvote'
          isLoading={actionLoading.downvoteLoading}
          onClick={() => onVote(-1)}
        />
      </Tooltip>

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
