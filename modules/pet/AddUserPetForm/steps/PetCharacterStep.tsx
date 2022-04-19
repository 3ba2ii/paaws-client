import { VStack } from '@chakra-ui/react';
import InputField from 'components/common/input/InputField';
import React from 'react';
import { StepProps } from './TellUsMoreStep';

const PetCharacterStep: React.FC<StepProps> = ({ formik }) => {
  return (
    <VStack>
      <InputField label='About' name='about' textarea />
    </VStack>
  );
};
export default PetCharacterStep;
