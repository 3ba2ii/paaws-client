import { Box, useColorModeValue } from '@chakra-ui/react';
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
  handleChange: (value: any) => void;
  selectProps?: Props;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  isMulti,
  options,
  handleChange,
  selectProps,
}) => {
  type IsMulti = false;

  const customSelectFieldStyles: StylesConfig<MyOptionType, IsMulti> = {
    control: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      borderColor: state.isFocused
        ? 'blue.500'
        : useColorModeValue('gray.200', 'gray.500'),
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
      backgroundColor: useColorModeValue('#E2E8F0', '#718096'),
    }),
    multiValueLabel: (provided, _state) => ({
      ...provided,
      color: 'inherit',
    }),
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
        onChange={handleChange}
        isMulti={isMulti}
        options={options}
      />
    </Box>
  );
};
export default SelectComponent;
