import {
  Box,
  Flex,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import UserAvatar from 'components/UserAvatar';
import { useUserProfilePageQuery } from 'generated/graphql';
import React from 'react';

export const UserProfileHeader: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, loading } = useUserProfilePageQuery({
    variables: { userId },
  });

  if (loading) return <LoadingComponent />;
  if ((!loading && !data) || !data?.user) return null;

  const { displayName, full_name, id, bio, avatar, petsCount } = data?.user;
  return (
    <Flex
      w='100%'
      flexDir={['column', 'column', 'column', 'row']}
      align={['flex-start', 'center', 'center', 'center']}
      justify={['flex-start', 'center', 'center', 'center']}
      css={{ gap: '16px' }}
    >
      <Box h='100%'>
        <UserAvatar
          name={displayName}
          avatarURL={avatar?.url}
          avatarProps={{ size: '2xl' }}
        />
      </Box>
      <VStack h='100%' w='100%' align='flex-start' justify='flex-start'>
        <Heading size='lg'>{full_name}</Heading>
        <Text txtStyle='p1' maxW={'60ch'} fontWeight='medium' color='gray.500'>
          {bio} I love investing and making wellness and healing for everyone at
          WellnessOfficial.com. Come do breathwork with me there to calm down.
          #cryptocurious #mindful
        </Text>

        {/* STATS */}
        <HStack
          w='100%'
          spacing='12px'
          fontSize='sm'
          fontWeight={'semibold'}
          flexWrap='wrap'
        >
          <Text>
            <Text as='span' fontWeight={'extrabold'}>
              128
            </Text>{' '}
            Posts
          </Text>
          <Text>
            <Text as='span' fontWeight={'extrabold'}>
              12
            </Text>{' '}
            Rescued Pets
          </Text>
          <Text>
            <Text as='span' fontWeight={'extrabold'}>
              {petsCount}
            </Text>{' '}
            Owned Pets
          </Text>
        </HStack>

        {/* Tags */}
        <HStack py={2}>
          <Tag>#cat-person</Tag>
          <Tag>#dog-person</Tag>
          <Tag>#pet-lover</Tag>
        </HStack>
      </VStack>
    </Flex>
  );
};