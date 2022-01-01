import { Button, HStack, IconButton } from '@chakra-ui/react';
import { MissingPostQuery } from 'generated/graphql';
import React from 'react';
import { FiEdit2, FiShare2 } from 'react-icons/fi';

interface InnerPostActionsProps {
  isOwner: MissingPostQuery['missingPost']['isOwner'];
  missingPost: MissingPostQuery['missingPost']['missingPost'];
}

const InnerPostActions: React.FC<InnerPostActionsProps> = ({
  isOwner,
  missingPost,
}) => {
  return (
    <HStack>
      <IconButton aria-label='contact-user' icon={<FiShare2 />} size='sm' />
      {isOwner && (
        <IconButton aria-label='edit-post' icon={<FiEdit2 />} size='sm' />
      )}
      <Button size='sm' colorScheme={'teal'}>
        Contact {missingPost?.user.displayName.split(' ')[0]}
      </Button>
    </HStack>
  );
};
export default InnerPostActions;
