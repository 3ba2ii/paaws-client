import { Maybe, PetType } from 'generated/graphql';

export type OwnedPetType = {
  __typename?: 'OwnedPet';
  id: number;
  userId: number;
  petId: number;
  createdAt: any;
  pet: {
    __typename?: 'Pet';
    id: number;
    updatedAt: any;
    createdAt: any;
    name: string;
    type: PetType;
    birthDate: any;
    thumbnail?: Maybe<{ __typename?: 'Photo'; url?: Maybe<string> }>;
  };
};
