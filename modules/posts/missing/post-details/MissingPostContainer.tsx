import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButtonProps,
  VStack,
} from '@chakra-ui/react';
import NotFound from 'components/errors/NotFound';
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
    <VStack
      w='100%'
      h='100%'
      align={'flex-start'}
      spacing={8}
      px={['3%', '5%', '8%']}
      maxW='8xl'
    >
      <HStack w='100%' justify={'space-between'}>
        <Button
          aria-label='back'
          leftIcon={<FiArrowLeft />}
          icon={<FiArrowLeft />}
          variant='ghost'
          size='sm'
          fontWeight={'normal'}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <InnerPostActions {...{ isOwner, missingPost }} />
      </HStack>

      <Flex w='100%' h='100%' align={'flex-start'} justifyContent={'center'}>
        {!missingPost ? (
          <NotFound
            title='📭 404 Not Found'
            subtitle='We did not find your post, Please make sure you typed the right URL or please ty again later'
            backPath='/missing'
          />
        ) : (
          <>
            <Box flex='auto' w='100%' maxW='3xl'>
              <HStack w='100%' align='flex-start' spacing={4}>
                <VoteComponent
                  {...{
                    ...missingPost,
                    flexProps: { flexDir: 'column' } as FlexProps,
                    buttonProps: { variant: 'ghost' } as IconButtonProps,
                  }}
                />
                <MissingPostDetails
                  post={missingPost}
                  isOwner={isOwner ?? false}
                />
              </HStack>
            </Box>
          </>
        )}
      </Flex>
    </VStack>
  );
};
export default MissingPostContainer;
