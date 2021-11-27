import { Box, Flex, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import { MissingPostTypes } from 'generated/graphql';
import React, { useEffect, useState } from 'react';

interface TapsProps {
  label: string;
  types: MissingPostTypes;
}
const buttons: TapsProps[] = [
  {
    label: 'All Pets',
    types: MissingPostTypes.All,
  },
  {
    label: 'Missing Pets',
    types: MissingPostTypes.Missing,
  },
  {
    label: 'Found Pets',
    types: MissingPostTypes.Found,
  },
];
export const MissingPageTaps: React.FC<{
  handleSelectType: (type: MissingPostTypes) => void;
}> = ({ handleSelectType }) => {
  /* This component will have 4 basic taps at first
    1. Missing Pets Only
    2. Found Pets
    3. Rescued Pets
    4. All Pets
  */
  const [selectedTap, setSelectedTap] = useState<number>(0);

  const handleSelectTap = (index: number) => {
    setSelectedTap(index);
  };
  useEffect(() => {
    handleSelectType(buttons[selectedTap].types);
  }, [selectedTap]);

  return (
    <Box
      w='100%'
      display={'flex'}
      flexDir={['row', 'column']}
      align='flex-start'
      justifyContent={['center', 'flex-start']}
      flexWrap='wrap'
      sx={{ gap: '12px' }}
      flex='1'
      mt={['0', '2.5rem']}
    >
      {buttons.map((button, index) => (
        <SingleNavTap
          key={button.label}
          {...{ selectedTap, handleSelectTap, button, index }}
        />
      ))}
    </Box>
  );
};
const SingleNavTap: React.FC<{
  selectedTap: number;
  handleSelectTap: Function;
  button: TapsProps;
  index: number;
}> = ({ selectedTap, handleSelectTap, button, index }) => {
  const isActive = React.useMemo(
    () => selectedTap === index,
    [selectedTap, index]
  );
  return (
    <Box
      w={['128px', '100%']}
      position='relative'
      borderRadius={4}
      key={button.label + index}
      overflow={'hidden'}
      onClick={() => handleSelectTap(index)}
      transition='background .2s ease-in-out'
      color={isActive ? 'teal.500' : 'inherit'}
      _hover={{
        background: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
      }}
      bg={
        isActive
          ? useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
          : 'transparent'
      }
      _before={
        isActive
          ? {
              content: `''`,
              position: 'absolute',
              background: useColorModeValue('teal.500', 'teal.500'),
              height: ['4px', '100%'],
              width: ['100%', '4px'],
              bottom: [0, 'unset'],
            }
          : {}
      }
    >
      <Button
        w='100%'
        paddingInlineStart={1}
        px={[2, 4]}
        h='40px'
        fontSize='sm'
        textAlign={['center', 'left']}
        fontWeight={isActive ? 'bold' : 'semibold'}
        variant='unstyled'
      >
        {button.label}
      </Button>
    </Box>
  );
};
