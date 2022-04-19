import { Button, HStack } from '@chakra-ui/react';
import { Form, FormikProps } from 'formik';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { FormikStepProps } from './FormikStep';
interface FormikStepperProps {
  step: number;
  setStep: (step: number) => void;
  formikProps?: FormikProps<any>;
}

const FormikStepper: React.FC<FormikStepperProps> = ({
  children,
  step,
  setStep,
}) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const currentChild = childrenArray[step];

  const isLastStep = () => step === childrenArray.length - 1;
  const isFirstStep = () => step === 0;

  return (
    <Form>
      {currentChild}
      <HStack
        w='100%'
        p='32px'
        justify={'flex-end'}
        pos='absolute'
        left='0'
        bottom={0}
      >
        <Button
          onClick={() => {
            setStep(Math.max(step - 1, 0));
          }}
          variant='ghost'
        >
          {isFirstStep() ? 'Cancel' : 'Back'}
        </Button>
        <Button
          onClick={() => {
            setStep(Math.min(step + 1, childrenArray.length - 1));
          }}
          type='submit'
          colorScheme={'teal'}
          rightIcon={<BiChevronRight size='20px' />}
        >
          {isLastStep() ? 'Finish' : 'Next'}
        </Button>
      </HStack>
    </Form>
  );
};

export default FormikStepper;
