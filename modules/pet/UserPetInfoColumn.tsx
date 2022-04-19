import {
  Box,
  Heading,
  HStack,
  Link,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { UserOwnedPetQuery } from 'generated/graphql';
import React from 'react';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';
import { PetInfoCardsRow } from './PetInfoCardsRow';

interface UserPetInfoColumnProps {
  userOwnedPet: UserOwnedPetQuery['userOwnedPet'];
}

const UserPetInfoColumn: React.FC<UserPetInfoColumnProps> = ({
  userOwnedPet,
}) => {
  if (!userOwnedPet) return null;
  const { pet } = userOwnedPet;
  return (
    <Box
      display={'flex'}
      flexDir='column'
      w='100%'
      h='100%'
      align='flex-start'
      p={4}
      py={10}
      css={{ gap: '40px' }}
      overflowY='scroll'
    >
      <VStack w='100%' align='flex-start'>
        <Heading size='lg' color='gray.700'>
          {pet.name}
        </Heading>
        <HStack align='center' justify='center' spacing='4px'>
          <Text fontSize='16px' color='blue.500' fontWeight={'semibold'}>
            {capitalizeTheFirstLetterOfEachWord(pet.type)} -{' '}
          </Text>
          {pet.breeds.map((b, index) => (
            <Link
              fontSize={'16px'}
              color='blue.500'
              colorScheme={'blue'}
              fontWeight='semibold'
            >
              {capitalizeTheFirstLetterOfEachWord(
                b.breed + (index === pet.breeds.length - 1 ? '' : ',')
              )}
            </Link>
          ))}
        </HStack>
        <HStack>
          <Tag size='sm' variant='subtle' colorScheme='blue'>
            Playful
          </Tag>
          <Tag size='sm' variant='subtle' colorScheme='pink'>
            Cheerful
          </Tag>
          <Tag size='sm' variant='subtle' colorScheme='purple'>
            Ball-Catcher
          </Tag>
        </HStack>
      </VStack>
      <VStack w='100%' align='flex-start' spacing={4}>
        <Heading size='md' color='gray.700'>
          Pet Information
        </Heading>
        <PetInfoCardsRow userPet={userOwnedPet} />
      </VStack>

      <VStack align='flex-start'>
        <Heading size='md' color='gray.700'>
          About {pet.name}
        </Heading>
        <Text textStyle={'p1'} maxW='70ch' wordBreak={'break-all'}>
          {userOwnedPet.about}Quis anim exercitation est in id. Quis id
          consequat do qui. Proident quis nulla eu ex ea velit consequat amet
          consectetur proident fugiat. Reprehenderit aliquip pariatur sint qui
          proident sint ea. Ea culpa laboris cillum minim veniam voluptate amet
          nostrud deserunt. Quis anim exercitation est in id. Quis id consequat
          do qui. Proident quis nulla eu ex ea velit consequat amet consectetur
          proident fugiat. Reprehenderit aliquip pariatur sint qui proident sint
          ea. Ea culpa laboris cillum minim veniam voluptate amet nostrud
          deserunt.
        </Text>
      </VStack>
    </Box>
  );
};
export default UserPetInfoColumn;
