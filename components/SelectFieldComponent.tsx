import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Text } from '@chakra-ui/layout';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import Select from 'react-select';

interface SelectComponentProps {
  name: string;
  isMulti?: boolean;
  options: any[];
  placeholder?: string;
  label: string;
  required?: boolean;
  helperText?: string;
}

const customSelectFieldStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isSelected ? '#3d9eff' : '#CBD5E0',
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: '#cbd5e0',
  }),
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  isMulti,
  options,
  label,
  required = true,
  helperText,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const form = useFormikContext();

  const onChange = (values: any) => {
    if (isMulti) {
      form.setFieldValue(
        props.name,
        values.map((v: any) => v.value)
      );
    } else {
      form.setFieldValue(props.name, values.value);
    }
  };

  return (
    <FormControl isInvalid={!!error && touched} isRequired={required}>
      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>
      <Select
        {...props}
        value={
          options ? options.find((option) => option.value === field.value) : ''
        }
        styles={customSelectFieldStyles}
        onChange={onChange}
        id={field.name}
        isMulti={isMulti}
        options={options}
      />
      {helperText ? (
        <FormHelperText maxW='45ch'>
          <Text textStyle='helperText'>{helperText}</Text>
        </FormHelperText>
      ) : null}
      {error && touched ? (
        <FormErrorMessage maxW='45ch'>{error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default SelectComponent;
