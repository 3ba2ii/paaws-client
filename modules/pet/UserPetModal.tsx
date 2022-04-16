import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import CustomCarousel from 'components/common/media/CustomCarousel';
import NotFound from 'components/NotFound';
import { useUserOwnedPetQuery } from 'generated/graphql';
import React from 'react';
import { CarouselProps } from 'react-responsive-carousel';

interface UserPetModalProps {
  petId: number;
}

const UserPetModal: React.FC<UserPetModalProps> = ({ petId }) => {
  const { data, loading } = useUserOwnedPetQuery({
    variables: { userOwnedPetId: petId },
  });
  console.log(`🚀 ~ file: UserPetModal.tsx ~ line 10 ~ data`, data);
  if (loading) return <LoadingComponent />;
  if (!data || !data.userOwnedPet)
    return (
      <NotFound
        title='404 Not Found'
        subtitle='We could not find a pet with this URL, Please try again later or try changing the url.'
      />
    );

  const { about, pet, user } = data.userOwnedPet;
  return (
    <HStack
      bg='red'
      w='100%'
      h='100%'
      padding={0}
      pos='relative'
      overflow={'hidden'}
    >
      <Box w='100%' h='100%' flex='.75' bg='blue' position={'relative'}>
        <VStack w='100%' h='100%' align='center' justify={'center'} bg='#000'>
          {pet.images && (
            <CustomCarousel
              carouselProps={
                {
                  showThumbs: false,
                  useKeyboardArrows: true,
                } as CarouselProps
              }
              images={pet.images.map((p) => p.photo?.url || '')}
              boxProps={{ borderRadius: 0 }}
            />
          )}
        </VStack>
      </Box>
      <VStack>
        <Heading>{pet.name}</Heading>
      </VStack>
    </HStack>
  );
};
export default UserPetModal;
