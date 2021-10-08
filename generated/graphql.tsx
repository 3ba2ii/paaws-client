import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type AdoptionPetsFilters = {
  petGenders?: Maybe<Array<PetGender>>;
  petSizes?: Maybe<Array<PetSize>>;
  petTypes?: Maybe<Array<PetType>>;
};

export type AdoptionPost = {
  __typename?: 'AdoptionPost';
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  pet: Pet;
  petId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Int'];
};

export type AdoptionPostInput = {
  address?: Maybe<AddressInput>;
  petInfo: CreatePetOptions;
};

export type AdoptionPostResponse = {
  __typename?: 'AdoptionPostResponse';
  adoptionPost?: Maybe<AdoptionPost>;
  errors?: Maybe<Array<FieldError>>;
};

export type AdoptionPostUpdateInput = {
  about?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['DateTime']>;
  breeds?: Maybe<Array<Breeds>>;
  gender?: Maybe<PetGender>;
  name?: Maybe<Scalars['String']>;
  neutered?: Maybe<Scalars['Boolean']>;
  size?: Maybe<PetSize>;
  spayed?: Maybe<Scalars['Boolean']>;
  type?: Maybe<PetType>;
  vaccinated?: Maybe<Scalars['Boolean']>;
};

/** Basic Pet Breeds */
export enum Breeds {
  Bulldog = 'BULLDOG',
  Huskey = 'HUSKEY'
}

export type ChangePasswordInput = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

export type CreatePetOptions = {
  about: Scalars['String'];
  birthDate: Scalars['DateTime'];
  breeds: Array<Breeds>;
  gender: PetGender;
  name: Scalars['String'];
  neutered?: Maybe<Scalars['Boolean']>;
  size: PetSize;
  spayed?: Maybe<Scalars['Boolean']>;
  thumbnailIdx: Scalars['Int'];
  type: PetType;
  vaccinated?: Maybe<Scalars['Boolean']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  code: Scalars['Float'];
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FindNearestUsersInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  radius: Scalars['Float'];
};

export type ImageMetaData = {
  __typename?: 'ImageMetaData';
  pathName: Scalars['String'];
  photo: Photo;
  uniqueFileName: Scalars['String'];
  user: User;
};

export type LoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserTag: Scalars['Boolean'];
  changePassword: ChangePasswordResponse;
  createAdoptionPost: AdoptionPostResponse;
  createPet: PetResponse;
  createPhoto: ImageMetaData;
  deleteAdoptionPost: Scalars['Boolean'];
  deletePet: RegularResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendOTP: RegularResponse;
  updateAdoptionPost: AdoptionPostResponse;
  updateUser: Scalars['Boolean'];
  uploadAvatar: UploadImageResponse;
};


export type MutationAddUserTagArgs = {
  tag: UserTagsType;
};


export type MutationChangePasswordArgs = {
  options: ChangePasswordInput;
};


export type MutationCreateAdoptionPostArgs = {
  images: Array<Scalars['Upload']>;
  input: AdoptionPostInput;
};


export type MutationCreatePetArgs = {
  createPetOptions: CreatePetOptions;
};


export type MutationCreatePhotoArgs = {
  image: Scalars['Upload'];
};


export type MutationDeleteAdoptionPostArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePetArgs = {
  petId: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  identifier: Scalars['String'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  registerOptions: RegisterOptions;
};


export type MutationSendOtpArgs = {
  email: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationUpdateAdoptionPostArgs = {
  id: Scalars['Int'];
  newPetInfo: AdoptionPostUpdateInput;
};


export type MutationUpdateUserArgs = {
  updateOptions: UpdateUserInfo;
};


export type MutationUploadAvatarArgs = {
  image: Scalars['Upload'];
};

export type PaginatedAdoptionPosts = {
  __typename?: 'PaginatedAdoptionPosts';
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
  posts: Array<AdoptionPost>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
  users: Array<User>;
};

export type Pet = {
  __typename?: 'Pet';
  about: Scalars['String'];
  birthDate: Scalars['DateTime'];
  breeds: Array<PetBreed>;
  createdAt: Scalars['DateTime'];
  gender: PetGender;
  id: Scalars['Int'];
  images?: Maybe<Array<PetImages>>;
  name: Scalars['String'];
  neutered?: Maybe<Scalars['Boolean']>;
  size: PetSize;
  spayed?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<Photo>;
  thumbnailId?: Maybe<Scalars['Int']>;
  type: PetType;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Int'];
  vaccinated?: Maybe<Scalars['Boolean']>;
};

export type PetBreed = {
  __typename?: 'PetBreed';
  breed: Breeds;
  pet: Pet;
  petId: Scalars['Float'];
};

/** Basic Pet Gender */
export enum PetGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type PetImages = {
  __typename?: 'PetImages';
  pet: Pet;
  petId: Scalars['Int'];
  photo: Photo;
  photoId: Scalars['Int'];
};

export type PetResponse = {
  __typename?: 'PetResponse';
  errors?: Maybe<Array<FieldError>>;
  pet?: Maybe<Pet>;
};

/** Basic Pet Size */
export enum PetSize {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

/** Basic Pet Type */
export enum PetType {
  Cat = 'CAT',
  Dog = 'DOG',
  Rabbit = 'RABBIT'
}

export type Photo = {
  __typename?: 'Photo';
  createdAt: Scalars['DateTime'];
  creator: User;
  filename: Scalars['String'];
  id: Scalars['Int'];
  isOnDisk: Scalars['Boolean'];
  isThumbnail: Scalars['Boolean'];
  path: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  adoptionPost?: Maybe<AdoptionPost>;
  adoptionPosts: PaginatedAdoptionPosts;
  getNearestLocations?: Maybe<Array<User>>;
  isValidToken: Scalars['Boolean'];
  me?: Maybe<User>;
  pet?: Maybe<Pet>;
  pets: Array<Pet>;
  user?: Maybe<User>;
  users: PaginatedUsers;
  usersCount: Scalars['Int'];
};


export type QueryAdoptionPostArgs = {
  id: Scalars['Int'];
};


export type QueryAdoptionPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  filters?: Maybe<AdoptionPetsFilters>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetNearestLocationsArgs = {
  options: FindNearestUsersInput;
};


export type QueryIsValidTokenArgs = {
  token: Scalars['String'];
};


export type QueryPetArgs = {
  petId: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  where: WhereClause;
};

export type RegisterOptions = {
  email: Scalars['String'];
  full_name: Scalars['String'];
  otp: Scalars['Int'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type RegularResponse = {
  __typename?: 'RegularResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateUserInfo = {
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
};

export type UploadImageResponse = {
  __typename?: 'UploadImageResponse';
  errors?: Maybe<Array<FieldError>>;
  url?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  adoptionPosts?: Maybe<Array<AdoptionPost>>;
  avatar?: Maybe<Photo>;
  avatarId?: Maybe<Scalars['Int']>;
  bio?: Maybe<Scalars['String']>;
  blocked: Scalars['Boolean'];
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favorites?: Maybe<Array<UserFavorites>>;
  full_name: Scalars['String'];
  id: Scalars['Int'];
  last_login?: Maybe<Scalars['DateTime']>;
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
  pets?: Maybe<Array<Pet>>;
  phone: Scalars['String'];
  photos?: Maybe<Array<Photo>>;
  provider: Scalars['String'];
  provider_id?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<UserTag>>;
  updatedAt: Scalars['DateTime'];
  userPets?: Maybe<Array<UserPet>>;
};

export type UserFavorites = {
  __typename?: 'UserFavorites';
  petId: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
};

export type UserPet = {
  __typename?: 'UserPet';
  petId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserTag = {
  __typename?: 'UserTag';
  tagName: UserTagsType;
  user: User;
};

/** User Tags Option */
export enum UserTagsType {
  Adopter = 'ADOPTER',
  AnimalFriend = 'ANIMAL_FRIEND',
  AnimalOwner = 'ANIMAL_OWNER',
  AnimalOwnerAdopter = 'ANIMAL_OWNER_ADOPTER',
  AnimalPartner = 'ANIMAL_PARTNER',
  CatPerson = 'CAT_PERSON',
  DogPerson = 'DOG_PERSON'
}

export type WhereClause = {
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type RequiredUserInfoFragment = { __typename?: 'User', id: number, email: string, phone: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number>, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> };

export type CreateAdoptionPostMutationVariables = Exact<{
  petImages: Array<Scalars['Upload']> | Scalars['Upload'];
  postInput: AdoptionPostInput;
}>;


export type CreateAdoptionPostMutation = { __typename?: 'Mutation', createAdoptionPost: { __typename?: 'AdoptionPostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, adoptionPost?: Maybe<{ __typename?: 'AdoptionPost', id: number, userId: number, petId: number, createdAt: any, updatedAt: any, pet: { __typename?: 'Pet', id: number, name: string }, user: { __typename?: 'User', id: number, email: string }, address?: Maybe<{ __typename?: 'Address', distance?: Maybe<number> }> }> } };

export type LoginMutationVariables = Exact<{
  loginOptions: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', code: number, field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', email: string }> } };

export type RegisterMutationVariables = Exact<{
  registerRegisterOptions: RegisterOptions;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, phone: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number>, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> }> } };

export type SendOtpMutationVariables = Exact<{
  sendOtpPhone: Scalars['String'];
  email: Scalars['String'];
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOTP: { __typename?: 'RegularResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, code: number, field: string }>> } };

export type UpdateUserInfoMutationVariables = Exact<{
  updateUserUpdateOptions: UpdateUserInfo;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUser: boolean };

export type UploadAvatarMutationVariables = Exact<{
  uploadAvatarImage: Scalars['Upload'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar: { __typename?: 'UploadImageResponse', url?: Maybe<string>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type AdoptionPostsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type AdoptionPostsQuery = { __typename?: 'Query', adoptionPosts: { __typename?: 'PaginatedAdoptionPosts', hasMore: boolean, posts: Array<{ __typename?: 'AdoptionPost', id: number, createdAt: any, updatedAt: any, pet: { __typename?: 'Pet', id: number, name: string, type: PetType, gender: PetGender, size: PetSize, birthDate: any, images?: Maybe<Array<{ __typename?: 'PetImages', photoId: number, petId: number, photo: { __typename?: 'Photo', url?: Maybe<string> } }>> }, address?: Maybe<{ __typename?: 'Address', distance?: Maybe<number>, country?: Maybe<string>, state?: Maybe<string> }>, user: { __typename?: 'User', full_name: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, email: string, phone: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number>, avatar?: Maybe<{ __typename?: 'Photo', path: string, url?: Maybe<string> }> }> };

export type PaginatedUsersQueryVariables = Exact<{
  usersWhere: WhereClause;
}>;


export type PaginatedUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', hasMore: boolean, users: Array<{ __typename?: 'User', id: number, email: string, phone: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export const RequiredUserInfoFragmentDoc = gql`
    fragment RequiredUserInfo on User {
  id
  email
  phone
  full_name
  confirmed
  blocked
  lng
  lat
  bio
  last_login
  createdAt
  updatedAt
  provider
  provider_id
  avatar {
    url
  }
}
    `;
export const CreateAdoptionPostDocument = gql`
    mutation CreateAdoptionPost($petImages: [Upload!]!, $postInput: AdoptionPostInput!) {
  createAdoptionPost(images: $petImages, input: $postInput) {
    errors {
      field
      message
      code
    }
    adoptionPost {
      id
      userId
      petId
      pet {
        id
        name
      }
      user {
        id
        email
      }
      address {
        distance
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateAdoptionPostMutationFn = Apollo.MutationFunction<CreateAdoptionPostMutation, CreateAdoptionPostMutationVariables>;

/**
 * __useCreateAdoptionPostMutation__
 *
 * To run a mutation, you first call `useCreateAdoptionPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdoptionPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdoptionPostMutation, { data, loading, error }] = useCreateAdoptionPostMutation({
 *   variables: {
 *      petImages: // value for 'petImages'
 *      postInput: // value for 'postInput'
 *   },
 * });
 */
export function useCreateAdoptionPostMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdoptionPostMutation, CreateAdoptionPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdoptionPostMutation, CreateAdoptionPostMutationVariables>(CreateAdoptionPostDocument, options);
      }
export type CreateAdoptionPostMutationHookResult = ReturnType<typeof useCreateAdoptionPostMutation>;
export type CreateAdoptionPostMutationResult = Apollo.MutationResult<CreateAdoptionPostMutation>;
export type CreateAdoptionPostMutationOptions = Apollo.BaseMutationOptions<CreateAdoptionPostMutation, CreateAdoptionPostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginOptions: LoginInput!) {
  login(options: $loginOptions) {
    errors {
      code
      field
      message
    }
    user {
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginOptions: // value for 'loginOptions'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerRegisterOptions: RegisterOptions!) {
  register(registerOptions: $registerRegisterOptions) {
    errors {
      field
      message
      code
    }
    user {
      ...RequiredUserInfo
    }
  }
}
    ${RequiredUserInfoFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerRegisterOptions: // value for 'registerRegisterOptions'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendOtpDocument = gql`
    mutation SendOTP($sendOtpPhone: String!, $email: String!) {
  sendOTP(phone: $sendOtpPhone, email: $email) {
    success
    errors {
      message
      code
      field
    }
  }
}
    `;
export type SendOtpMutationFn = Apollo.MutationFunction<SendOtpMutation, SendOtpMutationVariables>;

/**
 * __useSendOtpMutation__
 *
 * To run a mutation, you first call `useSendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpMutation, { data, loading, error }] = useSendOtpMutation({
 *   variables: {
 *      sendOtpPhone: // value for 'sendOtpPhone'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendOtpMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpMutation, SendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpMutation, SendOtpMutationVariables>(SendOtpDocument, options);
      }
export type SendOtpMutationHookResult = ReturnType<typeof useSendOtpMutation>;
export type SendOtpMutationResult = Apollo.MutationResult<SendOtpMutation>;
export type SendOtpMutationOptions = Apollo.BaseMutationOptions<SendOtpMutation, SendOtpMutationVariables>;
export const UpdateUserInfoDocument = gql`
    mutation updateUserInfo($updateUserUpdateOptions: UpdateUserInfo!) {
  updateUser(updateOptions: $updateUserUpdateOptions)
}
    `;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      updateUserUpdateOptions: // value for 'updateUserUpdateOptions'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument, options);
      }
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($uploadAvatarImage: Upload!) {
  uploadAvatar(image: $uploadAvatarImage) {
    errors {
      field
      message
      code
    }
    url
  }
}
    `;
export type UploadAvatarMutationFn = Apollo.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      uploadAvatarImage: // value for 'uploadAvatarImage'
 *   },
 * });
 */
export function useUploadAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, options);
      }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = Apollo.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = Apollo.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const AdoptionPostsDocument = gql`
    query AdoptionPosts($cursor: String, $limit: Int) {
  adoptionPosts(cursor: $cursor, limit: $limit) {
    posts {
      id
      pet {
        id
        name
        type
        gender
        size
        birthDate
        images {
          photoId
          petId
          photo {
            url
          }
        }
      }
      address {
        distance
        country
        state
      }
      createdAt
      updatedAt
      user {
        full_name
      }
    }
    hasMore
    errors {
      field
      message
      code
    }
  }
}
    `;

/**
 * __useAdoptionPostsQuery__
 *
 * To run a query within a React component, call `useAdoptionPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdoptionPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdoptionPostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdoptionPostsQuery(baseOptions?: Apollo.QueryHookOptions<AdoptionPostsQuery, AdoptionPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdoptionPostsQuery, AdoptionPostsQueryVariables>(AdoptionPostsDocument, options);
      }
export function useAdoptionPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdoptionPostsQuery, AdoptionPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdoptionPostsQuery, AdoptionPostsQueryVariables>(AdoptionPostsDocument, options);
        }
export type AdoptionPostsQueryHookResult = ReturnType<typeof useAdoptionPostsQuery>;
export type AdoptionPostsLazyQueryHookResult = ReturnType<typeof useAdoptionPostsLazyQuery>;
export type AdoptionPostsQueryResult = Apollo.QueryResult<AdoptionPostsQuery, AdoptionPostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RequiredUserInfo
    avatar {
      path
    }
  }
}
    ${RequiredUserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PaginatedUsersDocument = gql`
    query PaginatedUsers($usersWhere: WhereClause!) {
  users(where: $usersWhere) {
    users {
      id
      email
      phone
    }
    errors {
      field
      message
      code
    }
    hasMore
  }
}
    `;

/**
 * __usePaginatedUsersQuery__
 *
 * To run a query within a React component, call `usePaginatedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedUsersQuery({
 *   variables: {
 *      usersWhere: // value for 'usersWhere'
 *   },
 * });
 */
export function usePaginatedUsersQuery(baseOptions: Apollo.QueryHookOptions<PaginatedUsersQuery, PaginatedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatedUsersQuery, PaginatedUsersQueryVariables>(PaginatedUsersDocument, options);
      }
export function usePaginatedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedUsersQuery, PaginatedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatedUsersQuery, PaginatedUsersQueryVariables>(PaginatedUsersDocument, options);
        }
export type PaginatedUsersQueryHookResult = ReturnType<typeof usePaginatedUsersQuery>;
export type PaginatedUsersLazyQueryHookResult = ReturnType<typeof usePaginatedUsersLazyQuery>;
export type PaginatedUsersQueryResult = Apollo.QueryResult<PaginatedUsersQuery, PaginatedUsersQueryVariables>;