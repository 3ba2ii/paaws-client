import { Divider, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import ChangeAvatarComponents from 'components/avatar/ChangeAvatarComponent';
import CustomEditableField from 'components/input/CustomEditableField';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import { Form, Formik, FormikProps } from 'formik';
import {
  MeQuery,
  useUpdateUserFullNameMutation,
  useUpdateUserInfoMutation,
} from 'generated/graphql';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { updateMeQueryCache } from 'utils/cache/updateMeQueryCache';
import areTwoStringsEqual from 'utils/helpers/areTwoStringsEqual';
import { toErrorMap } from 'utils/helpers/toErrorMap';
import { EditableFieldsType, UpdateUserDataType } from './_types';

interface AboutYouProps {
  user: MeQuery['me'];
}

const AboutYouSettings: React.FC<AboutYouProps> = ({ user }) => {
  if (!user) return null;

  const [newAvatarFile, setNewAvatarFile] = React.useState<File | null>(null);

  const toaster = useToast();
  const router = useRouter();

  const [editFullName, { loading: editNameLoading }] =
    useUpdateUserFullNameMutation();
  const [updateUserInfo, { loading: editUserInfoLoading }] =
    useUpdateUserInfoMutation();

  const handleAbort = (
    fp: FormikProps<UpdateUserDataType>,
    af: keyof UpdateUserDataType
  ) => {
    fp.setFieldValue(af, fp.initialValues[af]);
  };

  const successToaster = () => {
    return toaster({
      title: 'Profile Updated Successfully 🚀',
      description: "If you didn't see updates, please refresh the page",
      variant: 'solid',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });
  };
  const errorToaster = () => {
    return toaster({
      title: 'Something went wrong! 🙁',
      description: (
        <p>
          An error occurred while trying to save your info,
          <br />
          Retry later, or contact support.
        </p>
      ),
      variant: 'solid',
      status: 'error',
      position: 'top-right',
      isClosable: true,
    });
  };

  const updateName = async (formikProps: FormikProps<UpdateUserDataType>) => {
    const { full_name } = formikProps.values;
    const { full_name: initialFullName } = formikProps.initialValues;

    if (areTwoStringsEqual(initialFullName, full_name)) return;

    await editFullName({
      variables: { fullName: full_name },
      update: (cache, { data: result }) => {
        if (
          !result?.updateUserFullName.success ||
          result.updateUserFullName.errors?.length
        ) {
          /* Error case */
          const mappedErrors = toErrorMap(
            result?.updateUserFullName.errors || []
          );

          formikProps.setErrors(mappedErrors);
          handleAbort(formikProps, 'full_name');
          errorToaster();
          return;
        }
        updateMeQueryCache(cache, { ...user, full_name });
      },
    });
  };
  const onUpdateInfo = async (formikProps: FormikProps<UpdateUserDataType>) => {
    const { values, initialValues } = formikProps;
    if (areTwoStringsEqual(values?.bio, initialValues?.bio)) {
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
          errorToaster();
          return;
        }
        updateMeQueryCache(cache, { ...user, bio: values.bio });
        successToaster();
      },
    });
  };

  const handleChangeAvatar = (file: File | null) => {
    setNewAvatarFile(file);
  };
  const uploadSuccessCB = (formikProps: FormikProps<UpdateUserDataType>) => {
    if (!newAvatarFile) return errorToaster();
    formikProps.setFieldValue('avatar', URL.createObjectURL(newAvatarFile));
    setNewAvatarFile(null);
    successToaster();
  };
  function removeSuccessCB(formikProps: FormikProps<UpdateUserDataType>) {
    formikProps.setFieldValue('avatar', null);
    setNewAvatarFile(null);
    successToaster();
    router.reload();
  }
  const SettingsFormFields: EditableFieldsType<UpdateUserDataType>[] = useMemo(
    () => [
      {
        key: 'full_name',
        label: 'Full Name',
        name: 'full_name',
        helperText:
          'You can update your name once every 30 days with a maximum of 5 times.',
        isLoading: editNameLoading,
        onSubmit: (fp) => updateName(fp),
        onAbort: (fp) => handleAbort(fp, 'full_name'),
        onCancel: (fp) => handleAbort(fp, 'full_name'),
      },
      {
        key: 'bio',
        label: 'Short Bio',
        helperText:
          'This bio will appear on your profile page, so make it short and sweet!',
        name: 'bio',
        placeholder: 'Tell us a little about yourself',
        isLoading: editUserInfoLoading,
        onSubmit: (fp) => onUpdateInfo(fp),
        onAbort: (fp) => handleAbort(fp, 'bio'),
        onCancel: (fp) => handleAbort(fp, 'bio'),
        textarea: true,
      },
    ],
    [updateName, handleAbort, onUpdateInfo]
  );

  return (
    <VStack alignItems='flex-start' w='100%' spacing={5}>
      <Heading fontSize='24px' fontWeight={'bold'}>
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
        onSubmit={() => {}}
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
              {SettingsFormFields.map(
                ({
                  key,
                  label,
                  name,
                  textarea,
                  onSubmit,
                  onAbort,
                  isLoading = false,
                  helperText = '',
                  placeholder,
                }) => {
                  return (
                    <InputFieldWrapper
                      {...{ key, label, name, helperText, placeholder }}
                      labelStyles={{ fontSize: 'md', fontWeight: 'bold' }}
                      required={false}
                    >
                      <CustomEditableField
                        defaultValue={formikProps.values[key] || ''}
                        {...{
                          label,
                          name,
                          textarea,
                          isLoading,
                          placeholder,
                        }}
                        editableProps={{
                          isPreviewFocusable: false,
                          submitOnBlur: false,
                          onSubmit: () => onSubmit(formikProps),
                          onAbort: () => onAbort(formikProps),
                          onCancel: () => onAbort(formikProps),
                        }}
                      />
                    </InputFieldWrapper>
                  );
                }
              )}

              <InputFieldWrapper
                label='Your Avatar'
                name='avatar'
                helperText='Recommended size: at least 1000 pixels per side. File type: JPG, PNG or Webp.'
                labelStyles={{ fontSize: 'md', fontWeight: 'bold', mb: 5 }}
                required={false}
              >
                <ChangeAvatarComponents
                  {...{
                    newAvatarFile,
                    user,
                    currentUserAvatarURL: user.avatar?.url,
                    onChange: handleChangeAvatar,
                    uploadSuccessCB: () => uploadSuccessCB(formikProps),
                    removeSuccessCB: () => removeSuccessCB(formikProps),
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
