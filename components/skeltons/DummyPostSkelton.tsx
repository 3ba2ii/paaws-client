import { VStack } from '@chakra-ui/layout';
import React from 'react';
import { fallbackSrc } from 'utils/constants';
import { SinglePostCard } from '../../pages/missing/_SinglePostCardProps';

const DummyPostSkelton = (): JSX.Element => {
  return (
    <SinglePostCard
      {...{
        id: 999,
        title: 'Irure mollit aute laboris esse eu ',
        description:
          'Aliquip excepteur id esse nisi ut.Amet labore ut ex sit nisi laborum deserunt occaecat.Proident adipisicing laborum ut reprehenderit.',
        points: 10,
        createdAt: new Date().toISOString(),
        user: { id: 999, name: 'Loader', full_name: 'Loader' },
        thumbnail: { url: fallbackSrc },
        voteStatus: null,
        address: { distance: null },
        isLoaded: false,
      }}
    />
  );
};

export const DummyPostsSkeleton: React.FC<{ noOfPosts?: number }> = ({
  noOfPosts = 2,
}): JSX.Element => {
  return (
    <VStack
      sx={{
        gap: '24px',
      }}
    >
      {[...Array(noOfPosts)].map((_, index) => (
        <DummyPostSkelton key={index} />
      ))}
    </VStack>
  );
};
