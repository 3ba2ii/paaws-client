import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
} from '@chakra-ui/modal';
import React from 'react';

type GenericModalProps = {
  title?: string | JSX.Element | React.ReactChildren;
  body: string | JSX.Element | React.ReactChildren;
  isOpen: boolean;
  onClose: VoidFunction;
  handleSubmit?: VoidFunction;
  footer?: string | JSX.Element | React.ReactChildren;
  confirmText?: string;
  cancelText?: string;
  modalProps?: ModalProps;
  modalBodyProps?: ModalBodyProps;
  modalHeaderProps?: ModalHeaderProps;
};

const GenericModal = ({
  isOpen,
  handleSubmit,
  onClose,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  body,
  title,
  footer,
  modalProps,
  modalBodyProps,
  modalHeaderProps,
}: GenericModalProps) => {
  return (
    <>
      <Modal {...modalProps} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {title && (
            <ModalHeader {...modalHeaderProps} textAlign='center'>
              {title}
            </ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody {...modalBodyProps}>{body}</ModalBody>

          <ModalFooter>
            {footer ? (
              footer
            ) : (
              <>
                <Button mr={3} variant='ghost' onClick={onClose}>
                  {cancelText}
                </Button>
                <Button w={'100%'} colorScheme='teal' onClick={handleSubmit}>
                  {confirmText}
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenericModal;
