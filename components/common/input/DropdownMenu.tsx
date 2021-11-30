import {
  ButtonProps,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  MenuOptionGroupProps,
  MenuProps,
  Text,
} from '@chakra-ui/react';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';

type DropdownMenuProps = {
  options: Array<{ key: string; value: string }>;
  menuButtonText: string;
  handleChange: (value: any) => void;
  menuProps?: MenuProps;
  menuButtonProps?: MenuButtonProps & ButtonProps;
  menuOptionGroupProps?: MenuOptionGroupProps;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  menuButtonText,
  handleChange,
  menuProps,
  menuButtonProps,
  menuOptionGroupProps,
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
              <Text fontWeight={'medium'}>
                {capitalizeTheFirstLetterOfEachWord(value)}
              </Text>
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
