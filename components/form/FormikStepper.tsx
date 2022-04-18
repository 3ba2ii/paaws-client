import { Button } from '@chakra-ui/react';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import React from 'react';
import { FormikStepProps } from './FormikStep';
interface FormikStepperProps {
  step: number;
  setStep: (step: number) => void;
  formikProps: FormikConfig<FormikValues>;
}

const FormikStepper: React.FC<FormikStepperProps> = ({
  children,
  step,
  setStep,
  formikProps,
}) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const currentChildren = childrenArray[step];

  const isLastStep = () => step === childrenArray.length - 1;

  return (
    <Formik
      {...formikProps}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await formikProps.onSubmit(values, helpers);
        } else {
          setStep(step + 1);
        }
      }}
      validationSchema={currentChildren?.props?.validationSchema}
    >
      <Form>
        {currentChildren}
        <Button
          onClick={() => {
            setStep(Math.max(step + 1, childrenArray.length - 1));
          }}
        >
          {isLastStep() ? 'Finish' : 'Next'}
        </Button>
      </Form>
    </Formik>
  );
};
export default FormikStepper;
