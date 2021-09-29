import { Button } from '@chakra-ui/button';
import { FormHelperText } from '@chakra-ui/form-control';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import { Layout } from 'components/Layout';
import {
  useMeQuery,
  useUpdateUserInfoMutation,
  useUploadAvatarMutation,
} from 'generated/graphql';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from 'styles/register.module.css';
import { useIsAuth } from 'utils/useIsAuth';
import withApollo from 'utils/withApollo';
import { Step1 } from './_updateInfoStep1';
import { Step2 } from './_updateInfoStep2';
import Router from 'next/router';
import router from 'next/router';
import { useColorMode } from '@chakra-ui/color-mode';
import { useColorModePreference } from '@chakra-ui/media-query';

interface CompleteInfoProps {}
const CompleteInfoComponent: React.FC<CompleteInfoProps> = ({}) => {
  useIsAuth();

  const [step, setStep] = useState<number>(0);
  const [values, setValues] = useState({
    bio: '',
    avatar: '',
    location: {
      lng: null,
      lat: null,
    },
  });
  const { colorMode } = useColorMode();

  console.log(`🚀 ~ file: complete-info.tsx ~ line 38 ~ colorMode`, colorMode);

  const [uploadAvatar, { loading: uploadAvatarLoading }] =
    useUploadAvatarMutation();
  const [updateUserInfo, { loading: updateInfoLoading }] =
    useUpdateUserInfoMutation();

  const { data, loading } = useMeQuery();

  const handleChange = (value: any, field: string) => {
    setValues({ ...values, [field]: value });
  };

  const handleNextStep = async () => {
    //HAndle Next Step
    setStep(Math.min(step + 1, 1));

    // if (step === 1) fire all requests and save them to db
    //1. upload avatar
    //2. update user bio
    //3. update user location
    //4. update user info

    if (step === 1) {
      const { bio, avatar, location } = values;
      const updateBioLocation = updateUserInfo({
        variables: {
          updateUserUpdateOptions: {
            bio,
            lng: location?.lng,
            lat: location?.lat,
          },
        },
      });

      const updateAvatar = avatar
        ? uploadAvatar({
            variables: {
              uploadAvatarImage: avatar,
            },
          })
        : null;

      //firing both mutations simultaneously
      Promise.all([updateBioLocation, updateAvatar]).then((res) => {
        console.log(
          `🚀 ~ file: complete-info.tsx ~ line 64 ~ Promise.all ~ res`,
          res
        );
        //routing to the homepage with success flag to show fireworks
        localStorage.setItem('completed-info-confetti', 'true');
        Router.replace(`/?ref=${Router.pathname}?success=${true}`);
      });
    }
  };
  const handlePrevStep = () => {
    //HAndle Next Step
    setStep(Math.max(step - 1, 0));
  };

  if (loading)
    return (
      <CircularProgress position='fixed' left='50%' top='50%' isIndeterminate />
    );

  return (
    <Layout title='Complete Registration - Step 1'>
      <Box
        className={styles['complete-info-forms-container']}
        boxShadow='base'
        border='.5px'
        borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
      >
        <Heading
          position='absolute'
          top='-60px'
          left='0'
          as='h1'
          size='md'
          mb={4}
        >
          <Text as='span' color='teal.400'>
            Step {step + 1}:{' '}
          </Text>
          <Text as='span'>
            {step === 0 ? 'Tell us more about yourself' : 'Set your Location'}
          </Text>
          <Text
            maxW='60ch'
            as='p'
            color='gray.500'
            fontWeight='400'
            fontSize='14px'
            mt={2}
          >
            {step === 1
              ? ` We will be using your location to send you notifications if a pet
            was lost or found near you, you can turn off these notifications
            anytime you want`
              : `Let others know who you're, this will help you a lot in adopting pets`}
          </Text>
        </Heading>
        <div className={styles['single-step-container']}>
          <CSSTransition
            in={step == 0}
            timeout={300}
            classNames='complete-info-steps'
            unmountOnExit
          >
            <Step1
              userInfo={data}
              handleChange={handleChange}
              values={values}
            />
          </CSSTransition>
        </div>
        <div className={styles['single-step-container']}>
          <CSSTransition
            in={step !== 0}
            appear={true}
            timeout={300}
            classNames='complete-info-step-2'
            unmountOnExit
          >
            <Step2 userInfo={data} handleChange={handleChange} />
          </CSSTransition>
        </div>
        <Flex
          w={'100%'}
          justify='flex-end'
          className={styles['form-buttons-container']}
        >
          <Button
            mr={4}
            variant='ghost'
            color='gray.400'
            onClick={handleNextStep}
          >
            Skip
          </Button>
          {step > 0 && (
            <Button mr={4} variant='ghost' onClick={handlePrevStep}>
              Back
            </Button>
          )}
          <Button
            rightIcon={<ChevronRightIcon />}
            type='submit'
            colorScheme='teal'
            minW='128px'
            onClick={handleNextStep}
            isLoading={uploadAvatarLoading || updateInfoLoading}
          >
            {step === 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};
export default withApollo(CompleteInfoComponent);
