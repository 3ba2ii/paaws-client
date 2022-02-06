import {
  PopoverProps,
  PopoverContentProps,
  PopoverBodyProps,
  PopoverHeaderProps,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import React from 'react';

type StringOrJSXElement = string | JSX.Element | React.ReactChildren;

interface MyPopoverProps {
  title?: StringOrJSXElement;
  body: StringOrJSXElement;
  footer?: StringOrJSXElement;
  isOpen: boolean;
  onClose: VoidFunction;
  handleSubmit?: VoidFunction;
  confirmText?: string;
  cancelText?: string;
  popoverProps?: PopoverProps;
  popoverContentProps?: PopoverContentProps;
  popoverBodyProps?: PopoverBodyProps;
  popoverHeaderProps?: PopoverHeaderProps;
}

const MyPopover: React.FC<MyPopoverProps> = ({
  isOpen,
  handleSubmit,
  onClose,
  body,
  title,
  footer,
  popoverBodyProps,
  popoverContentProps,
  popoverHeaderProps,
  popoverProps,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Popover {...popoverProps} isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent {...popoverContentProps}>
          <PopoverArrow />
          <PopoverHeader {...popoverHeaderProps}>{title}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody {...popoverBodyProps}>{body}</PopoverBody>
          <PopoverFooter>
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
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
export default MyPopover;
