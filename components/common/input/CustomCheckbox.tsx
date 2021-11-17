import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, Checkbox, Tooltip } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';

interface CustomSwitchProps {
  name: string;
  defaultValue: boolean;
  label: string;
  required?: boolean;
  helperText?: string;
  helpIcon?: boolean;
}

const CustomCheckbox: React.FC<CustomSwitchProps> = ({
  defaultValue,
  label,
  required = true,
  helperText,
  helpIcon,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl
      display='flex'
      alignItems='center'
      position='relative'
      isInvalid={!!error && touched}
      isRequired={required}
    >
      <Checkbox
        mr={3}
        mb={1.5}
        size='md'
        {...field}
        {...props}
        id={field.name}
      />

      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>
      {helpIcon && helperText && (
        <Tooltip
          placement='auto-start'
          hasArrow
          label={helperText}
          bg='gray.300'
          color='gray.700'
        >
          <Box cursor='pointer' position='relative' mb={1.5}>
            <FaRegQuestionCircle color='#CBD5E0' />
          </Box>
        </Tooltip>
      )}
    </FormControl>
  );
};
export default CustomCheckbox;
