import { useColorModeValue } from '@chakra-ui/react';
import { StylesConfig } from 'react-select';
import { MyOptionType } from '../types/MyOptionType';
import { IsMulti } from '../components/common/input/SelectFieldComponent';

export const getSelectStyle = (
  colorMode: 'light' | 'dark'
): StylesConfig<MyOptionType, IsMulti> => {
  const colors = {
    controlBorderColor: useColorModeValue('gray.200', 'gray.500'),
    menuBG: useColorModeValue('white', '#1A202C'),
  };

  return {
    control: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      borderColor: state.isFocused ? 'blue.500' : colors.controlBorderColor,
    }),
    placeholder: (provided, _state) => ({
      ...provided,
      color: '#A0AEC0',
    }),
    singleValue: (provided, _state) => ({
      ...provided,
      color: 'inherit',
      fontSize: '1rem',
    }),

    menu: (provided, _state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: colors.menuBG,
    }),
    option: (provided, _state) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: 'inherit',
      '&:hover': {
        backdropFilter: 'brightness(95%)',
      },
    }),
    multiValue: (provided, _state) => ({
      ...provided,
      borderRadius: '6px',
      paddingInlineStart: '6px',
      backgroundColor: colorMode === 'light' ? '#E2E8F0' : '#718096',
      fontSize: '1rem',
    }),

    multiValueLabel: (provided, _state) => ({
      ...provided,
      color: 'inherit',
    }),
  };
};
