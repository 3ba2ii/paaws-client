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
const InputField = React.memo<InputFieldProps>(
  ({
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
    const handleChange = React.useCallback(field.onChange, [field]);
    const handleBlur = React.useCallback(field.onBlur, [field]);

    const MemoizedInputComponent = React.useMemo(() => {
      return (
        <Component
          {...props}
          {...field}
          onChange={handleChange}
          onBlur={handleBlur}
          borderWidth='1.5px'
          placeholder={props.placeholder}
          id={field.name}
        />
      );
    }, [field.value, field.name]);

    const MaxInputLengthAlert = React.useMemo(() => {
      const fieldLength = field.value?.length;
      if (
        !showLength ||
        !maxInputLength ||
        !fieldLength ||
        fieldLength < maxInputLength - 15
      )
        return null;
      return (
        <Text
          fontSize='sm'
          color='red.400'
          pos='absolute'
          top='0'
          right='0'
        >{`${maxInputLength - field.value.length}`}</Text>
      );
    }, [field.value, maxInputLength, showLength]);

    return (
      <FormControl
        isInvalid={!!error && touched}
        isRequired={required}
        pos='relative'
      >
        <FormLabel fontSize='sm' htmlFor={field.name}>
          {label}
        </FormLabel>
        {MaxInputLengthAlert}
        {MemoizedInputComponent}
        {helperText ? (
          <FormHelperText maxW='45ch'>{helperText}</FormHelperText>
        ) : null}

        {error && touched ? (
          <FormErrorMessage maxW='45ch'>{error}</FormErrorMessage>
        ) : null}
      </FormControl>
    );
  }
);

export default InputField;
