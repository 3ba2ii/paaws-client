import { Button } from '@chakra-ui/react';
import { Form, Formik, FormikConfig, FormikProps, FormikValues } from 'formik';
import React from 'react';
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

  return (
    <Form>
      {currentChild}
      <Button
        onClick={() => {
          setStep(Math.min(step + 1, childrenArray.length - 1));
        }}
        type='submit'
      >
        {isLastStep() ? 'Finish' : 'Next'}
      </Button>
    </Form>
  );
};

export default FormikStepper;
