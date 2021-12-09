import { Button, Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import { MissingPostQuery } from 'generated/graphql';
import { FiPhoneCall, FiShare, FiShare2 } from 'react-icons/fi';

interface MissingPostProps {
  post: MissingPostQuery['missingPost']['missingPost'];
}
const MissingPostDetails: React.FC<MissingPostProps> = ({ post }) => {
  if (!post) return null;
  const { voteStatus, points, title, description, tags, id, user } = post;

  return (
    <VStack w='100%' h='100%' align='flex-start'>
      <HStack w='100%' justify={'space-between'}>
        <Heading size='lg'>{title}</Heading>
        <HStack>
          <IconButton aria-label='contact-user' icon={<FiShare2 />} size='sm' />
          <Button size='sm' colorScheme={'teal'}>
            Contact {user.full_name.split(' ')[0]}
          </Button>
        </HStack>
      </HStack>

      <p>{description}</p>
    </VStack>
  );
};

export default MissingPostDetails;
