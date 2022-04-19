import { Box, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import InputFieldWrapper from 'components/common/input/CustomInputComponent';
import InputField from 'components/common/input/InputField';
import SelectComponent, {
  MyOptionType,
} from 'components/common/input/SelectFieldComponent';
import TwoOptionsSwitch from 'components/common/input/TwoOptionsSwitch';
import { FormikProps } from 'formik';
import React from 'react';
import { CreatePetInputType } from 'types';
import {
  PetBreedsObj,
  PetColorObj,
  PetGenderObj,
  PetSizeObj,
  PetTypeObj,
} from 'utils/constants/enums';

export interface StepProps {
  formik: FormikProps<CreatePetInputType>;
}

const TellUsMoreStep: React.FC<StepProps> = ({ formik }) => {
  return (
    <VStack align={'flex-start'} w='100%' p='32px' spacing={'32px'}>
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
        <InputField
          id='pet-name'
          value={formik.values.name}
          label='Pet Name'
          name='name'
          autoFocus
          placeholder='Kitty Cat'
          formErrorMessageProps={{
            pos: 'absolute',
            bottom: '-24px',
          }}
        />
        <InputFieldWrapper label='Pet Type' name='type'>
          <SelectComponent
            options={PetTypeObj}
            selectProps={{
              name: 'type',
              placeholder: 'Dog',
              hideSelectedOptions: true,
              value: PetTypeObj.find((x) => x.value === formik.values.type),
            }}
            handleChange={(value: MyOptionType) => {
              formik.setFieldValue('type', value.value);
            }}
          />
        </InputFieldWrapper>
      </HStack>
      <HStack w='100%' spacing={'24px'}>
        <InputFieldWrapper label='Breeds' name='breeds'>
          <SelectComponent
            options={PetBreedsObj}
            selectProps={{
              name: 'breeds',
              placeholder: 'Bulldog, Huskey',
              value: formik.values.breeds?.map((x) => {
                return PetBreedsObj.find((y) => y.value === x);
              }),
            }}
            handleChange={(values) => {
              formik.setFieldValue(
                'breeds',
                values.map((v: MyOptionType) => v.value)
              );
            }}
            isMulti
          />
        </InputFieldWrapper>
        <InputFieldWrapper label='Colors' name='colors'>
          <SelectComponent
            options={PetColorObj}
            selectProps={{
              name: 'colors',
              placeholder: 'Black, White',
              value: formik.values.colors?.map((x) => {
                return PetColorObj.find((y) => y.value === x);
              }),
            }}
            handleChange={(values) => {
              formik.setFieldValue(
                'colors',
                values.map((v: MyOptionType) => v.value)
              );
            }}
            isMulti
          />
        </InputFieldWrapper>
      </HStack>
      <Box w='calc(50% - 12px)'>
        <InputFieldWrapper label='Size' name='size'>
          <SelectComponent
            options={PetSizeObj}
            handleChange={(value: MyOptionType) =>
              formik.setFieldValue('size', value.value)
            }
            selectProps={{
              name: 'size',
              hideSelectedOptions: true,
              placeholder: 'Large',
              value: PetSizeObj.find((x) => x.value === formik.values.size),
            }}
          />
        </InputFieldWrapper>
      </Box>
      <InputFieldWrapper label='Gender' name='gender'>
        <TwoOptionsSwitch
          options={PetGenderObj}
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
      </InputFieldWrapper>
    </VStack>
  );
};
export default TellUsMoreStep;
