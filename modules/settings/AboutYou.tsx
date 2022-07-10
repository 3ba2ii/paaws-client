import { Divider, Heading, Textarea, useToast, VStack } from '@chakra-ui/react';
import CustomEditableField from 'components/input/CustomEditableField';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import SelectAvatarComponent from 'components/SelectAvatarComponent';
import { FastField, Form, Formik, FormikProps } from 'formik';
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

  const updateName = async (formikProps: FormikProps<UpdateUserDataType>) => {
    const { full_name } = formikProps.values;
    const { full_name: initialFullName } = formikProps.initialValues;

    if (initialFullName.trim() === full_name.trim()) {
      return;
    }
    const { data } = await updateUserName({
      variables: { fullName: full_name },
      update: (cache, { data: result }) => {
        if (
          !result?.updateUserFullName.success ||
          result.updateUserFullName.errors?.length
        ) {
          /* Error case */
          const mappedErrors = toErrorMap(
            data?.updateUserFullName.errors || []
          );
          formikProps.setErrors(mappedErrors);
          return;
        }
        updateMeQueryCache(cache, { ...user, full_name });
      },
    });
  };
  const onUpdateInfo = async (formikProps: FormikProps<UpdateUserDataType>) => {
    const { values, initialValues } = formikProps;
    if (values.bio.trim() === initialValues.bio.trim()) {
      //show warning that its the same value
      return;
    }
    await updateUserInfo({
      variables: { updateUserUpdateOptions: { bio: values.bio.trim() } },
      update: (cache, { data: result }) => {
        if (!result?.updateUser) {
          formikProps.setFieldError(
            'bio',
            'An error occurred while updating your info, Please try again later'
          );
          return;
        }
        updateMeQueryCache(cache, { ...user, bio: values.bio });
      },
    });
  };

  return (
    <VStack align='flex-start' w='100%' spacing={5}>
      <Heading fontSize='24px' fontWeight={'semibold'}>
        About you
      </Heading>
      <Divider maxW='800px' />
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
        {(formikProps) => (
          <Form
            style={{
              width: '100%',
              maxWidth: '900px',
              height: '100%',
            }}
          >
            <VStack spacing={14} maxW='800px'>
              <InputFieldWrapper
                label='Full Name'
                name='full_name'
                helperText='You can update your name once every 30 days with a maximum of 5 times.'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold' }}
                required={false}
              >
                <CustomEditableField
                  defaultValue={formikProps.values.full_name}
                  label='Name'
                  name='full_name'
                  editableProps={{
                    isPreviewFocusable: false,
                    submitOnBlur: false,
                    onSubmit: () => updateName(formikProps),
                    onAbort: () =>
                      formikProps.setFieldValue(
                        'full_name',
                        formikProps.initialValues.full_name
                      ),
                    onCancel: () =>
                      formikProps.setFieldValue(
                        'full_name',
                        formikProps.initialValues.full_name
                      ),
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
                <CustomEditableField
                  defaultValue={formikProps.values.bio}
                  label='Short Bio'
                  name='bio'
                  placeholder='Tell us about yourself'
                  editableProps={{
                    isPreviewFocusable: false,
                    submitOnBlur: false,
                    onSubmit: () => onUpdateInfo(formikProps),
                    onAbort: () =>
                      formikProps.setFieldValue(
                        'bio',
                        formikProps.initialValues.bio
                      ),
                    onCancel: () =>
                      formikProps.setFieldValue(
                        'bio',
                        formikProps.initialValues.bio
                      ),
                  }}
                  textarea
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
                        formikProps.setFieldValue(
                          'avatar',
                          URL.createObjectURL(file)
                        );
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
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default AboutYouSettings;
