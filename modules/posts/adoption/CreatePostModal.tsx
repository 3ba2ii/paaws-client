import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useCreateAdoptionPostMutation } from 'generated/graphql';
import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import s from 'styles/createPostForm.module.css';
import { CreatePostSchema } from 'utils/yupSchemas/CreatePostSchema';
import { toErrorMap } from 'utils/toErrorMap';
import { createPostProps } from '../../../pages/adoption/index';
import {
  FirstStepComponent,
  SecondStepComponent,
  ThirdStepComponent,
} from './CreatePostSteps';

const renderFormStep = (step: number) => {
  switch (step) {
    case 1:
      return <FirstStepComponent />;
    case 2:
      return <SecondStepComponent />;

    case 3:
      return <ThirdStepComponent />;
  }
};
const getStepTitle = (step: number) => {
  switch (step) {
    case 1:
      return 'Pet Information';
    case 2:
      return 'Pet Description';
    case 3:
      return 'Preferences';
  }
};
export const CreateAdoptionPostModal: React.FC<createPostProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  console.log(`🚀 ~ file: CreatePostModal.tsx ~ line 51 ~ step`, step);
  const [createAdoptionPost] = useCreateAdoptionPostMutation();

  const prevStep = () => {
    if (step === 1) {
      onClose();
    }
    setStep(Math.max(step - 1, 1));
  };
  const nextStep = () => {
    setStep(Math.min(step + 1, 3));
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size='2xl'
      id={'post-modal-container'}
    >
      <ModalOverlay />
      <ModalContent className={s.modal_container}>
        <ModalHeader>
          <Text textStyle='p3'>{`Create adoption post (step ${step} of 3)`}</Text>
          <Text textStyle='h4'> {getStepTitle(step)}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* FORM Content*/}

          <Formik
            initialValues={{
              name: '',
              type: null,
              gender: null,
              breeds: [],
              colors: [],
              size: null,
              birthDate: null,
              about: null,
              petImages: [],
              neutered: false,
              vaccinated: false,
              spayed: false,
              thumbnailIdx: 0,
              address: {
                lat: null,
                lng: null,
                country: null,
                city: null,
                street: null,
                zip: null,
              },
            }}
            validationSchema={CreatePostSchema}
            onSubmit={async (
              {
                name,
                type,
                gender,
                breeds,
                about,
                size,
                address,
                petImages,
                thumbnailIdx,
                neutered,
                vaccinated,
                spayed,
                birthDate,
              },
              { setErrors }
            ) => {
              console.log('a7a');
              if (step === 3) {
                const { lat, lng } = address;
                if (
                  !lat ||
                  !lng ||
                  !name ||
                  !type ||
                  !gender ||
                  !breeds.length ||
                  !size ||
                  !about ||
                  !birthDate
                )
                  return;
                //submit form
                console.log('hello world');
                //TODO: Update cache after creating post
                const { data } = await createAdoptionPost({
                  variables: {
                    petImages,
                    postInput: {
                      address: {
                        lat,
                        lng,
                      },
                      petInfo: {
                        name,
                        type,
                        size,
                        breeds,
                        about,
                        gender,
                        thumbnailIdx,
                        spayedOrNeutered: spayed || neutered,
                        vaccinated,
                        birthDate,
                      },
                    },
                  },
                });
                if (!data) return;
                if (data?.createAdoptionPost.errors?.length) {
                  const errorsMapped = toErrorMap(
                    data.createAdoptionPost.errors
                  );
                  return setErrors(errorsMapped);
                }

                const { adoptionPost } = data.createAdoptionPost;

                if (adoptionPost) return onClose();
              }

              nextStep();
            }}
          >
            {({ isSubmitting, handleChange, values, submitForm }) => (
              <Form className={s.form_container}>
                <>{renderFormStep(step)}</>
                <>{JSON.stringify(values, null, 2)}</>
                {/* <>{JSON.stringify(step, null, 2)}</> */}
                <div className={s.actions_container}>
                  <Button
                    onClick={prevStep}
                    variant='ghost'
                    colorScheme='gray'
                    textColor='gray.500'
                    size='sm'
                    minH='36px'
                    mr={3}
                  >
                    {step === 1 ? 'Cancel' : 'Back'}
                  </Button>
                  <Button
                    type='submit'
                    colorScheme='teal'
                    minW='110px'
                    size='sm'
                    minH='36px'
                    bgColor='teal.400'
                    rightIcon={<FaChevronRight size='12px' />}
                    isLoading={isSubmitting}
                    onClick={submitForm}
                  >
                    Next
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
