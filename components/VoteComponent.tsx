import React from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { TiArrowLeftOutline } from 'react-icons/ti';
interface VoteComponentProps {
  outlined?: boolean;
  isUpvote?: boolean;
}

const VoteComponent: React.FC<VoteComponentProps> = ({
  outlined = true,
  isUpvote = false,
}) => {
  const OutlinedComponents = (
    <>{isUpvote ? <FaChevronUp /> : <FaChevronDown />}</>
  );
  const FilledComponents = (
    <>
      {isUpvote ? (
        <FaChevronUp color='#38B2AC' />
      ) : (
        <FaChevronDown color='#F56565' />
      )}
    </>
  );

  return <>{outlined ? OutlinedComponents : FilledComponents}</>;
};
export default VoteComponent;
