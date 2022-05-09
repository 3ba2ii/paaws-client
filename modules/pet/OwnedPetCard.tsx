import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { UserOwnedPetsQuery } from 'generated/graphql';
import React from 'react';
interface IOwnedPetCardProps {
  pet: UserOwnedPetsQuery['userOwnedPets']['ownedPets'][0]['pet'];
}

export const OwnedPetCard: React.FC<IOwnedPetCardProps> = ({ pet }) => {
  const age = formatDistanceToNow(new Date(pet.birthDate));
  return (
    <Box
      w='100%'
      h='100%'
      background={`url(${pet.thumbnail?.url}), #C4C4C4;`}
      backgroundSize='cover'
      backgroundRepeat={'no-repeat'}
      backgroundPosition='center'
      css={{ boxShadow: 'inset 0px -50px 30px -11px rgba(0, 0, 0, 0.75);' }}
      p={4}
      display='flex'
      flexDir='column'
      justifyContent={'end'}
      cursor='pointer'
      _hover={{ filter: 'brightness(50%)' }}
      transition='filter .2s ease-in-out'
    >
      <Text fontSize='xl' fontWeight={'bold'} color='whiteAlpha.800'>
        {pet.name}
      </Text>
      <Text fontSize='sm' fontWeight={'semibold'} color='whiteAlpha.800'>
        {age}
      </Text>
    </Box>
  );
};
