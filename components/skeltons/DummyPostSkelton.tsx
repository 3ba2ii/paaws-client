import { Box } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/react';
import React from 'react';
import { fallbackSrc } from 'utils/constants';
import { SinglePostCard } from '../../pages/missing/_SinglePostCardProps';

export const DummyPostSkelton: React.FC<{ index: number }> = ({
  index,
}): JSX.Element => {
  return (
    <Box key={index}>
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
    </Box>
  );
};
