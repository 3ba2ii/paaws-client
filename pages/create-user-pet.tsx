import {
  Breeds,
  PetColors,
  PetGender,
  PetSize,
  PetType,
  useCreateUserOwnedPetMutation,
  useDeleteUserOwnedPetMutation,
} from 'generated/graphql';
import React, { useState } from 'react';
import withApollo from 'utils/withApollo';

interface CreateUserPetProps {}

const CreateUserPet: React.FC<CreateUserPetProps> = ({}) => {
  const [images, setImages] = useState<FileList | null>(null);
  const [createUserOwnedPet] = useCreateUserOwnedPetMutation();
  const [deletePet] = useDeleteUserOwnedPetMutation();
  const onCreatePet = async (e: any) => {
    e.preventDefault();
    if (!images) return;
    await createUserOwnedPet({
      variables: {
        petInfo: {
          about: 'Fugiat voluptate veniam culpa veniam com.',
          birthDate: new Date(),
          name: 'Kitty Cat',
          breeds: [Breeds.Bulldog, Breeds.Bulldog],
          colors: [PetColors.Blue, PetColors.Green],
          size: PetSize.Medium,
          type: PetType.Cat,
          gender: PetGender.Male,
          thumbnailIdx: 0,
        },
        images,
      },
    });
  };
  const handleDelete = async () => {
    await deletePet({ variables: { petId: 1 } });
  };
  return (
    <form onSubmit={onCreatePet}>
      <input
        onChange={(e) => {
          setImages(e.target.files);
        }}
        type='file'
        multiple
      />
      <button type='submit'>Submit</button>
      <button onClick={handleDelete}>Delete</button>
    </form>
  );
};
export default withApollo(CreateUserPet);
