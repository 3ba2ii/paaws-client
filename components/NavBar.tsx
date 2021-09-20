import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import NavBarStyles from '../styles/navbar.module.css';
import { DarkModeSwitch } from './DarkModeSwitch';

interface NavBarProps {
  variant?: 'logged-in' | 'not-logged-in' | 'login-page' | 'sign-up' | 'none';
}

const NavBar: React.FC<NavBarProps> = ({ variant = 'not-logged-in' }) => {
  const logo = useColorModeValue('light', 'dark');
  return (
    <nav className={NavBarStyles['navbar-container']}>
      <Image src={`/images/logo-${logo}.svg`} alt='paaws' maxW='145px' />
      <Flex alignItems='center'>
        <Text color={'gray.500'} mr={4}>
          Already a Member?
        </Text>
        <Button px={6} variant='outline' rightIcon={<ArrowForwardIcon />}>
          Login
        </Button>
        <DarkModeSwitch />
      </Flex>
    </nav>
  );
};
export default NavBar;
