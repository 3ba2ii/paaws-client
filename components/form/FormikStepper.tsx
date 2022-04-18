import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import React, { useState } from 'react';

interface FormikStepperProps {}

const FormikStepper: React.FC<FormikConfig<FormikValues>> = ({
  children,
  ...props
}) => {
  const [step, setStep] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const currentChildren = childrenArray[step];

  return (
    <Formik {...props}>
      <Form>{currentChildren}</Form>
    </Formik>
  );
};
export default FormikStepper;
