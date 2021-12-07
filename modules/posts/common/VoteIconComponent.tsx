import { Box } from '@chakra-ui/react';
import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
interface VoteComponentProps {
  type: 'up' | 'down';
  voteStatus?: number | null;
}

const VoteIcon: React.FC<VoteComponentProps> = ({ type, voteStatus }) => {
  const isUp = type === 'up';
  const isUpvoted = isUp && voteStatus === 1;
  const isDownVoted = !isUp && voteStatus === -1;

  return (
    <>
      {isUp ? (
        <Box color={isUpvoted ? '#38B2AC' : '#A0AEC0'}>
          <FaChevronUp color='inherit' />
        </Box>
      ) : (
        <Box color={isDownVoted ? '#F56565' : '#A0AEC0'}>
          <FaChevronDown color='inherit' />
        </Box>
      )}
    </>
  );
};
export default VoteIcon;
