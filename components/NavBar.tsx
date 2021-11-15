import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import { Menu, MenuItem, MenuList } from '@chakra-ui/menu';
import { Portal } from '@chakra-ui/portal';
import { CircularProgress } from '@chakra-ui/progress';
import { MeQuery, useMeQuery } from 'generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import navbarStyles from 'styles/navbar.module.css';
import { isServer } from 'utils/isServer';
import withApollo from 'utils/withApollo';
import { DarkModeSwitch } from './DarkModeSwitch';
import { UserAvatar } from './UserAvatar';

function JoinUsNavbarItems(
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
      <DarkModeSwitch />
    </Flex>
  );
}

interface UserDropdownProps {
  userInfo: MeQuery | undefined;
}
const UserDropdownMenu: React.FC<UserDropdownProps> = ({ userInfo }) => {
  return (
    <Menu>
      <UserAvatar avatarProps={{ size: 'sm' }} />
      <Portal>
        <MenuList>
          <MenuItem>My Profile</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem>Open Closed Tab</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
const NavBarItems = () => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });

  const [mounted, setMounted] = useState(false);
  const { pathname } = useRouter();

  const isLoginScreen = pathname.includes('/login');
  const isRegisterScreen = pathname.includes('/register');

  let body;
  if (isLoginScreen || isRegisterScreen) {
    //set body to Register or Login
    body = JoinUsNavbarItems(isRegisterScreen, isLoginScreen);
    //return body
    return body;
  }

  // then its a regular page and we have two cases
  // 1. user is authenticated -> Show his information along side with the navbar items
  // 2. user not authenticated -> show the navbar items without his info and add Join Us Button
  body = (
    <section className={navbarStyles['nav-items-container']}>
      <div className={navbarStyles['search-input-field-styles']}>
        <InputGroup alignItems='center' justify='center' maxW={420}>
          <InputLeftElement
            px={7}
            pb={1}
            pointerEvents='none'
            children={<SearchIcon color='gray.500' />}
          />
          <Input
            shadow='base'
            pl={12}
            rounded='lg'
            variant='filled'
            placeholder='Search for pets, people or anything...'
            size='sm'
            height='34px'
          />
        </InputGroup>
      </div>
      <nav className={navbarStyles['nav-items']}>
        <Link href='/explore'>
          <li>Explore</li>
        </Link>
        <Link href='/missing'>
          <li>Missing Pets</li>
        </Link>
        <Link href='/adoption'>
          <li aria-expanded='true'>Adoption</li>
        </Link>
        {loading ? (
          <LoadingComponent />
        ) : data?.me?.id ? (
          <>
            <Link href='/favorites'>
              <li aria-expanded='true'>My Favorites</li>
            </Link>
            <UserDropdownMenu userInfo={data} />
          </>
        ) : (
          <Link href='/register'>
            <Button leftIcon={<FaHeart color='red' />} size='sm'>
              Join us
            </Button>
          </Link>
        )}
        <DarkModeSwitch />
      </nav>
    </section>
  );

  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? body : null;
};
const NavBar = () => {
  const logo = useColorModeValue('light', 'dark');

  return (
    <nav
      id='navbar-container'
      className={navbarStyles['navbar-container']}
      style={{
        background: 'inherit',
        boxShadow: useColorModeValue(
          '0 0 2px rgba(0, 0, 0, 0.1)',
          '0 0 2px rgba(255, 255,255, 0.05)'
        ),
      }}
    >
      <Link href='/'>
        <Image
          tabIndex={0}
          role='img'
          className={navbarStyles['logo-container']}
          cursor='pointer'
          src={`/images/logo-${logo}.svg`}
          alt='paaws'
          maxW='90px'
        />
      </Link>

      <NavBarItems />
    </nav>
  );
};

const LoadingComponent = (): JSX.Element | null => {
  /*
   Code that is only supposed to run in the browser should be executed inside useEffect. 
   That's required because the first render should match the initial render of the server. 
   If you manipulate that result it creates a mismatch and React won't be able to hydrate the page successfully.
   When you run browser only code (like trying to access window) inside useEffect, it will happen after hydration 👍 */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <CircularProgress size='20px' isIndeterminate color='gray.700' />
  ) : null;
};

export default withApollo(NavBar);
