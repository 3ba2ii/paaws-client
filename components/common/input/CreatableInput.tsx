import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ActionMeta, OnChangeValue, Props } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { MyOptionType } from 'types/MyOptionType';
import { createOption } from 'utils/createOption';

interface CreatableInputProps {
  options: MyOptionType[];
  onChange: (value: any) => void;
  value?: MyOptionType[];
  creatableProps?: Props;
}
const CreatableInput: React.FC<CreatableInputProps> = ({
  options,
  value,
  onChange,
  creatableProps,
}) => {
  const [optionsState, setOptionsState] = useState<MyOptionType[]>([
    ...options,
  ]);

  const handleChange = (
    newValue: OnChangeValue<MyOptionType, true>,
    actionMeta: ActionMeta<MyOptionType | unknown>
  ) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(actionMeta);
    console.groupEnd();
    onChange(newValue);
  };

  const handleCreateOption = (inputValue: string) => {
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

  return (
    <Box w='100%' h='100%'>
      <CreatableSelect
        isClearable
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
