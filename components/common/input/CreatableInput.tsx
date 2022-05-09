import { Box, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  ActionMeta,
  GroupBase,
  OnChangeValue,
  Props,
  StylesConfig,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { MyOptionType } from 'types/MyOptionType';
import { createOption } from 'utils/createOption';
import { getSelectStyle } from 'utils/getSelectStyle';

interface CreatableInputProps {
  options: MyOptionType[];
  onChange: (value: any) => void;
  maxLimit?: number;
  value: MyOptionType[];
  creatableProps?: Props;
}
const CreatableInput: React.FC<CreatableInputProps> = ({
  options,
  value,
  onChange,
  maxLimit,
  creatableProps,
}) => {
  const { colorMode } = useColorMode();
  const [optionsState, setOptionsState] = useState<MyOptionType[]>([
    ...options,
  ]);

  const isOverLimit = () => (maxLimit ? value.length >= maxLimit : false);

  const handleChange = (
    newValue: OnChangeValue<MyOptionType, true>,
    actionMeta: ActionMeta<MyOptionType | unknown>
  ) => {
    if (isOverLimit() && !['remove-value', 'clear'].includes(actionMeta.action))
      return;
    onChange(newValue);
  };

  const handleCreateOption = (inputValue: string) => {
    if (isOverLimit()) return;
    const newOption = createOption(inputValue);
    setOptionsState([...optionsState, newOption]);
    handleChange([...(getValue() || []), newOption], {
      action: 'create-option',
      option: newOption,
    });
  };

  const getValue = () => {
    const isMulti = creatableProps?.isMulti ?? false;
    if (isMulti) {
      return value;
    }
    return [];
  };

  const customSelectFieldStyles = getSelectStyle(colorMode);

  return (
    <Box w='100%' h='100%'>
      <CreatableSelect
        isClearable
        styles={
          customSelectFieldStyles as StylesConfig<
            unknown,
            boolean,
            GroupBase<unknown>
          >
        }
        options={optionsState}
        onChange={handleChange as any}
        onCreateOption={handleCreateOption}
        value={getValue()}
        {...creatableProps}
      />
    </Box>
  );
};
export default CreatableInput;
