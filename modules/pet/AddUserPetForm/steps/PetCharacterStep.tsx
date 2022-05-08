import { Box, Text, Heading, VStack } from '@chakra-ui/react';
import CreatableInput from 'components/common/input/CreatableInput';
import InputFieldWrapper from 'components/common/input/CustomInputComponent';
import InputField from 'components/common/input/InputField';
import React from 'react';
import { MyOptionType } from 'types/MyOptionType';
import { StepProps } from './TellUsMoreStep';

const PetCharacterStep: React.FC<StepProps> = ({ formik }) => {
  return (
    <VStack align='flex-start' w='100%' h='100%' p={'32px'} spacing='24px'>
      <Box>
        <Heading fontSize={'24px'} size='lg' color='gray.700'>
          Add character to your pet
        </Heading>
        <Text textStyle='p1'>
          Make your pet stand out from the crowd. Tell us a little bit about
        </Text>
      </Box>
      <InputField
        label='About'
        name='about'
        textarea
        placeholder='Meet Charlie! She is a ball-catching superstar who loves sports and spending time with friend...'
      />
      <Box w='calc(50% - 12px)'>
        <InputField
          id='birthdate'
          label='Birthdate'
          name='birthDate'
          type={'date'}
          color='gray.500'
        />
      </Box>
      <Box w='calc(50% - 12px)'>
        <InputFieldWrapper
          label='Skills'
          name='skills'
          helperText='Add some skills to your pet with a maximum of 5 skills per pet'
        >
          <CreatableInput
            options={[]}
            onChange={(values) => {
              formik.setFieldValue(
                'skills',
                values.map((v: MyOptionType) => v.value)
              );
            }}
            value={
              formik.values.skills?.map((s) => {
                return { label: s, value: s } as MyOptionType;
              }) || []
            }
            creatableProps={{
              isMulti: true,
              placeholder: 'Funny, Cute, Smart, etc',
            }}
            maxLimit={5}
          />
        </InputFieldWrapper>
      </Box>
    </VStack>
  );
};
export default PetCharacterStep;
