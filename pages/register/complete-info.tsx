import { Button } from '@chakra-ui/button';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import { Layout } from 'components/Layout';
import { useMeQuery, useUploadAvatarMutation } from 'generated/graphql';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from 'styles/register.module.css';
import { useIsAuth } from 'utils/useIsAuth';
import withApollo from 'utils/withApollo';
import { Step1 } from './_updateInfoStep1';
import { Step2 } from './_updateInfoStep2';

interface CompleteInfoProps {}
const CompleteInfoComponent: React.FC<CompleteInfoProps> = ({}) => {
  useIsAuth();

  const [step, setStep] = useState<number>(0);
  const [values, setValues] = useState({
    bio: '',
    avatar: '',
    location: '',
  });

  const [uploadAvatar] = useUploadAvatarMutation();

  const { data, loading } = useMeQuery();

  const handleChange = (value: any, field: string) => {
    setValues({ ...values, [field]: value });
  };

  const handleNextStep = () => {
    //HAndle Next Step
    setStep(step + 1);
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
      <div className={styles['complete-info-forms-container']}>
        <div className={styles['single-step-container']}>
          <CSSTransition
            in={step == 0}
            timeout={300}
            classNames='complete-info-steps'
            unmountOnExit
          >
            <Step1 userInfo={data} handleChange={handleChange} />
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
          <Button mr={4} variant='ghost' onClick={handleNextStep}>
            Skip
          </Button>
          {step > 0 && (
            <Button variant='ghost' onClick={handlePrevStep}>
              Back
            </Button>
          )}
          <Button
            rightIcon={<ChevronRightIcon />}
            type='submit'
            colorScheme='teal'
            minW='128px'
            onClick={handleNextStep}
          >
            Next
          </Button>
        </Flex>
      </div>

      <>{JSON.stringify(values)}</>
      <>{JSON.stringify(step)}</>
    </Layout>
  );
};
export default withApollo(CompleteInfoComponent);
