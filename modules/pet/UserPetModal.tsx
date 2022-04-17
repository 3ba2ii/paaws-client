import {
  Box,
  GridItem,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import CustomCarousel from 'components/common/media/CustomCarousel';
import NotFound from 'components/NotFound';
import { format, formatDistanceToNow } from 'date-fns';
import el from 'date-fns/esm/locale/el/index.js';
import { UserOwnedPetQuery, useUserOwnedPetQuery } from 'generated/graphql';
import React, { useEffect } from 'react';
import { CarouselProps } from 'react-responsive-carousel';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';
import PetInfoCard from './PetInfoCard';

const PetInfoCardsRow: React.FC<{
  userPet: UserOwnedPetQuery['userOwnedPet'];
}> = ({ userPet }) => {
  const [cardsInfo, setCardsInfo] =
    React.useState<{ label: string; value: string }[]>();
  const [isAgeShown, setIsAgeShown] = React.useState(false);

  const toggleShowAge = () => {
    setIsAgeShown(!isAgeShown);
  };

  useEffect(() => {
    if (!userPet?.pet) return;
    const { gender, birthDate, size, colors } = userPet.pet;
    setCardsInfo([
      { label: 'Gender', value: gender },
      {
        label: isAgeShown ? 'Age' : 'Birthdate',
        value: isAgeShown
          ? formatDistanceToNow(new Date(birthDate))
          : format(new Date(birthDate), 'dd.MM.yy'),
      },
      { label: 'Size', value: size },
      { label: 'Colors', value: colors.map((c) => c.color).join(', ') },
    ]);
  }, [isAgeShown]);

  return (
    <HStack h='88px' w='100%' overflow='auto'>
      {cardsInfo?.map((ci, index) => (
        <Box
          key={index}
          w='100%'
          h='100%'
          onClick={() =>
            ['Age', 'Birthdate'].includes(ci.label) && toggleShowAge()
          }
        >
          <PetInfoCard {...ci} />
        </Box>
      ))}
    </HStack>
  );
};

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
    <SimpleGrid
      gridTemplateColumns={'3fr 1fr'}
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
      <GridItem
        display={'flex'}
        flexDir='column'
        w='100%'
        h='100%'
        align='flex-start'
        p={4}
        py={10}
        css={{ gap: '40px' }}
      >
        <VStack w='100%' align='flex-start'>
          <Heading size='lg' color='gray.700'>
            {pet.name}
          </Heading>
          <HStack align='center' justify='center' spacing='4px'>
            <Text fontSize='16px' color='blue.500' fontWeight={'semibold'}>
              {capitalizeTheFirstLetterOfEachWord(pet.type)} -{' '}
            </Text>
            {pet.breeds.map((b, index) => (
              <Link
                fontSize={'16px'}
                color='blue.500'
                colorScheme={'blue'}
                fontWeight='semibold'
              >
                {capitalizeTheFirstLetterOfEachWord(
                  b.breed + (index === pet.breeds.length - 1 ? '' : ',')
                )}
              </Link>
            ))}
          </HStack>
          <HStack>
            <Tag size='sm' variant='subtle' colorScheme='blue'>
              Playful
            </Tag>
            <Tag size='sm' variant='subtle' colorScheme='pink'>
              Cheerful
            </Tag>
            <Tag size='sm' variant='subtle' colorScheme='purple'>
              Ball-Catcher
            </Tag>
          </HStack>
        </VStack>
        <VStack w='100%' align='flex-start' spacing={4}>
          <Heading size='md' color='gray.700'>
            Pet Information
          </Heading>
          <PetInfoCardsRow userPet={data.userOwnedPet} />
        </VStack>

        <VStack align='flex-start'>
          <Heading size='md' color='gray.700'>
            About {pet.name}
          </Heading>
          <Text textStyle={'p1'}>
            {about}Quis anim exercitation est in id. Quis id consequat do qui.
            Proident quis nulla eu ex ea velit consequat amet consectetur
            proident fugiat. Reprehenderit aliquip pariatur sint qui proident
            sint ea. Ea culpa laboris cillum minim veniam voluptate amet nostrud
            deserunt. Quis anim exercitation est in id. Quis id consequat do
            qui. Proident quis nulla eu ex ea velit consequat amet consectetur
            proident fugiat. Reprehenderit aliquip pariatur sint qui proident
            sint ea. Ea culpa laboris cillum minim veniam voluptate amet nostrud
            deserunt.
          </Text>
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
};
export default UserPetModal;
