import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface GenericInputComponentProps {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
}

const GenericInputComponent: React.FC<GenericInputComponentProps> = ({
  label,
  required = true,
  helperText,
  children,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={!!error && touched} isRequired={required}>
      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>
      {children}
      {helperText ? (
        <FormHelperText maxW='45ch'>{helperText}</FormHelperText>
      ) : null}

      {error && touched ? (
        <FormErrorMessage maxW='45ch'>{error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default GenericInputComponent;
