import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export const CustomDrawer: React.FC<{
  isOpen: boolean;
  onClose: VoidFunction;
  drawerHeader: string;
  drawerBody: ReactElement;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  drawerProps?: DrawerProps;
}> = ({
  isOpen,
  onClose,
  drawerHeader,
  drawerBody,
  drawerProps,
  size = 'md',
}): ReactElement => {
  return (
    <Drawer {...drawerProps} onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{drawerHeader}</DrawerHeader>
        <DrawerBody>{drawerBody}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
