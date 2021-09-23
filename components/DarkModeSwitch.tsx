import { useColorMode, Switch } from '@chakra-ui/react';
import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaLightbulb, FaMoon, FaSun } from 'react-icons/fa';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <IconButton
      aria-label='mode-switch'
      onClick={toggleColorMode}
      icon={
        isDark ? (
          <FaSun color='rgba(255,255,255,.92)' />
        ) : (
          <FaMoon color='#2D3748' />
        )
      }
    />
  );
};
