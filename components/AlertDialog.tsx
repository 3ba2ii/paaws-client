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
  AlertDialogProps,
  ModalHeaderProps,
  ModalBodyProps,
} from '@chakra-ui/react';
import React from 'react';

interface CustomAlertDialogProps {
  isOpen: boolean;
  header: string | JSX.Element | React.ReactChildren;
  body?: string | JSX.Element | React.ReactChildren;
  footer?: string | JSX.Element | React.ReactChildren;
  cancelText?: string;
  confirmText?: string;
  alertDialogProps?: AlertDialogProps;
  alertDialogBodyProps?: ModalBodyProps;
  alertHeaderProps?: ModalHeaderProps;
  handleConfirm: VoidFunction;
  handleCancel: VoidFunction;
}

export const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  header,
  body,
  cancelText,
  confirmText,
  footer,
  isOpen = false,
  alertDialogProps,
  alertDialogBodyProps,
  alertHeaderProps,
  handleConfirm,
  handleCancel,
}) => {
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset='scale'
        leastDestructiveRef={cancelRef}
        onClose={handleCancel}
        isOpen={isOpen}
        isCentered
        {...alertDialogProps}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          {header && (
            <AlertDialogHeader {...alertHeaderProps}>
              {header}
            </AlertDialogHeader>
          )}
          {body && (
            <AlertDialogBody {...alertDialogBodyProps}>{body}</AlertDialogBody>
          )}

          <AlertDialogFooter>
            {footer ? (
              footer
            ) : (
              <>
                <Button size='sm' mr={3} variant='ghost' onClick={handleCancel}>
                  {cancelText}
                </Button>
                <Button size='sm' colorScheme='red' onClick={handleConfirm}>
                  {confirmText}
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
