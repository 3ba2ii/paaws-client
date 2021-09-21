import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import React from 'react';

type ModalProps = {
  title?: string | JSX.Element | React.ReactChildren;
  body: string | JSX.Element | React.ReactChildren;
  isOpen: boolean;
  onClose: VoidFunction;
  handleSubmit?: VoidFunction;
  confirmText?: string;
  cancelText?: string;
};

const GenericModal = ({
  isOpen,
  handleSubmit,
  onClose,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  body,
  title,
}: ModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {title && <ModalHeader textAlign='center'>{title}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>

          <ModalFooter>
            <Button mr={3} variant='ghost' onClick={onClose}>
              {cancelText}
            </Button>
            <Button w={'100%'} colorScheme='teal' onClick={handleSubmit}>
              {confirmText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenericModal;
