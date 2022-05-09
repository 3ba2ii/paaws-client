import { Stack } from '@chakra-ui/layout';
import { Radio } from '@chakra-ui/react';
import React from 'react';
import { FiltersTypes } from 'types';
import { capitalizeFirstLetterOfEachWord } from 'utils/capitalizeString';

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
  return (
    <Stack>
      {options.map(({ key, value }) => (
        <Radio
          key={key}
          value={value}
          cursor={'pointer'}
          onClick={() => handleChange(value)}
          isChecked={value === checked}
          size='sm'
        >
          {capitalizeFirstLetterOfEachWord(value)}
        </Radio>
      ))}
    </Stack>
  );
};
