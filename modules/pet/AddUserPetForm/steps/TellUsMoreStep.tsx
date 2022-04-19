import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import InputHOC from 'components/common/input/CustomInputComponent';
import InputField from 'components/common/input/InputField';
import SelectComponent, {
  MyOptionType,
} from 'components/common/input/SelectFieldComponent';
import TwoOptionsSwitch from 'components/common/input/TwoOptionsSwitch';
import { FormikProps } from 'formik';
import {
  Breeds,
  PetColors,
  PetGender,
  PetSize,
  PetType,
} from 'generated/graphql';
import React from 'react';
import { CreatePetInputType } from 'types';

export interface StepProps {
  formik: FormikProps<CreatePetInputType>;
}

const TellUsMoreStep: React.FC<StepProps> = ({ formik }) => {
  return (
    <VStack align={'flex-start'} w='100%' p='32px' spacing={'24px'}>
      <Box>
        <Heading fontSize={'24px'} size='lg' color='gray.700'>
          Tell us more about your pet
        </Heading>
        <Text textStyle='p1'>
          Please fill the sections below to let us know more about your lovely
          pet.
        </Text>
      </Box>
      <HStack w='100%' spacing={'24px'}>
        <InputField label='Pet Name' name='name' />
        <InputHOC label='Pet Type' name='type'>
          <SelectComponent
            options={Object.entries(PetType).map(([label, value]) => {
              return { label, value };
            })}
            selectProps={{ name: 'type' }}
            handleChange={(value) => {
              formik.setFieldValue('type', value.value);
            }}
          />
        </InputHOC>
      </HStack>
      <HStack w='100%' spacing={'24px'}>
        <InputHOC label='Breeds' name='breeds'>
          <SelectComponent
            options={Object.entries(Breeds).map(([label, value]) => {
              return { label, value };
            })}
            selectProps={{ name: 'breeds' }}
            handleChange={(values) => {
              formik.setFieldValue(
                'breeds',
                values.map((v: MyOptionType) => v.value)
              );
            }}
            isMulti
          />
        </InputHOC>
        <InputHOC label='Colors' name='colors'>
          <SelectComponent
            options={Object.entries(PetColors).map(([label, value]) => {
              return { label, value };
            })}
            selectProps={{ name: 'colors' }}
            handleChange={(values) => {
              formik.setFieldValue(
                'colors',
                values.map((v: MyOptionType) => v.value)
              );
            }}
            isMulti
          />
        </InputHOC>
      </HStack>
      <InputHOC label='Gender' name='gender'>
        <TwoOptionsSwitch
          options={Object.entries(PetGender).map(([label, value]) => {
            return { label, value };
          })}
          handleChange={(value) => formik.setFieldValue('gender', value)}
          activeValue={formik.values.gender}
        />
      </InputHOC>

      <InputField label='Birthdate' name='birthDate' type={'date'} />
      <InputHOC label='Size' name='size'>
        <SelectComponent
          options={Object.entries(PetSize).map(([label, value]) => {
            return { label, value };
          })}
          handleChange={(value: MyOptionType) =>
            formik.setFieldValue('size', value.value)
          }
        />
      </InputHOC>
    </VStack>
  );
};
export default TellUsMoreStep;
