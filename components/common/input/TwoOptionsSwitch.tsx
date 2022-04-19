import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonProps,
  HStack,
  StackProps,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

type TwoOptionsSwitchProps = ButtonProps & {
  options: {
    label: string;
    value: string;
  }[];
  handleChange: (value: any) => void;
  activeValue?: any;
  stackProps?: StackProps;
};

const TwoOptionsSwitch: React.FC<TwoOptionsSwitchProps> = ({
  handleChange,
  options,
  activeValue = '',
  stackProps,
  ...props
}) => {
  const bgActiveColor = useColorModeValue('teal.500', 'teal.900');

  return (
    <HStack h='100%' {...stackProps}>
      {options.map(({ label, value }, _index) => {
        const isActive = value === activeValue;
        return (
          <Button
            {...props}
            key={value}
            colorScheme={isActive ? 'teal' : 'gray'}
            onClick={() => handleChange(value)}
            leftIcon={isActive ? <CheckIcon /> : undefined}
            bgColor={isActive ? bgActiveColor : 'transparent'}
          >
            {label}
          </Button>
        );
      })}
    </HStack>
  );
};
export default TwoOptionsSwitch;
