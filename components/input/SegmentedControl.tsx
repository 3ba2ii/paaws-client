import { Button, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { OptionTypeWithEnums } from 'types';

interface SegmentedControlProps {
  options: OptionTypeWithEnums<any>[];
  onChange: (value: OptionTypeWithEnums<any>) => void;
  selectedValue: OptionTypeWithEnums<any>;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <ButtonGroup spacing={0} w='100%'>
      {options.map((option, index) => {
        const isFirst = index === 0;
        const isLast = index === options.length - 1;
        return (
          <Button
            key={option.value}
            colorScheme={selectedValue.value === option.value ? 'teal' : 'gray'}
            onClick={() => onChange(option)}
            borderTopLeftRadius={isFirst ? 6 : 'inherit'}
            borderBottomLeftRadius={isFirst ? 6 : 'inherit'}
            borderTopRightRadius={isLast ? 6 : 'inherit'}
            borderBottomRightRadius={isLast ? 6 : 'inherit'}
            boxShadow='base'
            leftIcon={
              selectedValue.value === option.value ? (
                <BiCheck size='24px' />
              ) : undefined
            }
            minW='100px'
          >
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
export default SegmentedControl;
