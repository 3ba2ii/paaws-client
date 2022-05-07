import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type GenericInputComponentProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
};

const InputFieldWrapper: React.FC<GenericInputComponentProps> = ({
  label,
  required = true,
  helperText,
  children,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl
      pos='relative'
      isInvalid={!!error && touched}
      isRequired={required}
      h='fit-content'
    >
      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>
      {children}
      {helperText ? (
        <FormHelperText maxW='60ch' lineHeight={'1.5'}>
          {helperText}
        </FormHelperText>
      ) : null}

      {error && touched ? (
        <Text
          textStyle={'p2'}
          pos='absolute'
          color='red.500'
          bottom={'-26px'}
          display='block'
          fontSize={'13px'}
          maxW='60ch'
        >
          {error}
        </Text>
      ) : null}
    </FormControl>
  );
};
export default InputFieldWrapper;
