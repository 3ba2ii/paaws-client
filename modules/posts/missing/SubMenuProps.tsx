import { Stack } from '@chakra-ui/layout';
import {
  forwardRef,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuList,
  MenuOptionGroup,
  MenuOptionGroupProps,
  Portal,
  Radio,
} from '@chakra-ui/react';
import { DateFilters, LocationFilters } from 'generated/graphql';
import React from 'react';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';

interface SubMenuProps {
  handleAddDateFilter: (filter: DateFilters) => void;
  options: {
    key: string;
    value: DateFilters;
  }[];
  checked: DateFilters | LocationFilters | null;
  buttonText: string;
  menuButtonProps?: MenuButtonProps;
  menuOptionGroupProps?: MenuOptionGroupProps;
}
export const FilterSubMenu = forwardRef<SubMenuProps, any>(
  (
    {
      handleAddDateFilter,
      buttonText,
      menuButtonProps,
      menuOptionGroupProps,
      options,
      checked,
    },
    ref
  ) => {
    return (
      <Menu placement='right-start'>
        <MenuButton ref={ref} {...menuButtonProps}>
          {buttonText}
        </MenuButton>
        <Portal appendToParentPortal>
          <MenuList>
            <MenuOptionGroup opacity={0.5} {...menuOptionGroupProps}>
              <Stack pl={4}>
                {options.map(({ key, value }) => (
                  <Radio
                    key={key}
                    value={value}
                    onClick={() => handleAddDateFilter(value)}
                    fontSize={'sm'}
                    cursor={'pointer'}
                    isChecked={checked === value}
                  >
                    {capitalizeTheFirstLetterOfEachWord(value)}
                  </Radio>
                ))}
              </Stack>
            </MenuOptionGroup>
          </MenuList>
        </Portal>
      </Menu>
    );
  }
);
