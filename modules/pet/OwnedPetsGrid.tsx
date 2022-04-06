import {
  Box,
  Button,
  GridItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import { UserOwnedPetsQuery, useUserOwnedPetsQuery } from 'generated/graphql';
import React from 'react';

interface OwnedPetsGridProps {
  userId: number;
}

interface IOwnedPetCardProps {
  pet: UserOwnedPetsQuery['userOwnedPets']['ownedPets'][0]['pet'];
}

const OwnedPetCard: React.FC<IOwnedPetCardProps> = ({ pet }) => {
  return (
    <Box
      w='100%'
      h='100%'
      background={`url(${pet.thumbnail?.url}), #C4C4C4;`}
      backgroundSize='contain'
      css={{ boxShadow: 'inset 0px -50px 30px -11px rgba(0, 0, 0, 0.75);' }}
      p={4}
      display='flex'
      flexDir='column'
      justifyContent={'end'}
      border='1px solid'
      borderColor={'gray.50'}
      cursor='pointer'
      _hover={{ filter: 'brightness(50%)' }}
      transition='filter .2s ease-in-out'
    >
      <Text fontSize='xl' fontWeight={'bold'} color='whiteAlpha.800'>
        {pet.name}
      </Text>
      <Text fontSize='sm' fontWeight={'semibold'} color='whiteAlpha.800'>
        10 months
      </Text>
    </Box>
  );
};

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
        <Button w='fit-content' onClick={fetchMorePets}>
          Load More
        </Button>
      )}
    </VStack>
  );
};
export default OwnedPetsGrid;
