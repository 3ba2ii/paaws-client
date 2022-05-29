import {
  Button,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import InputField from 'components/input/InputField';
import { SegmentedControl } from 'components/input/SegmentedControl';
import { Form, Formik } from 'formik';
import { UserGender, useUpdateUserInfoMutation } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { OptionTypeWithEnums } from 'types';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import { convertDateFormat } from 'utils/convertDateFormat';
import withApollo from 'utils/withApollo';

interface BioStepProps {}

const BioStep: React.FC<BioStepProps> = () => {
  const { user, loading } = useIsAuth();
  const [updateUser] = useUpdateUserInfoMutation();
  const router = useRouter();
  const toaster = useToast();

  if (loading) return <LoadingComponent />;

  if (!user) return <></>;

  const hasBio: boolean = !!(user && user.bio && user.bio !== '');

  return (
    <CompleteInfoLayout pageTitle='Add Your Bio - Paaws'>
      <Formik
        initialValues={
          {
            bio: hasBio ? user?.bio : '',
            gender: user?.gender || null,
            birthDate: user?.birthDate || null,
          } as {
            bio: string;
            gender: UserGender;
            birthDate: Date | null;
          }
        }
        onSubmit={async ({ bio, gender, birthDate }) => {
          const { data } = await updateUser({
            variables: {
              updateUserUpdateOptions: { bio, gender, birthDate },
            },
            update: (cache, { data: result, errors }) => {
              if (!result?.updateUser || errors) return;
              updateMeQueryCache(cache, { ...user, bio, gender, birthDate });
            },
          });
          if (!data || !data.updateUser) {
            return toaster({
              status: 'error',
              title: 'An error occurred while updating your bio',
              description:
                'We could not update your bio at this time. Please try again later.',
              position: 'top-right',
              variant: 'subtle',
              isClosable: true,
            });
          }
          //check if the user verified his phone number or not
          if (!user) return;

          return router.push('/profile/complete-info');
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form
            style={{
              width: 'clamp(400px, 90vw, 600px)',
              paddingInline: '1rem',
            }}
          >
            <VStack w='100%' h='100%' align='flex-start' spacing={5}>
              <VStack align='flex-start' w='100%' mb={5}>
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
                />
              </VStack>
              <HStack w='100%' justify='flex-end'>
                <Button
                  onClick={() => router.back()}
                  type='reset'
                  variant='ghost'
                  fontSize='sm'
                >
                  Cancel
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
export default withApollo(BioStep);
