import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const Heading: ComponentStyleConfig = {
  baseStyle: {
    color: 'gray.700',
    _dark: {
      color: 'gray.300',
    },
  },
};

const theme = extendTheme({
  colors: {
    black: '#16161D',
  },

  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['3.052rem'],
      fontWeight: 'bold',
      lineHeight: '1.5',
      color: 'gray.700',
    },
    h2: {
      fontSize: ['2.441rem'],
      fontWeight: 'semibold',
      lineHeight: '1.5',
      color: 'gray.700',
    },

    h3: {
      fontSize: '1.953rem',
      fontWeight: 'semibold',
      lineHeight: '1.5',
      color: 'gray.700',
    },

    h4: {
      fontSize: '1.563rem',
      fontWeight: 'semibold',
      lineHeight: '1.5',
      color: 'gray.700',
    },

    h5: {
      fontSize: '1.25rem',
      fontWeight: 'semibold',
      lineHeight: '1.5',
      color: 'gray.700',
    },
    p1: {
      color: 'gray.500',
      fontWeight: 'medium',
      fontSize: '1rem',
      lineHeight: '1.6',
    },
    p2: {
      color: 'gray.500',
      fontWeight: 'medium',
      fontSize: '0.8rem',
    },
    p3: {
      color: 'gray.500',
      fontWeight: '400',
      fontSize: '0.8rem',
      lineHeight: '1.5',
    },
    label: {
      color: 'gray.600',
      fontWeight: '600',
      fontSize: '.85rem',
    },
    link: {
      color: 'blue.500',
      _dark: { color: 'blue.400' },
    },
    helperText: {
      color: 'gray.500',
      fontWeight: '400',
      fontSize: '.85rem',
      lineHeight: '1.5',
    },
  },
  breakpoints,
  components: { Heading },
});

export default theme;
