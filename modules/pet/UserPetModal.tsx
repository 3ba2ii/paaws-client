import {
  Box,
  Heading,
  HStack,
  Link,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LoadingComponent } from 'components/common/loading/LoadingSpinner';
import CustomCarousel from 'components/common/media/CustomCarousel';
import NotFound from 'components/NotFound';
import { useUserOwnedPetQuery } from 'generated/graphql';
import React from 'react';
import { CarouselProps } from 'react-responsive-carousel';
import { capitalizeTheFirstLetterOfEachWord } from 'utils/capitalizeString';

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
    <HStack w='100%' h='100%' padding={0} pos='relative' overflow={'hidden'}>
      <Box
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
      </Box>
      <VStack
        flex='.35'
        w='100%'
        h='100%'
        align='flex-start'
        p={4}
        py={10}
        spacing={10}
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
            <Tag variant='subtle' colorScheme='blue'>
              Playful
            </Tag>
            <Tag variant='subtle' colorScheme='pink'>
              Cheerful
            </Tag>
            <Tag variant='subtle' colorScheme='purple'>
              Ball-Catcher
            </Tag>
          </HStack>
        </VStack>
        <VStack w='100%' align='flex-start'>
          <Heading size='md' color='gray.700'>
            Pet Information
          </Heading>
          <HStack h='88px' w='100%' overflow='auto'>
            <VStack
              align='flex-start'
              border='1px solid'
              borderColor='gray.300'
              borderRadius={'14px'}
              minW='95px'
              h='100%'
              justify={'center'}
              spacing={0}
              pl={2}
              css={{ aspectRatio: '1' }}
            >
              <Text fontSize='90%' color='gray.500' fontWeight={'medium'}>
                Gender
              </Text>
              <Heading fontSize={'100%'} color='gray.700'>
                Female
              </Heading>
            </VStack>
            <VStack
              align='flex-start'
              border='1px solid'
              borderColor='gray.300'
              borderRadius={'14px'}
              minW='95px'
              h='100%'
              justify={'center'}
              spacing={0}
              pl={2}
              css={{ aspectRatio: '1' }}
            >
              <Text fontSize={'90%'} color='gray.500' fontWeight={'medium'}>
                Birthdate
              </Text>
              <Heading fontSize={'100%'} color='gray.700'>
                12. Aug 2022
              </Heading>
            </VStack>
            <VStack
              align='flex-start'
              border='1px solid'
              borderColor='gray.300'
              borderRadius={'14px'}
              minW='95px'
              h='100%'
              justify={'center'}
              spacing={0}
              pl={2}
              css={{ aspectRatio: '1' }}
            >
              <Text fontSize={'90%'} color='gray.500' fontWeight={'medium'}>
                Size
              </Text>
              <Heading fontSize={'100%'} color='gray.700'>
                Large
              </Heading>
            </VStack>
            <VStack
              align='flex-start'
              border='1px solid'
              borderColor='gray.300'
              borderRadius={'14px'}
              minW='95px'
              h='100%'
              justify={'center'}
              spacing={0}
              pl={2}
              css={{ aspectRatio: '1' }}
            >
              <Text fontSize={'90%'} color='gray.500' fontWeight={'medium'}>
                Colors
              </Text>
              <Heading fontSize={'100%'} color='gray.700'>
                Yellow
              </Heading>
            </VStack>
          </HStack>
        </VStack>

        <VStack align='flex-start'>
          <Heading size='md' color='gray.700'>
            About {pet.name}
          </Heading>
          <Text textStyle={'p1'}>
            Quis anim exercitation est in id. Quis id consequat do qui. Proident
            quis nulla eu ex ea velit consequat amet consectetur proident
            fugiat. Reprehenderit aliquip pariatur sint qui proident sint ea. Ea
            culpa laboris cillum minim veniam voluptate amet nostrud deserunt.
            Quis anim exercitation est in id. Quis id consequat do qui. Proident
            quis nulla eu ex ea velit consequat amet consectetur proident
            fugiat. Reprehenderit aliquip pariatur sint qui proident sint ea. Ea
            culpa laboris cillum minim veniam voluptate amet nostrud deserunt.
          </Text>
        </VStack>
      </VStack>
    </HStack>
  );
};
export default UserPetModal;
