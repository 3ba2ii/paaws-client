import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  Switch,
  SwitchProps,
} from '@chakra-ui/react';
import React from 'react';

interface CustomSwitchProps {
  handleChange: (checked: boolean) => void;
  label?: string;
  checked: boolean;
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  switchProps?: SwitchProps;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  handleChange,
  label,
  checked,
  formLabelProps,
  switchProps,
  formControlProps,
}) => {
  return (
    <FormControl display='flex' alignItems='center' {...formControlProps}>
      {label && (
        <FormLabel mb='0' {...formLabelProps}>
          {label}
        </FormLabel>
      )}
      <Switch
        isChecked={checked}
        onChange={(e) => handleChange(e.target.checked)}
        {...switchProps}
      />
    </FormControl>
  );
};
export default CustomSwitch;
