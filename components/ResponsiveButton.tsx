import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

interface ResponsiveButtonProps {
  onClick: () => void;
  icon: React.ReactElement;
  label: string;
  buttonProps?: ButtonProps | IconButtonProps;
}

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  icon,
  onClick,
  label,
  buttonProps,
}) => {
  const ButtonOrIconButton = useBreakpointValue({
    base: (
      <Tooltip label={label}>
        <IconButton
          variant='ghost'
          icon={icon}
          onClick={onClick}
          aria-label={label}
          {...buttonProps}
        />
      </Tooltip>
    ),
    sm: (
      <Button
        variant='ghost'
        leftIcon={icon}
        onClick={onClick}
        {...buttonProps}
      >
        {label}
      </Button>
    ),
  });
  return <>{ButtonOrIconButton}</>;
};
export default ResponsiveButton;
