import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useIsAuth } from 'hooks/useIsAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import React from 'react';
import withApollo from 'utils/withApollo';

type CompleteInfoSteps = 'location' | 'phone' | 'avatar' | 'personalInfo';

const CompleteInfo: React.FC = () => {
  const { user, loading } = useIsAuth();
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

  React.useEffect(() => {
    //update the initial state based on user data
    if (user) {
      const { avatar, bio, phone, phoneVerified, lat, lng } = user;
      setSteps({
        ...steps,
        avatar: !!(avatar && avatar.url),
        location: !!(lat && lng),
        phone: !!(phone && phoneVerified),
        personalInfo: !!(bio && bio !== ''),
      });
    }
  }, [user, loading]);

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <CompleteInfoLayout pageTitle='Complete your profile'>
      <VStack
        w='100%'
        h='100%'
        justify='center'
        align='flex-start'
        maxW='600px'
        spacing={'24px'}
        px='24px'
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
        <VStack w='100%'>
          <HStack
            w='100%'
            h='100%'
            minH='110px'
            border='2px solid'
            borderColor='gray.200'
            borderRadius={'6px'}
            px='24px'
            py='12px'
            spacing={'24px'}
            bg='transparent'
            boxShadow={'sm'}
            as={Button}
          >
            <CheckIcon fontSize='24px' color='green.500' />
            <VStack w='100%' align='flex-start'>
              <Heading size='sm' color={'blue.500'} fontWeight='semibold'>
                Set your profile picture
              </Heading>
              <Text
                textStyle='p1'
                fontWeight='normal'
                whiteSpace={'break-spaces'}
                textAlign='left'
              >
                Your photo will make it easier for your friends to recognize you
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </CompleteInfoLayout>
  );
};
export default withApollo(CompleteInfo);
