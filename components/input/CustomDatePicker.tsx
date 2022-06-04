import { useColorMode } from '@chakra-ui/color-mode';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa';

interface CustomDatePickerProps {
  name: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  helperText?: string;
  defaultValue?: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  placeholder,
  helperText,
  required = true,
  defaultValue,
  ...props
}) => {
  const isLight = useColorMode().colorMode === 'light'; //you can check what theme you are using right now however you want
  const [field, { error, touched }] = useField(props);
  const form = useFormikContext();

  const onChange = (value: any) => {
    console.log(field.name);
    form.setFieldValue(field.name, new Date(value));
  };

  return (
    <FormControl isInvalid={!!error && touched} isRequired={required}>
      <FormLabel fontSize='sm' htmlFor={field.name}>
        {label}
      </FormLabel>

      <div className={isLight ? 'light-theme' : 'dark-theme'}>
        <DatePicker
          selected={field.value}
          placeholderText={placeholder}
          onChange={onChange}
          className='react-datapicker__input-text' //input is white by default and there is no already defined class for it so I created a new one
          {...props}
        />
        <div className='calendar-icon'>
          <FaRegCalendarAlt />
        </div>
      </div>

      {helperText ? (
        <FormHelperText maxW='45ch'>
          <Text textStyle='helperText'>{helperText}</Text>
        </FormHelperText>
      ) : null}
      {error && touched ? (
        <FormErrorMessage maxW='45ch'>{error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default CustomDatePicker;
