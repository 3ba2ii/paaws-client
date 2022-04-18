import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import InputHOC from 'components/common/input/CustomInputComponent';
import InputField from 'components/common/input/InputField';
import SelectComponent from 'components/common/input/SelectFieldComponent';
import TwoOptionsSwitch from 'components/common/input/TwoOptionsSwitch';
import FormikStep from 'components/form/FormikStep';
import FormikStepper from 'components/form/FormikStepper';
import { Formik, useFormik } from 'formik';
import { Breeds, PetColors, PetGender, PetType } from 'generated/graphql';
import React from 'react';

interface AddUserOwnedPetFormProps {}

const AddUserOwnedPetForm: React.FC<AddUserOwnedPetFormProps> = ({}) => {
  const [step, setStep] = React.useState(0);
  return (
    <SimpleGrid w='100%' h='100%' gridTemplateColumns={'1.5fr 3fr'}>
      <VStack p='40px' bg='red'>
        <Text>STEPPER</Text>
      </VStack>
      <Formik
        initialValues={{
          name: null,
          type: null,
          breeds: [],
          colors: [],
          gender: null,
          birthDate: null,
          size: null,
          about: null,
          skills: [],
          images: [],
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {(formik) => (
          <FormikStepper formikProps={formik} step={step} setStep={setStep}>
            <FormikStep>
              <VStack align={'flex-start'} w='100%' p='32px' spacing={'24px'}>
                <Box>
                  <Heading fontSize={'24px'} size='lg' color='gray.700'>
                    Tell us more about your pet
                  </Heading>
                  <Text textStyle='p1'>
                    Please fill the sections below to let us know more about
                    your lovely pet.
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
                      isMulti
                    />
                  </InputHOC>
                  <InputHOC label='Colors' name='colors'>
                    <SelectComponent
                      options={Object.entries(PetColors).map(
                        ([label, value]) => {
                          return { label, value };
                        }
                      )}
                      selectProps={{ name: 'colors' }}
                      isMulti
                    />
                  </InputHOC>
                </HStack>
                <InputHOC label='Gender' name='gender'>
                  <TwoOptionsSwitch
                    options={Object.entries(PetGender).map(([label, value]) => {
                      return { label, value };
                    })}
                    handleChange={(value) =>
                      formik.setFieldValue('gender', value)
                    }
                    activeValue={formik.values.gender}
                  />
                </InputHOC>
                <InputField label='Birthdate' name='birthDate' type={'date'} />
              </VStack>
            </FormikStep>
            <VStack>
              <InputField label='About' name='about' />
            </VStack>
          </FormikStepper>
        )}
      </Formik>
    </SimpleGrid>
  );
};
export default AddUserOwnedPetForm;
