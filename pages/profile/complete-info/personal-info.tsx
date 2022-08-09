import {
  Button,
  Heading,
  HStack,
  Text,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import InputField from 'components/input/InputField';
import { SegmentedControl } from 'components/input/SegmentedControl';
import { Form, Formik, FormikHelpers } from 'formik';
import { UserGender, useUpdateUserInfoMutation } from 'generated/graphql';
import { useRequireAuth } from 'hooks/useRequireAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { OptionTypeWithEnums } from 'types';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import { convertDateFormat } from 'utils/helpers/convertDateFormat';
import withApollo from 'utils/withApollo';
type FormValuesType = {
  bio: string;
  gender: UserGender;
  birthDate: Date | null;
};

const PersonalInfoStep: React.FC = () => {
  const { user, loading } = useRequireAuth();
  const [updateUser] = useUpdateUserInfoMutation();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toaster = useToast();

  const handleSubmit = async (
    { bio, gender, birthDate }: FormValuesType,
    _helpers: FormikHelpers<FormValuesType>
  ) => {
    if (!user) return;
    const { data } = await updateUser({
      variables: {
        updateUserUpdateOptions: { bio, gender, birthDate },
      },
      update: (cache, { data: result, errors }) => {
        if (!result?.updateUser || errors) return;
        updateMeQueryCache(cache, { ...user, bio, gender, birthDate });
      },
    });

    if (data?.updateUser) {
      toaster({
        status: 'success',
        title: 'We could be friends, you know? 🥰',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true,
      });

      return router.push('/profile/complete-info');
    }

    return toaster({
      status: 'error',
      title: 'An error occurred while updating your info',
      description:
        'We could not update your info at this time. Please try again later.',
      position: 'bottom-right',
      variant: 'subtle',
      isClosable: true,
    });
  };

  if (loading) return <LoadingComponent />;

  if (!user) return <></>;

  return (
    <CompleteInfoLayout pageTitle='Personalize your Profile - Paaws'>
      <Formik
        initialValues={
          {
            bio: user.bio ? user?.bio : '',
            gender: user?.gender || null,
            birthDate: user?.birthDate || null,
          } as FormValuesType
        }
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form
            style={{
              width: 'clamp(400px, 90vw, 600px)',
              paddingInline: '1rem',
            }}
          >
            <VStack w='100%' h='100%' alignItems='flex-start' spacing={5}>
              <VStack alignItems='flex-start' w='100%' mb={5}>
                <Heading size='md'>Personalize your profile</Heading>
                <Text color='gray.500' fontSize='sm' maxW='65ch'>
                  Tell us a bit about yourself. We will give you more
                  personalized experience.
                </Text>
              </VStack>
              <VStack spacing={5} w='100%'>
                <InputField
                  label='Bio'
                  name='bio'
                  textarea
                  helperText='This bio will show up on your profile page'
                />
                <InputFieldWrapper label='Gender' name='gender'>
                  <SegmentedControl
                    options={
                      [
                        { label: 'Male', value: UserGender.Male },
                        { label: 'Female', value: UserGender.Female },
                      ] as OptionTypeWithEnums<UserGender>[]
                    }
                    selectedValue={{
                      label: values.gender,
                      value: values.gender,
                    }}
                    onChange={(val) => {
                      setFieldValue('gender', val.value);
                    }}
                  />
                </InputFieldWrapper>
                <InputField
                  name='birthDate'
                  label='Birthday'
                  type='date'
                  value={
                    values?.birthDate
                      ? convertDateFormat(
                          new Date(values?.birthDate).toLocaleDateString(),
                          'yyyy-mm-dd'
                        )
                      : ''
                  }
                  max={convertDateFormat(
                    new Date().toLocaleDateString(),
                    'yyyy-mm-dd'
                  )}
                  style={{ colorScheme: colorMode, cursor: 'text' }}
                />
              </VStack>
              <HStack w='100%' justifyContent='flex-end'>
                <Button
                  onClick={() => router.back()}
                  type='reset'
                  variant='ghost'
                  fontSize='sm'
                >
                  Back
                </Button>
                <Button
                  isLoading={isSubmitting}
                  colorScheme={'teal'}
                  type='submit'
                  fontSize='sm'
                >
                  Save Updates
                </Button>
              </HStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </CompleteInfoLayout>
  );
};
export default withApollo(PersonalInfoStep);
