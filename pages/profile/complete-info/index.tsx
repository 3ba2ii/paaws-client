import {
  Box,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  VStack,
} from '@chakra-ui/react';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import React from 'react';
import withApollo from 'utils/withApollo';

type CompleteInfoSteps = 'location' | 'phone' | 'avatar' | 'personalInfo';

const CompleteInfo: React.FC = () => {
  const [steps, setSteps] = React.useState<{
    [key in CompleteInfoSteps]: boolean;
  }>({
    location: false,
    phone: false,
    avatar: false,
    personalInfo: false,
  });

  const getCompletedSteps = () => {
    return Object.values(steps).reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
  };

  const getSliderPercentage = () => {
    const total = getCompletedSteps();

    return (total / Object.keys(steps).length) * 100;
  };
  return (
    <CompleteInfoLayout pageTitle='Complete your profile'>
      <VStack
        w='100%'
        h='100%'
        justify='center'
        align='flex-start'
        maxW='600px'
        spacing={'24px'}
      >
        <Box w='100%'>
          <Heading size='md'>
            Complete your profile ({getCompletedSteps()}/4)
          </Heading>
          <Slider
            colorScheme={'teal'}
            aria-label='complete-info-slider'
            size='lg'
            value={getSliderPercentage()}
          >
            <SliderTrack h={'8px'} borderRadius={'3px'}>
              <SliderFilledTrack />
            </SliderTrack>
          </Slider>
        </Box>
      </VStack>
    </CompleteInfoLayout>
  );
};
export default withApollo(CompleteInfo);
