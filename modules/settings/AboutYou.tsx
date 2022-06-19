import {
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import InputFieldWrapper from 'components/input/CustomInputComponent';
import SelectAvatarComponent from 'components/SelectAvatarComponent';
import { Field, Form, Formik } from 'formik';
import { MeQuery } from 'generated/graphql';
import React from 'react';
import { AboutYouSchema } from 'utils/yupSchemas/SettingsSchema';

interface AboutYouProps {
  user: MeQuery['me'];
}

const AboutYouSettings: React.FC<AboutYouProps> = ({ user }) => {
  if (!user) return null;
  const [newAvatar, setNewAvatar] = React.useState<File | null>(null);
  return (
    <VStack align='flex-start' w='100%' spacing={5}>
      <Heading fontSize='24px' fontWeight={'semibold'}>
        About you
      </Heading>
      <Divider />
      <Formik
        initialValues={{
          name: user.full_name,
          bio: user.bio,
          avatar: user.avatar?.url || null,
          email: user.email,
        }}
        onSubmit={({ name, bio, email }) => {
          console.log(name, bio, email);
        }}
        validationSchema={AboutYouSchema}
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
            <VStack spacing={10} maxW='600px'>
              <InputFieldWrapper
                label='Name'
                name='name'
                helperText='This value will appear on your profile'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold' }}
                required={false}
              >
                <Field
                  as={Input}
                  variant='flushed'
                  id='name'
                  name='name'
                  opacity='.8'
                />
              </InputFieldWrapper>

              <InputFieldWrapper
                label='Email Address'
                name='email'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold' }}
                required={false}
              >
                <Field
                  as={Input}
                  variant='flushed'
                  id='email'
                  name='email'
                  opacity='.8'
                  type='email'
                />
                <HStack my={3} w='100%' align='center'>
                  <Button color={'blue.600'} size='sm' variant='link'>
                    Verify now
                  </Button>
                </HStack>
              </InputFieldWrapper>

              <InputFieldWrapper
                label='User Avatar'
                name='avatar'
                helperText='Recommended size: at least 1000 pixels per side. File type: JPG, PNG or GIF.'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold', mb: 5 }}
                required={false}
              >
                <Field
                  as={() => (
                    <SelectAvatarComponent
                      user={user}
                      avatarURL={
                        newAvatar
                          ? URL.createObjectURL(newAvatar)
                          : user.avatar?.url
                      }
                      onChange={(file) => setNewAvatar(file)}
                      avatarProps={{ size: '2xl' }}
                    />
                  )}
                  variant='flushed'
                  id='avatar'
                  name='Avatar'
                  opacity='.8'
                />
              </InputFieldWrapper>
              <InputFieldWrapper
                label='Short Bio'
                name='bio'
                helperText='This bio will appear on your Profile page, so make it short and sweet.'
                labelStyles={{ fontSize: 'md', fontWeight: 'semibold' }}
                required={false}
              >
                <Field
                  as={Textarea}
                  variant='flushed'
                  id='bio'
                  name='bio'
                  opacity='.8'
                />
              </InputFieldWrapper>
            </VStack>
            <HStack mt={'5rem'} w='100%' justify='flex-end'>
              <Button variant='ghost'>Cancel</Button>
              <Button colorScheme='teal' type='submit'>
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
