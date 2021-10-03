import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Layout } from 'components/Layout';
import {
  Breeds,
  PetGender,
  PetSize,
  PetType,
  useCreateAdoptionPostMutation,
} from 'generated/graphql';
import React from 'react';
import withApollo from 'utils/withApollo';

interface missingPetsProps {}

const MissingPetsPage: React.FC<missingPetsProps> = ({}) => {
  const [images, setImages] = React.useState<FileList | null>(null);
  const [petInfo] = React.useState({
    name: 'testing',
    type: PetType.Cat,
    gender: PetGender.Male,
    size: PetSize.Small,
    birthDate: new Date(),
    about: 'Lovely',

    breeds: [Breeds.Huskey],
  });
  const [createPostMutation] = useCreateAdoptionPostMutation();
  const createMissingPost = async () => {
    const response = await createPostMutation({
      variables: {
        createAdoptionPostInput: {
          petInfo,
        },
        createAdoptionPostImages: images ? Object.values(images) : [],
      },
    });
    console.log(
      `🚀 ~ file: index.tsx ~ line 34 ~ createMissingPost ~ response`,
      response
    );
  };
  const handleSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      `🚀 ~ file: index.tsx ~ line 44 ~ handleSelectFiles ~ event`,
      event.target.files
    );
    setImages(event.target.files);
  };
  return (
    <Layout title='Missing Pets - Paaws'>
      <Input
        type='file'
        onChange={handleSelectFiles}
        name='avatar'
        accept='image/*'
        multiple
      />
      <Button onClick={createMissingPost}>Create</Button>
      <p>{JSON.stringify(images, null, 2)}</p>
    </Layout>
  );
};
export default withApollo(MissingPetsPage);
//
