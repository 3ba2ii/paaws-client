import { Button, IconButton } from '@chakra-ui/button';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { useMeQuery } from 'generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { BiBell } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import navbarStyles from 'styles/navbar.module.css';
import { isServer } from 'utils/isServer';
import { LoadingComponent } from './common/loading/LoadingSpinner';
import ProfileMenu from './common/overlays/ProfileMenu';
import { DarkModeSwitch } from './DarkModeSwitch';
import { JoinUsNavbarItems } from './NavBar';

export const NavBarItems = () => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });

  const { pathname } = useRouter();
  const isLoginScreen = pathname.includes('/login');
  const isRegisterScreen = pathname.includes('/register');

  const isLoggedIn: boolean = !!data?.me?.id;

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
    <Box as='main' className={navbarStyles['nav-items-container']}>
      <Box className={navbarStyles['search-input-field-styles']}>
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
      </Box>
      <Box as='section' className={navbarStyles['nav-items']}>
        <Link href='/explore'>Explore</Link>
        <Link href='/missing'>Missing Pets</Link>
        <Link href='/adoption'>Adoption Pets</Link>
        {loading ? (
          <LoadingComponent />
        ) : isLoggedIn ? (
          <>
            <IconButton
              aria-label='Notifications'
              icon={<BiBell size='18px' />}
              variant='flushed'
            />
            <ProfileMenu />
          </>
        ) : (
          <DarkModeSwitch />
        )}
      </Box>
    </Box>
  );

  return body;
};
