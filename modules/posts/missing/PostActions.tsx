import { HStack } from '@chakra-ui/layout';
import { Button, IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';
import { VoteComponent } from 'components/VoteComponent';
import React from 'react';
import { BiMessageRounded, BiShareAlt } from 'react-icons/bi';

export const PostActions: React.FC<{
  postId: number;
  voteStatus?: number | null;
  points: number;
  commentsCount: number;
}> = ({ postId, voteStatus, points, commentsCount }) => {
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
          postId,
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
