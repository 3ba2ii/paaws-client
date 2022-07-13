import { EditableProps } from '@chakra-ui/react';
import { FormikProps } from 'formik';

export type UpdateUserDataType = {
  full_name: string;
  bio: string;
  avatar: string | null;
  email: string;
};

export type EditableFieldsType = {
  key: keyof UpdateUserDataType;
  label: string;
  name: string;
  onSubmit: (formikProps: FormikProps<UpdateUserDataType>) => void;
  onAbort: (formikProps: FormikProps<UpdateUserDataType>) => void;
  onCancel: (formikProps: FormikProps<UpdateUserDataType>) => void;
  helperText?: string;
  textarea?: boolean;
  editableProps?: EditableProps;
};
