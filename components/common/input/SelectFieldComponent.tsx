import {
  Box,
  useColorModePreference,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';
import Select, { GroupBase, Props, StylesConfig } from 'react-select';

export type MyOptionType = {
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
  selectProps,
}) => {
  const colorMode = useColorModePreference();

  const colors = {
    controlBorderColor: useColorModeValue('gray.200', 'gray.500'),
    placeholder: 'gray.500',
    menuBG: useColorModeValue('white', 'gray.900'),
  };

  const customSelectFieldStyles: StylesConfig<MyOptionType, IsMulti> = {
    control: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      borderColor: state.isFocused ? 'blue.500' : colors.controlBorderColor,
    }),
    placeholder: (provided, _state) => ({
      ...provided,
      color: '#718096',
    }),
    singleValue: (provided, _state) => ({
      ...provided,
      color: 'inherit',
    }),

    menu: (provided, _state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: colors.menuBG,
    }),
    option: (provided, _state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      '&:hover': {
        backdropFilter: 'brightness(95%)',
      },
    }),
    multiValue: (provided, _state) => ({
      ...provided,
      borderRadius: '6px',
      paddingInlineStart: '6px',
      backgroundColor: colorMode === 'light' ? '#E2E8F0' : '#718096',
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
