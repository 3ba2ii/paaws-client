import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
interface VoteComponentProps {
  outlined?: boolean;
  isUpvote?: boolean;
}

const VoteIcon: React.FC<VoteComponentProps> = ({
  outlined = true,
  isUpvote = false,
}) => {
  const OutlinedComponents = (
    <>
      {isUpvote ? (
        <FaChevronUp color='#A0AEC0' />
      ) : (
        <FaChevronDown color='#A0AEC0' />
      )}
    </>
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
export default VoteIcon;
