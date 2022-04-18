import { Box, useColorModePreference } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';
import Select, { GroupBase, Props, StylesConfig } from 'react-select';
type MyOptionType = {
  label: string;
  value: string;
};

interface SelectComponentProps {
  isMulti?: boolean;
  options: MyOptionType[];
  placeholder?: string;
  handleChange?: (value: any) => void;
  maxLimit?: number;
  selectProps?: Props;
}
type IsMulti = false;

const SelectComponent: React.FC<SelectComponentProps> = ({
  isMulti,
  options,
  handleChange,
  maxLimit,
  selectProps,
}) => {
  const { setFieldValue } = useFormikContext();

  const colorMode = useColorModePreference();

  const customSelectFieldStyles: StylesConfig<MyOptionType, IsMulti> = {
    control: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      borderColor: state.isFocused
        ? 'blue.500'
        : colorMode === 'light'
        ? 'gray.200'
        : 'gray.500',
    }),
    placeholder: (provided, _state) => ({
      ...provided,
      color: 'inherit',
    }),
    singleValue: (provided, _state) => ({
      ...provided,
      color: 'inherit',
    }),

    menu: (provided, _state) => ({
      ...provided,

      cursor: 'pointer',
      backgroundColor: 'inherit',
    }),
    option: (provided, _state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      '&:hover': {
        backdropFilter: 'brightness(115%)',
      },
    }),
    multiValue: (provided, _state) => ({
      ...provided,
      borderRadius: '4px',
      backgroundColor: colorMode === 'light' ? '#E2E8F0' : '718096',
    }),
    multiValueLabel: (provided, _state) => ({
      ...provided,
      color: 'inherit',
    }),
  };

  const onChange = handleChange
    ? handleChange
    : (newValue: any) => {
        selectProps?.name && setFieldValue(selectProps.name, newValue);
      };
  return (
    <Box>
      <Select
        {...selectProps}
        styles={
          customSelectFieldStyles as StylesConfig<
            unknown,
            boolean,
            GroupBase<unknown>
          >
        }
        onChange={onChange}
        isMulti={isMulti}
        options={options}
      />
    </Box>
  );
};
export default SelectComponent;
