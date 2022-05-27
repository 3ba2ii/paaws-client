import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import ImageWithFallback from 'components/media/ImageWithFallback';
import { formatDistanceToNow } from 'date-fns';
import { UserOwnedPetsQuery } from 'generated/graphql';
import React from 'react';
interface IOwnedPetCardProps {
  pet: UserOwnedPetsQuery['userOwnedPets']['ownedPets'][0]['pet'];
}

export const OwnedPetCard: React.FC<IOwnedPetCardProps> = ({ pet }) => {
  const age = formatDistanceToNow(new Date(pet.birthDate));
  console.log(
    `🚀 ~ file: OwnedPetCard.tsx ~ line 12 ~ pet.thumbnail?.url`,
    pet.thumbnail?.url
  );
  return (
    <Box
      w='100%'
      h='100%'
      display='flex'
      flexDir='column'
      justifyContent={'end'}
      cursor='pointer'
      _hover={{ filter: 'brightness(50%)' }}
      transition='filter .2s ease-in-out'
      pos='relative'
    >
      <Box
        css={{ boxShadow: 'inset 0px -60px 30px -11px rgba(0, 0, 0, 0.75);' }}
        zIndex={2}
        p={4}
      >
        <Text fontSize='xl' fontWeight={'bold'} color='whiteAlpha.800'>
          {pet.name}
        </Text>
        <Text fontSize='sm' fontWeight={'semibold'} color='whiteAlpha.800'>
          {age}
        </Text>
      </Box>
      <Box pos='absolute' w='100%' h='100%' zIndex={1}>
        <ImageWithFallback
          props={{
            src: pet.thumbnail?.url || '#C4C4C4',
            alt: pet.name,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            quality: 20,
            loading: 'lazy',
          }}
          fallbackSrc='#C4C4C4'
        />
      </Box>
    </Box>
  );
};
