import {
  Button,
  Divider,
  EditableProps,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
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
type EditableFieldsType = {
  key: keyof UpdateUserDataType;
  label: string;
  name: string;
  onSubmit: (formikProps: FormikProps<UpdateUserDataType>) => void;
  onAbort: (formikProps: FormikProps<UpdateUserDataType>) => void;
  onCancel: (formikProps: FormikProps<UpdateUserDataType>) => void;
  helperText?: string;
  textarea?: boolean;
  editableProps?: EditableProps;
};

const AboutYouSettings: React.FC<AboutYouProps> = ({ user }) => {
  if (!user) return null;
  const [newAvatar, setNewAvatar] = React.useState<File | null>(null);

  const toaster = useToast();
  const [updateUserName] = useUpdateUserFullNameMutation();
  const [updateUserAvatar, { loading: isUploadingImage }] =
    useUploadAvatarMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const handleAbort = (
    fp: FormikProps<UpdateUserDataType>,
    af: keyof UpdateUserDataType
  ) => {
    fp.setFieldValue(af, fp.initialValues[af]);
  };

  const successToaster = () => {
    return toaster({
      id: 'success-toast',
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
      id: 'success-toast',
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

    if (initialFullName.trim() === full_name.trim()) {
      return;
    }
    handleAbort(formikProps, 'full_name');

    await updateUserName({
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
          errorToaster();
          return;
        }
        updateMeQueryCache(cache, { ...user, bio: values.bio });
        successToaster();
      },
    });
  };
  const onUploadUserAvatar = async () => {
    if (!newAvatar) return;

    await updateUserAvatar({
      variables: { uploadAvatarImage: newAvatar },
      update: (cache, { data: result }) => {
        if (
          result &&
          result.uploadAvatar.url &&
          !result?.uploadAvatar.errors?.length
        ) {
          /* success case */
          updateMeQueryCache(cache, {
            ...user,
            avatar: { url: result.uploadAvatar.url, id: Math.random() * 110 },
          });
          return successToaster();
        }

        errorToaster();
      },
    });
  };

  const aboutYouSettingsFormFields: EditableFieldsType[] = [
    {
      key: 'full_name',
      label: 'Full Name',
      name: 'full_name',
      helperText:
        'You can update your name once every 30 days with a maximum of 5 times.',
      onSubmit: (fp) => updateName(fp),
      onAbort: (fp) => handleAbort(fp, 'full_name'),
      onCancel: (fp) => handleAbort(fp, 'full_name'),
    },
    {
      key: 'bio',
      label: 'Short Bio',
      name: 'bio',
      onSubmit: (fp) => onUpdateInfo(fp),
      onAbort: (fp) => handleAbort(fp, 'bio'),
      onCancel: (fp) => handleAbort(fp, 'bio'),
      textarea: true,
    },
  ];

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
        onSubmit={() => {}}
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
              <Text>{JSON.stringify(formikProps.values, null, 2)}</Text>
              {aboutYouSettingsFormFields.map((fieldData) => {
                return (
                  <InputFieldWrapper
                    key={fieldData.key}
                    label={fieldData.label}
                    name={fieldData.name}
                    helperText={fieldData.helperText || ''}
                    labelStyles={{ fontSize: 'md', fontWeight: 'semibold' }}
                    required={false}
                  >
                    <CustomEditableField
                      defaultValue={formikProps.values[fieldData.key] || ''}
                      label={fieldData.label}
                      name={fieldData.name}
                      textarea={fieldData.textarea}
                      editableProps={{
                        isPreviewFocusable: false,
                        submitOnBlur: false,
                        onSubmit: () => fieldData.onSubmit(formikProps),
                        onAbort: () => fieldData.onAbort(formikProps),
                        onCancel: () => fieldData.onAbort(formikProps),
                        ...fieldData.editableProps,
                      }}
                    />
                  </InputFieldWrapper>
                );
              })}

              <InputFieldWrapper
                label='Your Avatar'
                name='avatar'
                helperText='Recommended size: at least 1000 pixels per side. File type: JPG, PNG or GIF.'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold', mb: 5 }}
                required={false}
              >
                <HStack align='center' spacing={5}>
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
                        avatarProps={{ size: '2xl', borderRadius: 0 }}
                      />
                    )}
                    variant='flushed'
                    id='avatar'
                    name='Avatar'
                    opacity='.8'
                    shouldUpdate={(
                      nextProps: { formik: FormikProps<UpdateUserDataType> },
                      currentProps: { formik: FormikProps<UpdateUserDataType> }
                    ) =>
                      nextProps.formik.values.avatar !==
                      currentProps.formik.values.avatar
                    }
                  />
                  <VStack w='200px' py={4}>
                    <Button
                      variant='outline'
                      w='100%'
                      size='sm'
                      disabled={!!!newAvatar}
                      isLoading={isUploadingImage}
                      onClick={onUploadUserAvatar}
                    >
                      Upload Photo
                    </Button>
                    <Button
                      variant='link'
                      size='sm'
                      fontWeight={'medium'}
                      colorScheme='red'
                    >
                      Remove Photo
                    </Button>
                  </VStack>
                </HStack>
              </InputFieldWrapper>
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};
export default AboutYouSettings;
