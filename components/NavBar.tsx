import { Button } from '@chakra-ui/button';
import { ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import { MeQuery, useMeQuery } from 'generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHeart } from 'react-icons/fa';
import navbarStyles from 'styles/navbar.module.css';
import { isServer } from 'utils/isServer';
import withApollo from 'utils/withApollo';
import { LoadingComponent } from './common/loading/LoadingSpinner';
import ProfileMenu from './common/overlays/ProfileMenu';
import Logo from './Logo';

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
    </Flex>
  );
}

interface UserDropdownProps {
  userInfo: MeQuery | undefined;
}

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
        <Link href='/explore'>Explore</Link>
        <Link href='/missing'>Missing Pets</Link>
        <Link href='/adoption'>Adoption</Link>
        {loading ? (
          <LoadingComponent />
        ) : data?.me?.id ? (
          <>
            <Link href='/favorites'>My Favorites</Link>
            <ProfileMenu />
          </>
        ) : (
          <Link href='/register'>
            <Button leftIcon={<FaHeart color='red' />} size='sm'>
              Join us
            </Button>
          </Link>
        )}
      </nav>
    </section>
  );

  return body;
};
const NavBar = () => {
  return (
    <nav
      id='navbar-container'
      className={navbarStyles['navbar-container']}
      style={{
        background: 'inherit',
      }}
    >
      <Logo />

      <NavBarItems />
    </nav>
  );
};

export default withApollo(NavBar);
