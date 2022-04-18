import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface TellUsMoreStepProps {}

const TellUsMoreStep: React.FC<TellUsMoreStepProps> = ({}) => {
  return (
    <VStack w='100%' h='100%' align='flex-start'>
      <Heading size='lg' color='gray.700'>
        Tell us more about your pet
      </Heading>
      <Text textStyle='p1'>
        Please fill the sections below to let us know more about your lovely
        pet.
      </Text>
    </VStack>
  );
};
export default TellUsMoreStep;
