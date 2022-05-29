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
import { useRouter } from 'next/router';
import React from 'react';
import {
  BiCheck,
  BiImageAdd,
  BiLocationPlus,
  BiPhone,
  BiStar,
} from 'react-icons/bi';
import withApollo from 'utils/withApollo';

type CompleteInfoSteps = 'location' | 'phone' | 'avatar' | 'personalInfo';

type StepsComponentsData = {
  id: CompleteInfoSteps;
  title: string;
  subtitle: string;
  Icon: JSX.Element;
  href: string;
}[];

const completeInfoSteps: StepsComponentsData = [
  {
    id: 'avatar',
    title: 'Set your profile picture',
    subtitle:
      'Your photo will make it easier for your friends to recognize you',
    Icon: <BiImageAdd size='32px' color='gray' />,
    href: '/avatar',
  },
  {
    id: 'phone',
    title: 'Add your phone number',
    subtitle:
      'Your phone number will be visible just for you and you can use it to login anytime.',
    Icon: <BiPhone size='32px' color='gray' />,
    href: '/phone-number',
  },
  {
    id: 'location',
    title: 'Set your location',
    subtitle:
      'We will be using your location to send notifications if a pet was lost or found near you.',
    Icon: <BiLocationPlus size='32px' color='gray' />,
    href: '/location',
  },
  {
    id: 'personalInfo',
    title: 'Personalize your profile',
    subtitle:
      'Tell us a bit about yourself. We will give you more personalized experience',
    Icon: <BiStar size='32px' color='gray' />,
    href: '/personal-info',
  },
];

const CompleteInfo: React.FC = () => {
  const { user, loading } = useIsAuth();
  const router = useRouter();
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
  const getTotalStepsNumber = () => Object.keys(steps).length;

  const getSliderPercentage = () => {
    const total = getCompletedSteps();

    return (total / getTotalStepsNumber()) * 100;
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
            Complete your profile{' '}
            {`(${getCompletedSteps()}/${getTotalStepsNumber()})`}
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
        <VStack w='100%' spacing='16px'>
          {completeInfoSteps.map(({ title, id, href, Icon, subtitle }) => (
            <HStack
              key={id}
              w='100%'
              h='100%'
              border='2px solid'
              borderColor='gray.200'
              borderRadius={'6px'}
              px='24px'
              py='16px'
              spacing={'24px'}
              bg='transparent'
              boxShadow={'sm'}
              as={Button}
              onClick={() => router.push(`/profile/complete-info/${href}`)}
            >
              {steps[id] ? <BiCheck size='32px' color='teal' /> : Icon}
              <VStack w='100%' align='flex-start' spacing={'4px'}>
                <Heading size='sm' color={'blue.500'} fontWeight='semibold'>
                  {title}
                </Heading>
                <Text
                  textStyle='p1'
                  fontWeight='normal'
                  whiteSpace={'break-spaces'}
                  textAlign='left'
                  maxW='40ch'
                >
                  {subtitle}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </CompleteInfoLayout>
  );
};
export default withApollo(CompleteInfo);
