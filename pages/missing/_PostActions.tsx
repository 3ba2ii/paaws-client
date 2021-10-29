import { gql } from '@apollo/client';
import { HStack, Text } from '@chakra-ui/layout';
import { Button, IconButton, Tooltip } from '@chakra-ui/react';
import VoteComponent from 'components/VoteComponent';
import { MissingPost, usePostVoteMutation } from 'generated/graphql';
import React from 'react';
import { BiMessageRounded, BiShareAlt } from 'react-icons/bi';
import { useIsAuth } from 'utils/useIsAuth';

export const PostActions: React.FC<{
  postId: number;
  hasVoted: boolean;
  voteStatus?: number | null;
  points: number;
}> = ({ postId, hasVoted, voteStatus, points }) => {
  const [vote] = usePostVoteMutation();
  const [actionLoading, setLoading] = React.useState({
    upvoteLoading: false,
    downvoteLoading: false,
  });

  const onVote = async (votingValue: number) => {
    if (votingValue === 1)
      setLoading({ ...actionLoading, upvoteLoading: true });
    else setLoading({ ...actionLoading, downvoteLoading: true });

    const { data } = await vote({
      variables: {
        postId,
        value: votingValue,
      },
      update: (cache, { data }) => {
        if (!data?.vote.success) return;
        const cachedPost = cache.readFragment({
          id: `MissingPost:${postId}`,
          fragment: gql`
            fragment MissingPost on MissingPost {
              id
              points
              voteStatus
            }
          `,
        }) as Partial<MissingPost> | null;

        if (cachedPost && typeof cachedPost.points === 'number') {
          //update the cache
          //updated points value has two cases
          // if the user has already voted, then the change in value will be multiplied by two
          //else the change in value will the new votingValue

          const newPoints = hasVoted ? votingValue * 2 : votingValue;
          cache.writeFragment({
            id: `MissingPost:${postId}`,
            fragment: gql`
              fragment MissingPost on MissingPost {
                points
                voteStatus
              }
            `,
            data: {
              points: cachedPost.points + newPoints,
              voteStatus: votingValue,
            },
          });
        }
      },
    });
    setLoading({
      ...actionLoading,
      upvoteLoading: false,
      downvoteLoading: false,
    });

    if (!data?.vote.success) {
      //an error occurred
      return;
    }
  };
  return (
    <HStack w='100%' color={'gray.400'} sx={{ gap: '2px' }}>
      <Tooltip label='Upvote'>
        <IconButton
          sx={{
            minWidth: 'auto',
            height: 'auto',
            p: '6px',
          }}
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
      <Text
        color={
          !hasVoted ? 'inherit' : voteStatus === 1 ? 'teal.400' : 'red.400'
        }
        textStyle='p1'
      >
        {points}
      </Text>
      <Tooltip label='Downvote'>
        <IconButton
          sx={{
            minWidth: 'auto',
            height: 'auto',
            padding: '6px',
          }}
          variant='ghost'
          icon={<VoteComponent outlined={!(hasVoted && voteStatus === -1)} />}
          aria-label='Downvote'
          isLoading={actionLoading.downvoteLoading}
          onClick={() => onVote(-1)}
        />
      </Tooltip>

      {/* Comments Section */}
      <Tooltip label='Comments'>
        <Button
          size='sm'
          sx={{
            minWidth: 'auto',
            height: 'auto',
            padding: '6px',
          }}
          variant={'ghost'}
          color='inherit'
          leftIcon={<BiMessageRounded />}
        >
          11
        </Button>
      </Tooltip>
      {/* Share  */}
      <Tooltip label='Share'>
        <IconButton
          sx={{
            minWidth: 'auto',
            height: 'auto',
            padding: '6px',
          }}
          variant={'ghost'}
          color='inherit'
          icon={<BiShareAlt />}
          aria-label={'Share'}
        />
      </Tooltip>
    </HStack>
  );
};
