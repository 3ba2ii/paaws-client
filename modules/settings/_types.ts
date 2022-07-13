import { EditableProps } from '@chakra-ui/react';
import { FormikProps } from 'formik';

export type UpdateUserDataType = {
  full_name: string;
  bio: string;
  avatar: string | null;
  email: string;
};

export type EditableFieldsType<T> = {
  key: keyof UpdateUserDataType;
  label: string;
  name: string;
  onSubmit: (formikProps: FormikProps<T>) => void;
  onAbort: (formikProps: FormikProps<T>) => void;
  onCancel: (formikProps: FormikProps<T>) => void;
  helperText?: string;
  textarea?: boolean;
  editableProps?: EditableProps;
};
