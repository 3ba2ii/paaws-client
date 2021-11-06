import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonProps,
  ComponentWithAs,
  HStack,
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
  return (
    <HStack>
      {options.map(({ label, value }, index) => {
        const isActive = value === activeValue;
        return (
          <Button
            {...props}
            variant='outline'
            key={value}
            py={6}
            colorScheme={isActive ? 'teal' : 'gray'}
            w='100%'
            onClick={() => handleChange(value)}
            leftIcon={isActive ? <CheckIcon /> : undefined}
            bgColor={
              isActive
                ? useColorModeValue('teal.50', 'teal.900')
                : 'transparent'
            }
          >
            {label}
          </Button>
        );
      })}
    </HStack>
  );
};
export default TwoOptionsSwitch;
