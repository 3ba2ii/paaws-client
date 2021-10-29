import { HStack, Text } from '@chakra-ui/layout';
import { Button, IconButton, Tooltip } from '@chakra-ui/react';
import VoteComponent from 'components/VoteComponent';
import { usePostVoteMutation } from 'generated/graphql';
import React from 'react';
import { BiMessageRounded, BiShareAlt } from 'react-icons/bi';

export const PostActions: React.FC<{
  postId: number;
  hasVoted: boolean;
  voteStatus?: number | null;
  points: number;
}> = ({ postId, hasVoted, voteStatus, points }) => {
  const [vote] = usePostVoteMutation();

  const onVote = async (voteStatus: number) => {
    const { data } = await vote({
      variables: {
        postId,
        value: voteStatus,
      },
    });
    console.log(
      `🚀 ~ file: _SinglePostCardProps.tsx ~ line 185 ~ onVote ~ data`,
      data
    );
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
