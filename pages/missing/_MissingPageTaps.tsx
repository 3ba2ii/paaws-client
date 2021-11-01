import { Text, VStack, Box } from '@chakra-ui/layout';
import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import { MissingPostTypes } from 'generated/graphql';
import React, { useState } from 'react';

interface TapsProps {
  label: string;
  types: MissingPostTypes;
}
export const MissingPageTaps: React.FC<{
  handleSelectFilter: (type: MissingPostTypes) => void;
}> = ({ handleSelectFilter }) => {
  /* This component will have 4 basic taps at first
    1. Missing Pets Only
    2. Found Pets
    3. Rescued Pets
    4. All Pets
  */
  const [selectedTap, setSelectedTap] = useState<number>(0);
  const buttons: TapsProps[] = [
    {
      label: 'All Pets',
      types: MissingPostTypes.Missing,
    },
    {
      label: 'Missing Pets',
      types: MissingPostTypes.Missing,
    },
    {
      label: 'Found Pets',
      types: MissingPostTypes.Found,
    },
    {
      label: 'Rescued Pets',
      types: MissingPostTypes.Missing,
    },
  ];
  const handleSelectTap = (index: number) => {
    setSelectedTap(index);
    handleSelectFilter(buttons[index].types);
  };
  return (
    <VStack
      w='100%'
      align='flex-start'
      css={{
        button: {
          width: '100%',
          textAlign: 'left',
        },
      }}
    >
      <ButtonGroup
        w='100%'
        flexDir={'column'}
        align='flex-start'
        variant='unstyled'
        sx={{ gap: '8px' }}
      >
        <Text textStyle='p1' mb={4}>
          Menu
        </Text>

        {buttons.map((button, index) => (
          <SingleNavTap
            key={button.label}
            {...{ selectedTap, handleSelectTap, button, index }}
          />
        ))}
      </ButtonGroup>
    </VStack>
  );
};
const SingleNavTap: React.FC<{
  selectedTap: number;
  handleSelectTap: Function;
  button: TapsProps;
  index: number;
}> = ({ selectedTap, handleSelectTap, button, index }) => {
  return (
    <Box
      _focus={{
        border: '1px solid red',
      }}
      position='relative'
      borderRadius={4}
      overflow='hidden'
      key={button.label}
      onClick={() => handleSelectTap(index)}
      transition='background .2s ease-in-out'
      _hover={{
        background: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
      }}
      bg={
        selectedTap === index
          ? useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
          : 'transparent'
      }
      _before={
        selectedTap === index
          ? {
              content: `''`,
              position: 'absolute',
              background: useColorModeValue('teal.500', 'teal.500'),
              height: '100%',
              width: '4px',
            }
          : {}
      }
    >
      <Button pl={4}>{button.label}</Button>
    </Box>
  );
};
