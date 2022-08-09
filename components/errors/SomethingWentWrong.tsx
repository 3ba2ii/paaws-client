import { Heading, VStack, Text, StackProps } from '@chakra-ui/react';
import React from 'react';

interface SomethingWentWrongProps {
    layoutProps?: StackProps;
}

const SomethingWentWrong: React.FC<SomethingWentWrongProps> = ({layoutProps}) => {
  return (
    <VStack w='100%' h='100%' alignItems={'center'} justifyContent='center' {...layoutProps}>
      <Heading size='4xl'>😕</Heading>
      <Heading>An error occurred</Heading>
      <Text textAlign='center' textStyle='p1'>
        Its not you, its us. Something went wrong with our servers, <br />
        Please try again later
      </Text>
    </VStack>
  );
};
export default SomethingWentWrong;
