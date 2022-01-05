import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import { Layout } from 'components/Layout';
import {
  useMeQuery,
  useUpdateUserInfoMutation,
  useUploadAvatarMutation,
} from 'generated/graphql';
import { UserGeneralInfoStep } from 'modules/auth/register/UserGeneralInfoStep';
import { UserLocationStep } from 'modules/auth/register/UserLocationStep';
import Router from 'next/router';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from 'styles/register.module.css';
import { useIsAuth } from 'hooks/useIsAuth';
import withApollo from 'utils/withApollo';

interface ValuesData {
  bio: string;
  avatar: File | null;
  location: {
    lng: number | null;
    lat: number | null;
  };
}
const CompleteInfoComponent: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [values, setValues] = useState<ValuesData>({
    bio: '',
    avatar: null,
    location: {
      lng: null,
      lat: null,
    },
  });
  const { colorMode } = useColorMode();

  const [uploadAvatar, { loading: uploadAvatarLoading }] =
    useUploadAvatarMutation();
  const [updateUserInfo, { loading: updateInfoLoading }] =
    useUpdateUserInfoMutation();

  const { data, loading } = useMeQuery({ fetchPolicy: 'cache-only' });

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
      if (!values.avatar) return;
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
          top='-90px'
          left='0'
          as='h1'
          size='md'
          mb={4}
        >
          <Text as='span' textStyle='h4' color='teal.400'>
            Step {step + 1}:{' '}
          </Text>
          <Text as='span' textStyle='h4'>
            {step === 0 ? 'Tell us more about yourself' : 'Set your Location'}
          </Text>
          <Text maxW='60ch' as='p' textStyle='p2'>
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
            <UserGeneralInfoStep
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
            <UserLocationStep userInfo={data} handleChange={handleChange} />
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
