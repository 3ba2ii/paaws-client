import {
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import UserAvatar from 'components/common/UserAvatar';
import { useAuth } from 'hooks/useAuth';
import { useRequireAuth } from 'hooks/useRequireAuth';
import router from 'next/router';
import {
  BiChevronDown,
  BiCreditCard,
  BiHeart,
  BiLogOut,
  BiMoon,
  BiUserCircle,
} from 'react-icons/bi';
import { LoadingComponent } from '../common/loading/LoadingSpinner';

const ProfileMenu = () => {
  useRequireAuth();
  const { signout, user, isLoadingUserInfo: loading } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const onLogout = async () => {
    signout();
  };
  if (loading) return <LoadingComponent />;
  if (!user) return null;
  return (
    <Menu placement='bottom-end'>
      <MenuButton w='fit-content' px={0}>
        {user ? (
          <HStack spacing={1}>
            <UserAvatar
              name={user.displayName}
              avatarURL={user.avatar?.url || undefined}
              avatarProps={{ size: 'sm' }}
            />
            <BiChevronDown />
          </HStack>
        ) : loading ? (
          <LoadingComponent />
        ) : null}
      </MenuButton>

      <MenuList>
        <MenuGroup title='Profile'>
          <MenuItem
            icon={<BiUserCircle size={'18px'} />}
            onClick={() => router.push(`/profile/${user.id}`)}
          >
            My Profile
          </MenuItem>
          <MenuItem icon={<BiHeart size={'18px'} />}>Favorites</MenuItem>
          <MenuItem icon={<BiCreditCard size='18px' />}>Payments </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title='Display'>
          <MenuItem
            icon={<BiMoon size='18px' />}
            onClick={toggleColorMode}
            closeOnSelect={false}
          >
            <HStack w='100%' justifyContent='space-between'>
              <Text>Dark Mode</Text>
              <Switch
                id='toggle-dark-mode-switch'
                size='sm'
                isChecked={colorMode === 'dark'}
              />
            </HStack>
          </MenuItem>
        </MenuGroup>
        <MenuDivider />

        <MenuItem
          icon={<BiLogOut size={'18px'} />}
          onClick={onLogout}
          closeOnSelect={false}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ProfileMenu;
