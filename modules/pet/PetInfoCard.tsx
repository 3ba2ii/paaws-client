import { VStack, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { capitalizeString } from 'utils/capitalizeString';

interface PetInfoCardProps {
  label: string;
  value: string;
}

const PetInfoCard: React.FC<PetInfoCardProps> = ({ label, value }) => {
  return (
    <VStack
      align='flex-start'
      border='1px solid'
      borderColor='gray.300'
      borderRadius={'14px'}
      minW='95px'
      h='100%'
      justify={'center'}
      spacing={0}
      pl={2}
      css={{ aspectRatio: '1' }}
      cursor={['Age', 'Birthdate'].includes(label) && 'pointer'}
      bg='whiteAlpha.800'
      boxShadow={'sm'}
    >
      <Text fontSize={'90%'} color='gray.500' fontWeight={'medium'}>
        {capitalizeString(label)}
      </Text>
      <Heading noOfLines={2} fontSize={'16px'} color='gray.700'>
        {capitalizeString(value)}
      </Heading>
    </VStack>
  );
};
export default PetInfoCard;
