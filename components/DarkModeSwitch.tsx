import { IconButton, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const DarkModeSwitch = () => {
  const [mounted, setMounted] = React.useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? (
    <IconButton
      aria-label='mode-switch'
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      size='sm'
    />
  ) : null;
};
