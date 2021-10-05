import { getDataFromTree } from '@apollo/client/react/ssr';
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
import CustomDatePicker from 'components/CustomDatePicker';
import { MyDropzone } from 'components/CustomDropzone';
import InputField from 'components/InputField';
import { Layout } from 'components/Layout';
import SelectComponent from 'components/SelectFieldComponent';
import { Form, Formik } from 'formik';
import {
  Breeds,
  PetGender,
  PetSize,
  PetType,
  useAdoptionPostsQuery,
} from 'generated/graphql';
import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import s from 'styles/createPostForm.module.css';
import withApollo from 'utils/withApollo';

interface createPostProps {
  isOpen: boolean;
  onClose: () => void;
}
interface postInputProps {
  name: string | null;
  type: PetType | null;
  gender: PetGender | null;
  breeds: [Breeds] | [];
  size: PetSize | null;
  birthDate: Date | null;
  about: string | null;
  postImages: FileList | [];
  thumbnailIdx: number | null;
  address: {
    lat: number | null;
    lng: number | null;
    country: string | null;
    city: string | null;
    street: string | null;
    zip: number | null;
  };
}

const FirstStepComponent = () => {
  return (
    <>
      <div className={s['horizontal-input-fields']}>
        <InputField
          name='name'
          placeholder='Kitty Kitty'
          label='Pet Name'
          autoFocus={true}
        />

        <SelectComponent
          label='Pet Type'
          name='type'
          required
          placeholder='Cat'
          options={Object.keys(PetType).map((key) => ({
            label: key,
            value: key,
          }))}
        />
      </div>

      <div className={s['horizontal-input-fields']}>
        <SelectComponent
          label='Pet Size'
          name='size'
          required
          placeholder='Mini'
          options={Object.keys(PetSize).map((key) => ({
            label: key,
            value: key,
          }))}
        />
        <SelectComponent
          label='Gender'
          name='gender'
          required
          placeholder='Male or Female'
          options={Object.keys(PetGender).map((key) => ({
            label: key,
            value: key,
          }))}
        />
      </div>
      <SelectComponent
        label='Breed'
        name='breeds'
        required
        isMulti
        placeholder='Please select all breeds'
        helperText='If your pet is a mixture of breeds, please select all of them'
        options={Object.keys(Breeds).map((key) => ({
          label: key,
          value: key,
        }))}
      />

      <div className={s['horizontal-input-fields']}>
        <SelectComponent
          label='Pet Colors'
          name='colors'
          required
          placeholder='Mini'
          options={Object.keys(PetSize).map((key) => ({
            label: key,
            value: key,
          }))}
        />

        <CustomDatePicker label='Age' name='age' placeholder='mm/dd/yyyy' />
      </div>
    </>
  );
};
const SecondStepComponent = () => {
  return (
    <>
      <div className={s['horizontal-input-fields']}>
        <InputField
          name='about'
          placeholder='Tell us about your pet'
          label='About Pet'
          textarea
        />
      </div>
      <div className={s['horizontal-input-fields']}>
        <MyDropzone
          label='Pet Images'
          name='petImages'
          helperText='The first image will be used as a thumbnail in case you did not specify one.'
        />
      </div>
    </>
  );
};
const renderFormStep = (step: number) => {
  switch (step) {
    case 1:
      return <FirstStepComponent />;
    case 2:
      return <SecondStepComponent />;
  }
};
const getStepTitle = (step: number) => {
  switch (step) {
    case 1:
      return 'Pet Information';
    case 2:
      return 'Pet Description';
  }
};

const CreateAdoptionPostModal: React.FC<createPostProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);

  const prevStep = () => {
    setStep(Math.max(step - 1, 1));
  };
  const nextStep = () => {
    setStep(Math.min(step + 1, 3));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
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
              name: null,
              type: null,
              gender: null,
              breeds: [],
              colors: [],
              size: null,
              birthDate: null,
              about: null,
              petImages: [],
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
            onSubmit={async (
              { name, type, gender, breeds, size },
              { setErrors }
            ) => {
              if (step === 3) {
                //submit form
                return;
              } else {
                if (step === 1) {
                  if (!name || !type || !gender || !breeds.length || !size) {
                    return;
                  }
                }
                nextStep();
              }
            }}
          >
            {({ isSubmitting, handleChange, values }) => (
              <Form className={s.form_container}>
                {renderFormStep(step)}
                <>{JSON.stringify(values, null, 2)}</>
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

const MissingPage: React.FC = ({}) => {
  const { data, error, loading, fetchMore, variables } = useAdoptionPostsQuery({
    variables: {
      limit: 2,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [openModal, setOpenModal] = useState(false);

  if (loading) {
    return <Layout>Loading...</Layout>;
  }
  //Not Loading case but there is an error
  if (error || data?.adoptionPosts?.errors?.length) {
    return <Layout>Error</Layout>;
  }

  //No errors but no posts
  if (!data?.adoptionPosts?.posts?.length) {
    return <Layout>No posts</Layout>;
  }

  const { hasMore, posts } = data.adoptionPosts;

  return (
    <Layout>
      <h1>Missing Page</h1>
      <ul>
        {posts.map(({ id, pet, createdAt, user, address }) => {
          const { name, size, gender, images, birthDate, type } = pet;

          return (
            <li key={id}>
              {id}-{name}
            </li>
          );
        })}
      </ul>
      {hasMore && (
        <Button
          onClick={() => {
            const latestCreatedAt = posts[posts.length - 1].createdAt;
            fetchMore({
              variables: {
                limit: variables?.limit,
                cursor: latestCreatedAt,
              },
            });
          }}
        >
          Load More
        </Button>
      )}
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Create Post
      </Button>
      {openModal && (
        <CreateAdoptionPostModal
          {...{
            isOpen: openModal,
            onClose: () => setOpenModal(false),
          }}
        />
      )}
    </Layout>
  );
};

export default withApollo(MissingPage, { getDataFromTree });
