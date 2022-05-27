import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { UserAvatar } from 'components/common/UserAvatar';
import { MissingPostTypes, useMeQuery } from 'generated/graphql';
import router from 'next/router';
import React from 'react';
import { MissingPageTaps } from './MissingPageTaps';

export const RecommendAdoptionCard = () => {
  return (
    <VStack
      display={['none', 'none', 'flex']}
      flexDir={'column'}
      width='fit-content'
      align='center'
      justify='flex-start'
    >
      <Image
        src='/illustrations/CTA.svg'
        w='130px'
        h='100%'
        objectFit='cover'
        marginBottom='16px'
      />
      <VStack marginBottom='20px'>
        <Heading size={'xs'}>Thinking of Adoption?</Heading>
        <Text
          fontWeight='medium'
          color='gray.500'
          fontSize={'xs'}
          textAlign={'center'}
          maxW='25ch'
        >
          Find the perfect pet for you and your family now.
        </Text>
      </VStack>
      <Button
        w='fit-content'
        variant='ghost'
        colorScheme='teal'
        fontWeight='bold'
        borderRadius={6}
        size='sm'
        py={4}
        minW='180px'
      >
        Adopt Now
      </Button>
    </VStack>
  );
};
export const SideFiltersColumn: React.FC<{
  handleSelectType: (type: MissingPostTypes) => void;
}> = ({ handleSelectType }) => {
  const { data } = useMeQuery({ fetchPolicy: 'cache-only' });
  const user = data?.me;
  return (
    <Flex
      w='100%'
      flexDirection={['row', 'column']}
      h={['fit-content', 'calc(100vh - 8rem)']}
      align='flex-start'
      justify='space-between'
      maxW={['100%', '200px']}
      position={['relative', 'relative', 'relative', 'relative', 'fixed']}
    >
      <MissingPageTaps handleSelectType={handleSelectType} />
      {!user ? null : (
        <Box
          h='100%'
          w='100%'
          pos='relative'
          display={['none', 'none', 'none', 'none', 'block']}
          textAlign='left'
        >
          <Button
            as={Box}
            variant='ghost'
            w='100%'
            pos='absolute'
            bottom='1rem'
            rounded={'full'}
            h='64px'
            cursor='pointer'
            onClick={() => router.push('/profile')}
          >
            <HStack w='100%' justify={'space-evenly'}>
              <UserAvatar
                avatarProps={{ size: 'sm' }}
                name={user.displayName}
                avatarURL={user.avatar?.url}
              />
              <VStack
                align='flex-start'
                spacing={1}
                display={['none', 'none', 'none', 'flex']}
              >
                <Text
                  fontWeight={'semibold'}
                  color='inherit'
                  fontSize='sm'
                  isTruncated
                >
                  {user.displayName}
                </Text>
                <Text
                  fontSize={'xs'}
                  color='gray.500'
                  isTruncated
                  noOfLines={1}
                  maxW='20ch'
                >
                  {user.email}
                </Text>
              </VStack>
            </HStack>
          </Button>
        </Box>
      )}
    </Flex>
  );
};
