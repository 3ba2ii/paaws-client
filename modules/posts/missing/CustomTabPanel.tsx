import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/react';
import React from 'react';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';
import { FiltersTypes } from './PostsOptions';

interface CustomTabPanelProps {
  handleChange: (filter: FiltersTypes) => void;
  options: {
    key: string;
    value: FiltersTypes;
  }[];
  checked: FiltersTypes | null;
}
export const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
  handleChange,
  options,
  checked,
}) => {
  const onChange = (val: FiltersTypes) => {
    handleChange(val);
  };
  return (
    <RadioGroup size={'sm'} fontWeight={'normal'} onChange={onChange}>
      <Stack>
        {options.map(({ key, value }) => (
          <Radio
            key={key}
            value={value}
            cursor={'pointer'}
            isChecked={checked === value}
          >
            {capitalizeTheFirstLetterOfEachWord(value)}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
