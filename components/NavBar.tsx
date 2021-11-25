import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import { Menu, MenuItem, MenuList } from '@chakra-ui/menu';
import { Portal } from '@chakra-ui/portal';
import { MeQuery, useMeQuery } from 'generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import navbarStyles from 'styles/navbar.module.css';
import { isServer } from 'utils/isServer';
import withApollo from 'utils/withApollo';
import { LoadingComponent } from './common/loading/LoadingSpinner';
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
        passHref
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
          <InputLeftElement px={7} pb={1} pointerEvents='none'>
            <SearchIcon color='gray.500' />
          </InputLeftElement>
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
        <Link passHref={true} href='/explore'>
          Explore
        </Link>
        <Link passHref href='/missing'>
          Missing Pets
        </Link>
        <Link passHref={true} href='/adoption'>
          Adoption
        </Link>
        {loading ? (
          <LoadingComponent />
        ) : data?.me?.id ? (
          <>
            <Link passHref={true} href='/favorites'>
              My Favorites
            </Link>
            <UserDropdownMenu userInfo={data} />
          </>
        ) : (
          <Link passHref={true} href='/register'>
            <Button leftIcon={<FaHeart color='red' />} size='sm'>
              Join us
            </Button>
          </Link>
        )}
        <DarkModeSwitch />
      </nav>
    </section>
  );

  return body;
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
      <Link passHref href='/'>
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

export default withApollo(NavBar);
