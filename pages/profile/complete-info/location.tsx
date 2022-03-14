import { Box, Button, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import { useUpdateUserInfoMutation } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import { UserLocationStep } from 'modules/auth/register/UserLocationStep';
import CompleteInfoLayout from 'modules/profile/complete-info/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { LocationType } from 'types';
import withApollo from 'utils/withApollo';

interface SelectILocationPageProps {}

const SelectLocationPage: React.FC<SelectILocationPageProps> = ({}) => {
  const { user } = useIsAuth();
  const router = useRouter();
  const toaster = useToast();
  const [coords, setCoords] = useState<LocationType>();

  const [updateUserInfo, { loading }] = useUpdateUserInfoMutation();

  const handleChange = (c: LocationType) => {
    setCoords(c);
  };

  const handleSubmitLocation = async () => {
    if (!user || !coords?.lat || !coords.lng) return;
    const { data } = await updateUserInfo({
      variables: { updateUserUpdateOptions: { ...coords } },
    });

    if (data?.updateUser) return router.push('/');
    return toaster({
      status: 'error',
      title: 'An error occurred while updating your location',
      description:
        'We could not update your location at this time. Please try again later.',
      position: 'top-right',
      variant: 'subtle',
      isClosable: true,
    });
  };

  return (
    <CompleteInfoLayout pageTitle='Select your Location - Paaws'>
      <VStack
        flex={['1', '.75', '.75', '.75']}
        w='100%'
        align={'flex-start'}
        spacing={5}
      >
        <VStack align='flex-start' w='100%'>
          <Heading size='md'>Set your location</Heading>
          <Text color='gray.500' fontSize='sm' maxW='65ch'>
            We will be using your location to send you notifications if a pet
            was lost or found near you, And you can turn off these notifications
            anytime you want
          </Text>
        </VStack>
        <Box
          overflow={'hidden'}
          borderRadius={4}
          boxShadow='base'
          pos={'relative'}
          w='80%'
          h='550px'
        >
          <UserLocationStep handleChange={handleChange} />
        </Box>
        <Button
          colorScheme={'teal'}
          onClick={handleSubmitLocation}
          isLoading={loading}
          px={4}
          fontSize='sm'
        >
          Save Location
        </Button>
      </VStack>
    </CompleteInfoLayout>
  );
};
export default withApollo(SelectLocationPage);
