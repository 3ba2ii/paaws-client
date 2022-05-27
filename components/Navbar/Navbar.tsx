import { Button } from '@chakra-ui/button';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import navbarStyles from 'styles/navbar.module.css';
import withApollo from 'utils/withApollo';
import Logo from '../Logo';
import { NavBarItems } from './NavbarItems';

const NavBar = () => {
  return (
    <Box
      id='navbar-container'
      className={navbarStyles['navbar-container']}
      style={{
        background: 'inherit',
      }}
    >
      <Logo />
      <NavBarItems />
    </Box>
  );
};

export default withApollo(NavBar);
