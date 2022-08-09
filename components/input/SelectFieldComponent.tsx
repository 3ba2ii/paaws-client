import { Box, useColorMode } from '@chakra-ui/react';
import React from 'react';
import Select, { GroupBase, Props, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { MyOptionType } from 'types';
import { getSelectStyle } from 'utils/helpers/getSelectStyle';

const animatedComponents = makeAnimated();

interface SelectComponentProps {
  isMulti?: boolean;
  options: MyOptionType[];
  placeholder?: string;
  handleChange?: (value: any) => void;
  maxLimit?: number;
  selectProps?: Props;
}
export type IsMulti = false;

const SelectComponent: React.FC<SelectComponentProps> = ({
  isMulti,
  options,
  handleChange,
  selectProps,
}) => {
  const { colorMode } = useColorMode();

  const customSelectFieldStyles = getSelectStyle(colorMode);

  return (
    <Box w='100%' h='100%'>
      <Select
        styles={
          customSelectFieldStyles as StylesConfig<
            unknown,
            boolean,
            GroupBase<unknown>
          >
        }
        components={animatedComponents}
        onChange={handleChange}
        isMulti={isMulti}
        options={options}
        {...selectProps}
      />
    </Box>
  );
};
export default SelectComponent;
