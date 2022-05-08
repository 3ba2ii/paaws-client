import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export const StepIndicator: React.FC<{
  isActive: boolean;
  icon: ReactElement;
  title: string;
  subtitle: string;
  step: number;
}> = ({ isActive, icon, title, subtitle }) => {
  return (
    <Box
      w='100%'
      background={
        isActive
          ? 'linear-gradient(269.54deg, #37A29C 0.4%, #EB78FE 99.68%)'
          : 'gray.100'
      }
      borderRadius={'8px'}
      overflow='hidden'
      p={'2px'}
      boxShadow='sm'
      maxW='320px'
    >
      <Button
        w='100%'
        h='fit-content'
        leftIcon={
          <Center
            boxSize={'40px'}
            bg='rgba(196,196,196,.4)'
            borderRadius={'full'}
          >
            {icon}
          </Center>
        }
        p={4}
        whiteSpace='break-spaces'
        textAlign={'left'}
        iconSpacing={3}
        borderRadius={'6px'}
        bg='whiteAlpha.800'
      >
        <VStack w='100%' align={'flex-start'} spacing={1}>
          <Text lineHeight={'1.5'} fontWeight={'semibold'} fontSize='16px'>
            {title}
          </Text>
          <Text
            textAlign={'left'}
            textStyle={'p1'}
            fontSize='14px'
            w='100%'
            lineHeight={'1.5'}
          >
            {subtitle}
          </Text>
        </VStack>
      </Button>
    </Box>
  );
};
