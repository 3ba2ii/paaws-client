import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  textarea?: boolean;
  helperText?: string;
  required?: boolean;
};
const InputField: React.FC<InputFieldProps> = ({
  label,
  size,
  textarea,
  helperText,
  required = true,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  const Component = textarea ? Textarea : Input;

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Component
        {...props}
        {...field}
        borderWidth='1.5px'
        id={field.name}
        placeholder={props.placeholder}
        isRequired={required}
      />
      {helperText ? (
        <FormHelperText maxW='45ch'>{helperText}</FormHelperText>
      ) : null}

      {error && touched ? (
        <FormErrorMessage maxW='45ch'>{error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default InputField;
