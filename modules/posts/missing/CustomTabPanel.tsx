import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { DateFilters } from 'generated/graphql';
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
          {capitalizeTheFirstLetterOfEachWord(value)}
        </Radio>
      ))}
    </Stack>
  );
};
