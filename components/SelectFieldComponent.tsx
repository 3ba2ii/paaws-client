import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Select, { Props } from 'react-select';

interface SelectComponentProps {
  isMulti?: boolean;
  options: any[];
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
  const customSelectFieldStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      borderColor: state.isSelected
        ? 'blue.500'
        : useColorModeValue('gray.200', 'gray.500'),
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: '#cbd5e0',
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      '&:hover': {
        backdropFilter: 'brightness(115%)',
      },
    }),
    multiValue: (provided: any, state: any) => ({
      ...provided,
      borderRadius: '4px',
      backgroundColor: useColorModeValue('#E2E8F0', '#718096'),
    }),
    multiValueLabel: (provided: any, state: any) => ({
      ...provided,
      color: 'inherit',
    }),
  };

  return (
    <Box>
      <Select
        {...selectProps}
        styles={customSelectFieldStyles}
        onChange={handleChange}
        isMulti={isMulti}
        options={options}
        maxMenuHeight={200}
      />
    </Box>
  );
};
export default SelectComponent;
