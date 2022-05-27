import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import InputField from 'components/input/InputField';
import { Form, Formik } from 'formik';
import { useIsAuth } from 'hooks/useIsAuth';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import React from 'react';
import withApollo from 'utils/withApollo';

interface BioStepProps {}

const BioStep: React.FC<BioStepProps> = () => {
  const { user, loading } = useIsAuth();

  if (loading) return <LoadingComponent />;

  const hasBio: boolean = !!(user && user.bio && user.bio !== '');

  return (
    <CompleteInfoLayout pageTitle='Add Your Bio - Paaws'>
      <VStack h='100%' align='center' justify={'center'}>
        <Formik
          initialValues={{ bio: hasBio ? user?.bio : '' }}
          onSubmit={({ bio }) => {
            console.log(`🚀 ~ file: bio.tsx ~ line 22 ~ bio`, bio);
          }}
        >
          {() => (
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
                <Button colorScheme={'teal'} type='submit' fontSize='sm'>
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
