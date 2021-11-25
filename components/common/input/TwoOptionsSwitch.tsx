import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonProps,
  HStack,
  useColorModePreference,
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
};

const TwoOptionsSwitch: React.FC<TwoOptionsSwitchProps> = ({
  handleChange,
  options,
  activeValue = '',
  ...props
}) => {
  const bgActiveColor = useColorModeValue('teal.50', 'teal.900');

  return (
    <HStack>
      {options.map(({ label, value }, index) => {
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