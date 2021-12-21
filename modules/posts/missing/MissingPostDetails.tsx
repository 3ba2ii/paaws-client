import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import CustomCarousel from 'components/common/media/CustomCarousel';
import { PostOwner } from 'components/PostOwner';
import { formatDistance } from 'date-fns';
import { MissingPostQuery } from 'generated/graphql';
import CommentsSection from 'modules/comments/CommentsSection';
import React, { useMemo } from 'react';
import { BiMessageRounded, BiShareAlt, BiShieldAlt2 } from 'react-icons/bi';
import { FiGlobe } from 'react-icons/fi';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { focusOnElement } from 'utils/focusOnElement';
import { PostTags } from '../common/PostTags';
interface MissingPostProps {
  post: MissingPostQuery['missingPost']['missingPost'];
  isOwner: boolean;
}
const MissingPostDetails: React.FC<MissingPostProps> = ({ post, isOwner }) => {
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
        <HStack color='gray.500' align='center'>
          <FiGlobe color='inherit' />
          <Text textStyle={'p2'} color='inherit'>
            {address.formatted_address}
          </Text>
          -{' '}
          <Button variant='link' size='xs' colorScheme={'blue'}>
            Location on Map
          </Button>
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

      <Text textStyle={'p1'} fontWeight='normal' lineHeight={'1.7'} maxW='80ch'>
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
      {/* Missing Post Actions  */}
      <VStack w='100%' align='flex-start'>
        <Box w='100%' display={'grid'} placeItems={'center'}>
          <HStack
            w='100%'
            align='center'
            borderTop={'1px solid'}
            borderBottom={'1px solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            py={1.5}
            justify={'space-evenly'}
          >
            <Button
              px={6}
              variant='ghost'
              leftIcon={<BiMessageRounded />}
              onClick={() => focusOnElement('comment-input-field')}
            >
              Comment
            </Button>
            <Button px={6} variant='ghost' leftIcon={<BiShareAlt />}>
              Share
            </Button>
            <Button px={6} variant='ghost' leftIcon={<BiShieldAlt2 />}>
              Report
            </Button>
          </HStack>
        </Box>
        <CommentsSection postId={id} />
      </VStack>
    </VStack>
  );
};

export default MissingPostDetails;
