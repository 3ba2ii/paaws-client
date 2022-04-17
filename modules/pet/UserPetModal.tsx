import { Center, GridItem, SimpleGrid } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import CustomCarousel from 'components/common/media/CustomCarousel';
import NotFound from 'components/NotFound';
import { useUserOwnedPetQuery } from 'generated/graphql';
import React from 'react';
import { CarouselProps } from 'react-responsive-carousel';
import UserPetInfoColumn from './UserPetInfoColumn';

interface UserPetModalProps {
  petId: number;
}

const UserPetModal: React.FC<UserPetModalProps> = ({ petId }) => {
  const { data, loading } = useUserOwnedPetQuery({
    variables: { userOwnedPetId: petId },
  });
  if (loading)
    return (
      <Center minW='300px' minH='500px' w='100%' h='100%'>
        <LoadingComponent />
      </Center>
    );
  if (!data || !data.userOwnedPet)
    return (
      <Center minW='300px' minH='500px' w='100%' h='100%'>
        <NotFound
          title='404 Not Found'
          subtitle='We could not find a pet with this URL, Please try again later or try changing the url.'
          includeBackButton={false}
        />
      </Center>
    );

  const { pet } = data.userOwnedPet;
  return (
    <SimpleGrid
      gridTemplateColumns={['auto-fit 1.5fr', '2.5fr 1.5fr']}
      w='100%'
      h='100%'
      padding={0}
      pos='relative'
      overflow={'hidden'}
      css={{ gap: '12px' }}
    >
      <GridItem
        w='100%'
        h='100%'
        flex='.65'
        position={'relative'}
        display='grid'
        placeItems={'center'}
        bg='#000'
      >
        {pet.images?.length && (
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
      </GridItem>
      <UserPetInfoColumn userOwnedPet={data.userOwnedPet} />
    </SimpleGrid>
  );
};
export default UserPetModal;
