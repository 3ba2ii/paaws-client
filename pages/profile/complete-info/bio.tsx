import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import InputField from 'components/input/InputField';
import { Form, Formik } from 'formik';
import { useUpdateUserInfoMutation } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { getUrlBaseOnUserInfo } from 'utils/getUrlBasedOnUserInfo';
import withApollo from 'utils/withApollo';

interface BioStepProps {}

const BioStep: React.FC<BioStepProps> = () => {
  const { user, loading } = useIsAuth();
  const [updateUser] = useUpdateUserInfoMutation();
  const router = useRouter();
  const toaster = useToast();

  if (loading) return <LoadingComponent />;

  const hasBio: boolean = !!(user && user.bio && user.bio !== '');

  return (
    <CompleteInfoLayout pageTitle='Add Your Bio - Paaws'>
      <VStack h='100%' align='center' justify={'center'}>
        <Formik
          initialValues={{ bio: hasBio ? user?.bio : '' }}
          onSubmit={async ({ bio }) => {
            console.log(`🚀 ~ file: bio.tsx ~ line 22 ~ bio`, bio);
            const { data } = await updateUser({
              variables: { updateUserUpdateOptions: { bio } },
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

            return router.push(getUrlBaseOnUserInfo(user, 'bio'));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack align='flex-start' w='100%' spacing={5}>
                <Box minW='450px' w='100%'>
                  <InputField
                    label='Bio'
                    name='bio'
                    textarea
                    helperText='This bio will show up on your profile page'
                  />
                </Box>
                <Button
                  isLoading={isSubmitting}
                  colorScheme={'teal'}
                  type='submit'
                  fontSize='sm'
                >
                  {hasBio ? 'Update Bio' : 'Add Bio'}
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </VStack>
    </CompleteInfoLayout>
  );
};
export default withApollo(BioStep);
