import { Box, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
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
        <InputField label='Pet Name' name='name' placeholder='Kitty Cat' />
        <InputHOC label='Pet Type' name='type'>
          <SelectComponent
            options={Object.entries(PetType).map(([label, value]) => {
              return { label, value };
            })}
            selectProps={{
              name: 'type',
              placeholder: 'Dog',
              hideSelectedOptions: true,
            }}
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
            selectProps={{ name: 'breeds', placeholder: 'Bulldog, Huskey' }}
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
            selectProps={{ name: 'colors', placeholder: 'Black, White' }}
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
      <Box w='calc(50% - 12px)'>
        <InputHOC label='Size' name='size'>
          <SelectComponent
            options={Object.entries(PetSize).map(([label, value]) => {
              return { label, value };
            })}
            handleChange={(value: MyOptionType) =>
              formik.setFieldValue('size', value.value)
            }
            selectProps={{
              name: 'size',
              hideSelectedOptions: true,
              placeholder: 'Large',
            }}
          />
        </InputHOC>
      </Box>
      <InputHOC label='Gender' name='gender'>
        <TwoOptionsSwitch
          options={Object.entries(PetGender)
            .reverse()
            .map(([label, value]) => {
              return { label, value };
            })}
          handleChange={(value) => formik.setFieldValue('gender', value)}
          activeValue={formik.values.gender}
          stackProps={{
            divider: <Divider w='1px' h='20px' bg='gray.300' />,
            bg: 'gray.100',
            borderRadius: '6px',
            w: 'fit-content',
            boxShadow: 'md',
            spacing: '10px',
            border: '1px solid',
            borderColor: 'gray.100',
          }}
        />
      </InputHOC>
    </VStack>
  );
};
export default TellUsMoreStep;
