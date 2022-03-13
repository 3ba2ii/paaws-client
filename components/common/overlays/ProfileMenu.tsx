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
import UserAvatar from 'components/UserAvatar';
import { useLogoutMutation } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import router from 'next/router';
import React from 'react';
import {
  BiCreditCard,
  BiHeart,
  BiLogOut,
  BiMoon,
  BiUserCircle,
} from 'react-icons/bi';
import { LoadingComponent } from '../loading/LoadingSpinner';

interface ProfileMenuProps {}

const ProfileMenu: React.FC<ProfileMenuProps> = ({}) => {
  const { user, loading } = useIsAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    try {
      const success = await logout({
        update: (cache, { data: res }) => {
          if (!res) return;
          cache.evict({});
        },
      });

      if (success) {
        router.push('/');
      }
    } catch {}
  };
  return (
    <Menu placement='bottom-end'>
      <MenuButton w='fit-content' px={0}>
        {user ? (
          <UserAvatar
            name={user.displayName}
            avatarURL={user.avatar?.url || undefined}
            avatarProps={{ size: 'sm' }}
          />
        ) : loading ? (
          <LoadingComponent />
        ) : null}
      </MenuButton>

      <MenuList>
        <MenuGroup title='Profile'>
          <MenuItem icon={<BiUserCircle size={'18px'} />}>My Profile</MenuItem>
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
            <HStack w='100%' justify='space-between'>
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
