import { HStack, Tag, Text } from '@chakra-ui/react';
import { UserProfilePageQuery } from 'generated/graphql';
import React from 'react';

interface UserProfileStatsProps {
  user: UserProfilePageQuery['user'];
}

const UserProfileStats: React.FC<UserProfileStatsProps> = ({ user }) => {
  if (!user) return null;
  const { petsCount, adoptionPostsCount } = user;
  return (
    <HStack
      w='100%'
      spacing='12px'
      fontSize='sm'
      fontWeight={'semibold'}
      flexWrap='wrap'
    >
      <Text>
        <Text as='span' fontWeight={'extrabold'}>
          {adoptionPostsCount}
        </Text>{' '}
        Adoption Posts
      </Text>
      <Text>
        <Text as='span' fontWeight={'extrabold'}>
          {petsCount}
        </Text>{' '}
        Owned Pets
      </Text>
    </HStack>
  );
};
export default UserProfileStats;
