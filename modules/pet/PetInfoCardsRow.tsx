import { Box, HStack } from '@chakra-ui/react';
import { format, formatDistanceToNow } from 'date-fns';
import { UserOwnedPetQuery } from 'generated/graphql';
import React, { useEffect } from 'react';
import PetInfoCard from './PetInfoCard';

export const PetInfoCardsRow: React.FC<{
  userPet: UserOwnedPetQuery['userOwnedPet'];
}> = ({ userPet }) => {
  const [cardsInfo, setCardsInfo] =
    React.useState<{ label: string; value: string }[]>();
  const [isAgeShown, setIsAgeShown] = React.useState(false);

  const toggleShowAge = () => {
    setIsAgeShown(!isAgeShown);
  };

  useEffect(() => {
    if (!userPet?.pet) return;
    const { gender, birthDate, size, colors } = userPet.pet;
    setCardsInfo([
      { label: 'Gender', value: gender },
      {
        label: isAgeShown ? 'Age' : 'Birthdate',
        value: isAgeShown
          ? formatDistanceToNow(new Date(birthDate))
          : format(new Date(birthDate), 'dd.MM.yy'),
      },
      { label: 'Size', value: size },
      { label: 'Colors', value: colors.map((c) => c.color).join(', ') },
    ]);
  }, [isAgeShown]);

  return (
    <HStack h='88px' w='100%' overflow='auto'>
      {cardsInfo?.map((ci, index) => (
        <Box
          key={index}
          w='100%'
          h='100%'
          onClick={() =>
            ['Age', 'Birthdate'].includes(ci.label) && toggleShowAge()
          }
        >
          <PetInfoCard {...ci} />
        </Box>
      ))}
    </HStack>
  );
};
