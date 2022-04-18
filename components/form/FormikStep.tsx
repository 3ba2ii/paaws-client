import { FormikConfig, FormikValues } from 'formik';
import React from 'react';

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {}

const FormikStep: React.FC<FormikStepProps> = ({ children }) => {
  return <>{children}</>;
};

export default FormikStep;
