import {
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import SelectAvatarComponent from 'components/SelectAvatarComponent';
import { FastField, Form, Formik, FormikErrors, FormikProps } from 'formik';
import {
  MeQuery,
  useUpdateUserFullNameMutation,
  useUpdateUserInfoMutation,
  useUploadAvatarMutation,
} from 'generated/graphql';
import React from 'react';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import { toErrorMap } from 'utils/toErrorMap';

interface AboutYouProps {
  user: MeQuery['me'];
}
type UpdateUserDataType = {
  full_name: string;
  bio: string;
  avatar: string | null;
  email: string;
};

const AboutYouSettings: React.FC<AboutYouProps> = ({ user }) => {
  if (!user) return null;
  const [newAvatar, setNewAvatar] = React.useState<File | null>(null);
  const toaster = useToast();
  const [updateUserName] = useUpdateUserFullNameMutation();
  const [updateUserAvatar] = useUploadAvatarMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const updateName = async (
    setErrors: (errors: FormikErrors<UpdateUserDataType>) => void,
    full_name: string
  ) => {
    const { data } = await updateUserName({
      variables: { fullName: full_name },
      update: (cache, { data }) => {
        if (
          !data?.updateUserFullName.success ||
          data.updateUserFullName.errors?.length
        ) {
          return;
        }
        updateMeQueryCache(cache, { ...user, full_name });
      },
    });

    if (
      !data?.updateUserFullName.success &&
      data?.updateUserFullName.errors?.length
    ) {
      const mappedErrors = toErrorMap(data?.updateUserFullName?.errors);
      return setErrors(mappedErrors);
    }
  };

  return (
    <VStack align='flex-start' w='100%' spacing={5}>
      <Heading fontSize='24px' fontWeight={'semibold'}>
        About you
      </Heading>
      <Divider />
      <Formik
        initialValues={
          {
            full_name: user.full_name,
            bio: user.bio,
            avatar: user.avatar?.url || null,
            email: user.email,
          } as UpdateUserDataType
        }
        onSubmit={async ({ full_name, bio, email }, { setErrors }) => {
          console.log(full_name, bio, email);
          const hasNameChanged =
            full_name.trim().toLowerCase() !==
            user.full_name.trim().toLowerCase();
          const hasAvatarChanged = newAvatar !== null;
          const hasBioChanged = bio !== user.bio;

          if (!hasNameChanged && !hasAvatarChanged && !hasBioChanged) return;
          const promises: Function[] = [];

          hasNameChanged &&
            promises.push(() => updateName(setErrors, full_name));

          hasAvatarChanged &&
            promises.push(() =>
              updateUserAvatar({
                variables: { uploadAvatarImage: newAvatar },
                update: (cache, { data }) => {
                  if (!data?.uploadAvatar.url) return;
                  updateMeQueryCache(cache, {
                    ...user,
                    avatar: {
                      url: data.uploadAvatar.url,
                      id: Math.floor(Math.random() * 1000),
                    },
                  });
                  setNewAvatar(null);
                },
              })
            );

          hasBioChanged &&
            promises.push(() =>
              updateUserInfo({
                variables: { updateUserUpdateOptions: { bio } },
                update: (cache, { data }) => {
                  if (!data?.updateUser) return;
                  updateMeQueryCache(cache, { ...user, bio });
                },
              })
            );

          const [x, y, z] = await Promise.allSettled(
            promises.map(async (f) => f())
          );
          toaster({
            title: 'Your profile has been updated',
            description:
              "If you don't see the updates, Please refresh the page.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
            variant: 'subtle',
          });
        }}
        validateOnBlur
      >
        {({ setFieldValue, values, errors, touched, isSubmitting }) => (
          <Form
            style={{
              width: '100%',
              maxWidth: '900px',
              height: '100%',
            }}
          >
            <VStack spacing={14} maxW='600px'>
              <InputFieldWrapper
                label='Name'
                name='full_name'
                helperText='You can update your name once every 30 days with a maximum of 5 times.'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold' }}
                required={false}
              >
                <FastField
                  as={Input}
                  variant='flushed'
                  id='full_name'
                  name='full_name'
                  opacity='.8'
                />
              </InputFieldWrapper>

              <InputFieldWrapper
                label='Your Avatar'
                name='avatar'
                helperText='Recommended size: at least 1000 pixels per side. File type: JPG, PNG or GIF.'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold', mb: 5 }}
                required={false}
              >
                <FastField
                  as={() => (
                    <SelectAvatarComponent
                      user={user}
                      avatarURL={
                        newAvatar
                          ? URL.createObjectURL(newAvatar)
                          : user.avatar?.url
                      }
                      onChange={(file) => {
                        setNewAvatar(file);
                        setFieldValue('avatar', URL.createObjectURL(file));
                      }}
                      avatarProps={{ size: '2xl' }}
                    />
                  )}
                  variant='flushed'
                  id='avatar'
                  name='Avatar'
                  opacity='.8'
                  shouldUpdate={(
                    nextProps: { formik: FormikProps<UpdateUserDataType> },
                    currentProps: { formik: FormikProps<UpdateUserDataType> }
                  ) => {
                    return (
                      nextProps.formik.values.avatar !==
                      currentProps.formik.values.avatar
                    );
                  }}
                />
              </InputFieldWrapper>
              <InputFieldWrapper
                label='Short Bio'
                name='bio'
                helperText='This bio will appear on your Profile page, so make it short and sweet.'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold' }}
                required={false}
              >
                <FastField
                  as={Textarea}
                  variant='flushed'
                  id='bio'
                  name='bio'
                  opacity='.8'
                  minHeight='42px'
                  placeholder='Tell us about yourself'
                />
              </InputFieldWrapper>
            </VStack>
            <HStack mt={'3rem'} w='100%' justify='flex-start'>
              <Button colorScheme='teal' type='submit' isLoading={isSubmitting}>
                Save Changes
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default AboutYouSettings;
