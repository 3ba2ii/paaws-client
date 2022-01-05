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
import ResponsiveButton from 'components/ResponsiveButton';
import ShareModal from 'components/ShareModal';
import { formatDistance } from 'date-fns';
import { MissingPostQuery } from 'generated/graphql';
import CommentsSection from 'modules/comments/CommentsSection';
import React, { useMemo } from 'react';
import { BiMessageRounded, BiShareAlt, BiShieldAlt2 } from 'react-icons/bi';
import { FiGlobe } from 'react-icons/fi';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { focusOnElement } from 'utils/focusOnElement';
import { PostTags } from '../../common/PostTags';
interface MissingPostProps {
  post: MissingPostQuery['missingPost']['missingPost'];
  isOwner: boolean;
}
const MissingPostDetails: React.FC<MissingPostProps> = ({ post, isOwner }) => {
  const [openModals, setOpenModals] = React.useState({ share: false });
  if (!post) return null;
  const { title, description, tags, id, user, createdAt, address, images } =
    post;
  const createdAtDistance = useMemo(
    () => formatDistance(new Date(createdAt), new Date(), { addSuffix: true }),
    [createdAt]
  );

  const toggleShowModal = (modal: 'share') => {
    setOpenModals({ ...openModals, [modal]: !openModals[modal] });
  };

  return (
    <VStack w='100%' h='100%' align='flex-start' spacing={3}>
      <HStack w='100%' justify={'space-between'}>
        <Heading size='lg' maxW='50ch' wordBreak={'break-all'}>
          {title}
        </Heading>
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

      <Text
        w='100%'
        textStyle={'p1'}
        fontWeight='normal'
        lineHeight={'1.7'}
        maxW='70ch'
        wordBreak={'break-all'}
      >
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
      <Box w='100%' h='100%' p={4} maxW='600px'>
        <CustomCarousel
          images={images.map((image) => image.photo.url?.toString() || '')}
        />
      </Box>
      {/* Missing Post Actions  */}
      <VStack w='100%' align='flex-start'>
        <HStack
          w='100%'
          align='center'
          borderTop={'1px solid'}
          borderBottom={'1px solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          py={1.5}
          justify={'space-evenly'}
        >
          <ResponsiveButton
            {...{
              icon: <BiMessageRounded />,
              label: 'Comment',
              onClick: () => focusOnElement('comment-input-field'),
            }}
          />

          <ResponsiveButton
            {...{
              icon: <BiShareAlt />,
              label: 'Share',
              onClick: () => toggleShowModal('share'),
            }}
          />
          <ResponsiveButton
            {...{
              icon: <BiShieldAlt2 />,
              label: 'Report',
              onClick: () => {},
            }}
          />
        </HStack>
        <CommentsSection postId={id} />
      </VStack>
      <ShareModal
        isOpen={openModals.share}
        onClose={() => toggleShowModal('share')}
      />
    </VStack>
  );
};

export default MissingPostDetails;
