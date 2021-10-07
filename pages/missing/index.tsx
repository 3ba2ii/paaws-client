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
  Box,
  Flex,
  FormHelperText,
} from '@chakra-ui/react';
import CustomDatePicker from 'components/CustomDatePicker';
import { MyDropzone } from 'components/CustomDropzone';
import CustomSwitch from 'components/CustomSwitch';
import InputField from 'components/InputField';
import { Layout } from 'components/Layout';
import SelectComponent from 'components/SelectFieldComponent';
import { Form, Formik, useFormikContext } from 'formik';
import {
  Breeds,
  PetGender,
  PetSize,
  PetType,
  useAdoptionPostsQuery,
} from 'generated/graphql';
import React, { useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import s from 'styles/createPostForm.module.css';
import withApollo from 'utils/withApollo';
import Image from 'next/image';
import CustomLocationPicker from 'components/GenericLocationPicker';
import { LocationType } from 'pages/types';
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
  const { values }: { values: any } = useFormikContext();
  return (
    <>
      <InputField
        name='about'
        placeholder='Tell us about your pet'
        label='About Pet'
        textarea
      />
      <MyDropzone
        label='Pet Images'
        name='petImages'
        helperText='The first image will be used as a thumbnail in case you did not specify one.'
      />
      <Flex flexDirection='row' gridGap={2}>
        <CustomSwitch
          label='Vaccinated?'
          defaultValue={false}
          name='vaccinated'
          required={false}
          helpIcon
          helperText='💉 Select if your pet is vaccinated up-to-date'
        />
        {values.gender === 'Female' && (
          <CustomSwitch
            label='Spayed?'
            defaultValue={false}
            name='spayed'
            required={false}
            helpIcon
            helperText='Female Animals must be spayed before they are given up for adoption'
          />
        )}
        {values.gender === 'Male' && (
          <CustomSwitch
            label='Neutered?'
            defaultValue={false}
            name='neutered'
            required={false}
            helpIcon
            helperText='Male Animals must be neutered before they are given up for adoption'
          />
        )}
      </Flex>
    </>
  );
};
const ThirdStepComponent = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const form = useFormikContext();
  //This step include user'preferred location
  const handleLocationChange = (coords: LocationType) => {
    console.log(
      `🚀 ~ file: index.tsx ~ line 187 ~ handleLocationChange ~ coords`,
      coords
    );
    form.setFieldValue('address', {
      ...coords,
    });
  };
  const handleShowMap = () => {
    setSelected(1);
    //recompute the height by adding a specific proprety to class name
    const element = document.getElementById(
      'chakra-modal-post-modal-container'
    );

    if (element) {
      element.style.height = '100%';
    }
  };
  const handleSelectCurrentLocation = () => {
    const element = document.getElementById(
      'chakra-modal-post-modal-container'
    );
    console.log(
      `🚀 ~ file: index.tsx ~ line 212 ~ handleSelectCurrentLocation ~ element`,
      element
    );

    if (element) {
      element.style.height = 'min-content';
    }
  };

  return (
    <>
      <Box>
        <Text textStyle='h5'> Location Preferences</Text>
        <Text textStyle='p3'>Deserunt ex excepteur velit quis sit magna.</Text>
      </Box>
      {/* Select between current location or add new location*/}
      <section className={s.locationSelection}>
        <div
          className={`${s.card} ${selected === 0 ? s.selectedLocation : ''}`}
          onClick={() => {
            setSelected(0);
            handleSelectCurrentLocation();
          }}
        >
          <Image
            src='/illustrations/gummy-sweet-home.svg'
            width={'100%'}
            height={'100%'}
          />
          <Text textStyle='p1' color={selected === 0 ? 'blue.600' : 'gray.500'}>
            My Location
          </Text>
        </div>
        <div
          className={`${s.card} ${selected === 1 ? s.selectedLocation : ''}`}
          onClick={handleShowMap}
        >
          <Image
            src='/illustrations/gummy-location.svg'
            width={'100%'}
            height={'100%'}
          />
          <Text textStyle='p1' color={selected === 1 ? 'blue.600' : 'gray.500'}>
            Add new Location
          </Text>
        </div>
      </section>
      {/* Location Maps */}
      {selected === 1 ? (
        <div style={{ height: '100%', width: '100%' }}>
          <CustomLocationPicker
            includeMarker
            includeAutoComplete
            handleLocationChange={handleLocationChange}
          />
        </div>
      ) : null}
    </>
  );
};
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

const CreateAdoptionPostModal: React.FC<createPostProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const modalRef = useRef(null);

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
      <ModalContent ref={modalRef} className={s.modal_container}>
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
                console.log(step);
                return;
              } else {
                if (step === 1) {
                  if (!name || !type || !gender || !breeds.length || !size) {
                    return;
                  }
                }
              }
              console.log(step);

              nextStep();
            }}
          >
            {({ isSubmitting, handleChange, values }) => (
              <Form className={s.form_container}>
                <>{renderFormStep(step)}</>
                {/* <>{JSON.stringify(values, null, 2)}</> */}
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
