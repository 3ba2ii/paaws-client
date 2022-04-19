import {
  FormControl,
  FormErrorMessage,
  FormErrorMessageProps,
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
  formErrorMessageProps?: FormErrorMessageProps;
};
const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _size,
  textarea,
  helperText,
  required = true,
  showLength,
  maxInputLength,
  formErrorMessageProps,
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
        placeholder={props.placeholder}
        id={field.name}
      />

      {helperText ? (
        <FormHelperText maxW='45ch'>{helperText}</FormHelperText>
      ) : null}

      {error && touched ? (
        <FormErrorMessage
          fontSize='13px'
          maxW='45ch'
          {...formErrorMessageProps}
        >
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default React.memo(InputField);
