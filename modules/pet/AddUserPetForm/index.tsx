import { Box, Grid, useColorModeValue, VStack } from '@chakra-ui/react';
import FormikStep from 'components/form/FormikStep';
import FormikStepper from 'components/form/FormikStepper';
import { Formik } from 'formik';
import {
  PetGender,
  PetSize,
  PetType,
  useCreateUserOwnedPetMutation,
} from 'generated/graphql';
import React, { ReactElement } from 'react';
import { BiHash, BiUpload } from 'react-icons/bi';
import { MdContentPaste } from 'react-icons/md';
import { CreatePetInputType } from 'types';
import PetCharacterStep from './steps/PetCharacterStep';
import { StepIndicator } from './steps/StepIndicator';
import TellUsMoreStep from './steps/TellUsMoreStep';
import UploadPetImagesStep from './steps/UploadPetImagesStep';

import * as Yup from 'yup';

export const Step1ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Name should not exceed 50 characters')
    .required('Please provide a name for your pet.'),

  type: Yup.mixed()
    .oneOf(Object.values(PetType), 'Invalid pet type!')
    .required('Please provide a valid pet type.'),

  breeds: Yup.array()
    .min(1, 'Please provide at least one breed')
    .max(4, 'Pet breeds can not be more than 4')
    .required('Required!'),
  colors: Yup.array()
    .min(1, 'Please provide at least one color for your pet')
    .max(4, 'Pet colors can not be more than 4')
    .required('Required!'),

  gender: Yup.mixed()
    .oneOf(Object.values(PetGender), 'Invalid pet gender!')
    .required('Required!'),
  size: Yup.mixed()
    .oneOf(Object.values(PetSize), 'Invalid pet size!')
    .required('Required!'),
});
export const Step2ValidationSchema = Yup.object().shape({
  about: Yup.string()
    .min(100, 'About should be at least 100 characters')
    .required('Please add a description of your pet.'),

  birthDate: Yup.date().required('Required!'),
});

export const Step3ValidationSchema = Yup.object().shape({
  images: Yup.array().required('Required!'),
});

const FormStepsContent: {
  icon: ReactElement;
  title: string;
  subtitle: string;
}[] = [
  {
    icon: <MdContentPaste size='20px' />,
    title: 'Tell us more about your pet',
    subtitle: 'Give us more info about your pet',
  },
  {
    icon: <BiHash size='22px' />,
    title: 'Add character to your pet',
    subtitle: 'Make your pet stand out',
  },
  {
    icon: <BiUpload size='22px' />,
    title: 'Upload your pet’s images ',
    subtitle: 'Show us the beauty of your pet',
  },
];

const AddUserOwnedPetForm: React.FC = ({}) => {
  const [createUserPet] = useCreateUserOwnedPetMutation();
  const [step, setStep] = React.useState(0);
  const bgColor = useColorModeValue('#ddd2', 'gray.900');

  const buildValidationSchema = () => {
    switch (step) {
      case 0:
        return Step1ValidationSchema;
      case 1:
        return Step1ValidationSchema.concat(Step2ValidationSchema);

      case 2:
        return Step1ValidationSchema.concat(Step2ValidationSchema).concat(
          Step3ValidationSchema
        );

      default:
        return Yup.object().shape({});
    }
  };
  return (
    <Grid
      w='100%'
      h='100%'
      gridTemplateColumns={'minmax(400px, 1fr) 3fr'}
      pos='relative'
    >
      <VStack
        py='32px'
        bg={bgColor}
        boxShadow='base'
        borderRight={'1px solid'}
        borderColor='gray.50'
        w='100%'
        h='100%'
        gridColumn={'1 / 2'}
        position='relative'
      >
        <VStack h='fit-content' pos='relative' spacing={'40px'}>
          {FormStepsContent.map((sc, index) => (
            <StepIndicator
              key={index}
              icon={sc.icon}
              step={index}
              isActive={index === step}
              title={sc.title}
              subtitle={sc.subtitle}
              onClick={() => setStep(index)}
            />
          ))}
        </VStack>
      </VStack>
      <Box w='100%' h='100%' gridColumn={'2 / 3'}>
        <Formik
          initialValues={{} as CreatePetInputType}
          onSubmit={async ({ images, ...petInfo }) => {
            if (
              Object.values({ images, ...petInfo }).some(
                (x) => x == null || x == undefined
              )
            )
              return alert('Please fill all the fields');
            await createUserPet({
              variables: {
                images,
                petInfo: {
                  ...petInfo,
                  thumbnailIdx: petInfo.thumbnailIdx || 0,
                },
              },
            });
          }}
          isInitialValid={false}
          validationSchema={buildValidationSchema()}
        >
          {(formik) => (
            <FormikStepper formikProps={formik} step={step} setStep={setStep}>
              <FormikStep>
                <TellUsMoreStep formik={formik} />
              </FormikStep>
              <FormikStep>
                <PetCharacterStep formik={formik} />
              </FormikStep>

              <FormikStep>
                <UploadPetImagesStep formik={formik} />
              </FormikStep>
            </FormikStepper>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};
export default AddUserOwnedPetForm;
