import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import CustomCarousel from 'components/common/media/CustomCarousel';
import { PostOwner } from 'components/PostOwner';
import { formatDistance } from 'date-fns';
import { MissingPostQuery } from 'generated/graphql';
import { useMemo } from 'react';
import { FiGlobe, FiShare2 } from 'react-icons/fi';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { PostTags } from '../common/PostTags';
interface MissingPostProps {
  post: MissingPostQuery['missingPost']['missingPost'];
}
const MissingPostDetails: React.FC<MissingPostProps> = ({ post }) => {
  if (!post) return null;
  const { title, description, tags, id, user, createdAt, address, images } =
    post;
  const createdAtDistance = useMemo(
    () => formatDistance(new Date(createdAt), new Date(), { addSuffix: true }),
    [createdAt]
  );

  return (
    <VStack w='100%' h='100%' align='flex-start' spacing={3}>
      <HStack w='100%' justify={'space-between'}>
        <Heading size='lg'>{title}</Heading>
        <HStack>
          <IconButton aria-label='contact-user' icon={<FiShare2 />} size='sm' />
          <Button size='sm' colorScheme={'teal'}>
            Contact {user.full_name.split(' ')[0]}
          </Button>
        </HStack>
      </HStack>
      <HStack>
        <PostOwner
          {...{
            id,
            displayName: user.displayName,
            avatarUrl: user.avatar?.url,
          }}
        />
        <Text textStyle='p3' textAlign={'center'} whiteSpace={'nowrap'}>
          {createdAtDistance}
        </Text>
      </HStack>
      {address && address.formatted_address && (
        <HStack color='gray.500'>
          <FiGlobe color='inherit' />
          <Text textStyle={'p2'} color='inherit'>
            {address.formatted_address}
          </Text>
        </HStack>
      )}
      <PostTags
        tags={tags}
        tagProps={{
          size: 'sm',
          fontSize: 'xs',
          fontWeight: 'semibold',
          borderRadius: '4px',
          px: 4,
          py: 1,
        }}
      />

      <Text textStyle={'p1'} fontWeight='normal' maxW='80ch'>
        {description}
        Eiusmod cupidatat eiusmod excepteur fugiat elit aliquip eu dolor
        occaecat exercitation proident. Reprehenderit ea occaecat voluptate elit
        reprehenderit ad veniam cillum tempor officia eiusmod nisi. Qui commodo
        do sunt adipisicing ipsum nostrud cillum elit ad voluptate. Eu et irure
        eu sint mollit eu elit voluptate consectetur et. Duis aute amet
        reprehenderit sint sunt occaecat. Dolor ea duis ut quis veniam id
        excepteur proident voluptate pariatur. Qui labore eu deserunt cupidatat
        laboris nulla adipisicing reprehenderit laborum aliquip. Nulla cillum
        consequat culpa sunt laborum sunt et. Cillum minim velit elit amet
        aliqua do ea veniam labore aliqua ea officia sunt.
      </Text>
      <Box w='100%' h='100%' py={4} maxW='600px'>
        <CustomCarousel
          images={images.map((image) => image.photo.url?.toString() || '')}
        />
      </Box>
      <Box>Comments Section</Box>
    </VStack>
  );
};

export default MissingPostDetails;
