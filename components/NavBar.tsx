import { Button } from '@chakra-ui/button';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import navbarStyles from 'styles/navbar.module.css';
import withApollo from 'utils/withApollo';
import Logo from './Logo';
import { NavBarItems } from './NavBarItems';

export function JoinUsNavbarItems(
  isRegisterScreen: boolean,
  isLoginScreen: boolean
): any {
  return (
    <Flex alignItems='center'>
      <Text color={'gray.500'} mr={4}>
        {isRegisterScreen
          ? 'Already a member?'
          : isLoginScreen
          ? 'Not a member?'
          : ''}
      </Text>
      <Link
        href={isRegisterScreen ? '/login' : isLoginScreen ? '/register' : '/'}
      >
        <Button
          px={6}
          variant='outline'
          mr={4}
          rightIcon={<ArrowForwardIcon />}
        >
          {isRegisterScreen ? 'Login' : isLoginScreen ? 'Register' : ''}
        </Button>
      </Link>
    </Flex>
  );
}

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
