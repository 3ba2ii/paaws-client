import {
  FormControl,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { Field, FieldProps, useField } from 'formik';
import React, {
  Component,
  ComponentType,
  InputHTMLAttributes,
  ReactChildren,
} from 'react';

type GenericFormikFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  component:
    | string
    | React.ComponentType<FieldProps<any>>
    | React.ComponentType
    | React.ForwardRefExoticComponent<any>;
  textarea?: boolean;
  helperText?: string;
  required?: boolean;
  showLength?: boolean;
  maxInputLength?: number;
  formErrorMessageProps?: FormErrorMessageProps;
};
const GenericFormikField: React.FC<GenericFormikFieldProps> = ({
  component,
  label,
  required,
  helperText,
  formErrorMessageProps,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl
      isInvalid={!!error && touched}
      isRequired={required}
      pos='relative'
    >
      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>
      <Field
        {...props}
        {...field}
        component={component}
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
export default GenericFormikField;
