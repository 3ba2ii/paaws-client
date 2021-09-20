import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

/* const AppleButton = {
  // style object for base or default style
  baseStyle: (props: any) => ({
    bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
  }),
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for `size` and `variant`
  defaultProps: {
    size: '',
    variant: '',
  },
}; */

const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  breakpoints,
});

export default theme;
