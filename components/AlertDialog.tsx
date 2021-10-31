import {
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export const CustomAlertDialog: React.FC<{
  header: string;
  body: string;
  includeFooter: boolean;
  cancelText?: string;
  confirmText?: string;
  isOpen: boolean;
}> = ({
  header,
  body,
  cancelText,
  confirmText,
  includeFooter = false,
  isOpen = false,
}) => {
  const { onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          {header && <AlertDialogHeader>{header}</AlertDialogHeader>}
          <AlertDialogCloseButton />
          {body && <AlertDialogBody>{body}</AlertDialogBody>}
          {includeFooter && (
            <AlertDialogFooter>
              {cancelText && (
                <Button ref={cancelRef} onClick={onClose}>
                  {cancelText}
                </Button>
              )}
              {confirmText && (
                <Button colorScheme='red' onClick={onClose} ml={3}>
                  {confirmText}
                </Button>
              )}
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
