import {
  MenuButtonProps,
  ButtonProps,
  MenuOptionGroupProps,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Text,
  MenuProps,
} from '@chakra-ui/react';
import { capitalizeString } from 'utils/capitalizeString';

type DropdownMenuProps = {
  options: Array<{ key: string; value: string }>;
  menuButtonText: string;
  handleChange: (value: any) => void;
  menuProps?: MenuProps;
  menuButtonProps?: MenuButtonProps | ButtonProps;
  menuOptionGroupProps?: MenuOptionGroupProps;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  menuButtonText,
  handleChange,
  menuProps,
  menuButtonProps,
  menuOptionGroupProps,
  ...props
}) => {
  return (
    <Menu {...menuProps}>
      <MenuButton {...menuButtonProps}>{menuButtonText}</MenuButton>
      <MenuList>
        <MenuOptionGroup {...menuOptionGroupProps}>
          {options.map(({ key, value }) => (
            <MenuItemOption
              key={key}
              value={value}
              onClick={() => handleChange(value)}
            >
              <Text fontWeight={'medium'}>{capitalizeString(value)}</Text>
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
