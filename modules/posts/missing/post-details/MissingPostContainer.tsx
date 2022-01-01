import {
  Box,
  Button,
  Center,
  Flex,
  FlexProps,
  HStack,
  IconButtonProps,
} from '@chakra-ui/react';
import NotFound from 'components/NotFound';
import { VoteComponent } from 'components/VoteComponent';
import { MissingPostQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import InnerPostActions from './InnerPostActions';
import MissingPostDetails from './MissingPostDetails';

interface MissingPostContainerProps {
  post: MissingPostQuery['missingPost'];
}

const MissingPostContainer: React.FC<MissingPostContainerProps> = ({
  post,
}) => {
  const router = useRouter();
  const { missingPost, isOwner } = post;

  useEffect(() => {
    document.title = `${missingPost?.title || 'Missing Post'} - Paaws`;
  }, [post, missingPost]);

  return (
    <Flex
      w='100%'
      h='100%'
      align={'flex-start'}
      justifyContent={'space-between'}
    >
      {!missingPost ? (
        <HStack w='100%' h='100%'>
          <NotFound
            title='📭 404 Not Found'
            subtitle='We did not find your post, Please make sure you typed the right URL or please ty again later'
            backPath='/missing'
          />
        </HStack>
      ) : (
        <>
          <HStack flex='.15' align={'base-line'} justify={'space-between'}>
            <Button
              aria-label='back'
              leftIcon={<FiArrowLeft />}
              variant={'ghost'}
              size='sm'
              fontWeight={'normal'}
              onClick={() => router.back()}
            >
              Back
            </Button>
            <VoteComponent
              {...{
                ...missingPost,
                flexProps: { flexDir: 'column' } as FlexProps,
                buttonProps: { variant: 'ghost' } as IconButtonProps,
              }}
            />
          </HStack>
          <Box flex='.55'>
            <MissingPostDetails post={missingPost} isOwner={isOwner ?? false} />
          </Box>
          <Box flex='.15'>
            <InnerPostActions {...{ isOwner, missingPost }} />
          </Box>
        </>
      )}
    </Flex>
  );
};
export default MissingPostContainer;
