import { Box } from '@chakra-ui/layout';
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
