import { Button, GridItem, SimpleGrid, VStack } from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { useUserOwnedPetsQuery } from 'generated/graphql';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { OwnedPetCard } from './OwnedPetCard';

interface OwnedPetsGridProps {
  userId: number;
}

const OwnedPetsGrid: React.FC<OwnedPetsGridProps> = ({ userId }) => {
  const { data, fetchMore, loading, variables } = useUserOwnedPetsQuery({
    variables: { userId, paginationArgs: { cursor: null, limit: 6 } },
    notifyOnNetworkStatusChange: true,
  });

  const fetchMorePets = async () => {
    if (!data) return;
    const {
      userOwnedPets: { ownedPets, hasMore },
    } = data;
    if (!hasMore) return;

    const newCursor = ownedPets[ownedPets.length - 1].createdAt;
    await fetchMore({
      variables: {
        ...variables,
        paginationArgs: { cursor: newCursor, limit: 6 },
      },
    });
  };
  return (
    <VStack w='100%'>
      <SimpleGrid
        w='100%'
        minChildWidth={['220px', '220px', '220px', 'calc(100% / 3.5)']}
        spacing='30px'
      >
        {loading ? (
          <LoadingComponent />
        ) : data && data.userOwnedPets ? (
          data.userOwnedPets.ownedPets?.map(({ pet, petId }) => (
            <GridItem
              w='100%'
              h='100%'
              css={{ aspectRatio: '1' }}
              key={petId + userId}
            >
              <OwnedPetCard pet={pet} />
            </GridItem>
          ))
        ) : null}
      </SimpleGrid>
      {data?.userOwnedPets.hasMore && (
        <Button
          leftIcon={<BsThreeDots />}
          w='fit-content'
          onClick={fetchMorePets}
        >
          Load More
        </Button>
      )}
    </VStack>
  );
};
export default OwnedPetsGrid;
