import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Text } from '@chakra-ui/react';
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
  showLength?: boolean;
  maxInputLength?: number;
};
const InputField: React.FC<InputFieldProps> = ({
  label,
  size,
  textarea,
  helperText,
  required = true,
  showLength,
  maxInputLength,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  const Component = textarea ? Textarea : Input;

  const MaxInputLengthAlert = () => {
    const fieldLength = field.value?.length;
    if (
      !showLength ||
      !maxInputLength ||
      !fieldLength ||
      fieldLength < maxInputLength - 15
    )
      return null;
    return (
      <Text fontSize='sm' color='red.400' pos='absolute' top='0' right='0'>{`${
        maxInputLength - field.value.length
      }`}</Text>
    );
  };
  return (
    <FormControl
      isInvalid={!!error && touched}
      isRequired={required}
      pos='relative'
    >
      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>
      <MaxInputLengthAlert />
      <Component
        {...props}
        {...field}
        borderWidth='1.5px'
        id={field.name}
        placeholder={props.placeholder}
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
