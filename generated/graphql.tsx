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
  status: PetStatus;
  type: PetType;
  vaccinated?: Maybe<Scalars['Boolean']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  code: Scalars['Float'];
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserTag: Scalars['Boolean'];
  changePassword: ChangePasswordResponse;
  createPet: PetResponse;
  deletePet: RegularResponse;
  forgotPassword: Scalars['Boolean'];
  likePet: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendOTP: RegularResponse;
  uploadAvatar: Scalars['Boolean'];
};


export type MutationAddUserTagArgs = {
  tag: UserTagsType;
};


export type MutationChangePasswordArgs = {
  options: ChangePasswordInput;
};


export type MutationCreatePetArgs = {
  createPetOptions: CreatePetOptions;
};


export type MutationDeletePetArgs = {
  petId: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  identifier: Scalars['String'];
};


export type MutationLikePetArgs = {
  petId: Scalars['Int'];
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


export type MutationUploadAvatarArgs = {
  image: Scalars['Upload'];
};

export type Pet = {
  __typename?: 'Pet';
  about: Scalars['String'];
  birthDate: Scalars['DateTime'];
  breeds: Array<PetBreed>;
  createdAt: Scalars['DateTime'];
  gender: PetGender;
  id: Scalars['Int'];
  likes?: Maybe<Array<UserFavorites>>;
  name: Scalars['String'];
  neutered?: Maybe<Scalars['Boolean']>;
  numberOfLikes: Scalars['Int'];
  size: PetSize;
  spayed?: Maybe<Scalars['Boolean']>;
  status: PetStatus;
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

/** Basic Pet Status */
export enum PetStatus {
  Adopted = 'ADOPTED',
  Deleted = 'DELETED',
  Offered = 'OFFERED'
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
};

export type Query = {
  __typename?: 'Query';
  isValidToken: Scalars['Boolean'];
  me?: Maybe<User>;
  pet?: Maybe<Pet>;
  pets: Array<Pet>;
  user?: Maybe<User>;
  users: Array<User>;
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

export type User = {
  __typename?: 'User';
  avatars?: Maybe<Array<UserAvatar>>;
  bio?: Maybe<Scalars['String']>;
  blocked: Scalars['Boolean'];
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favorites?: Maybe<Array<UserFavorites>>;
  full_name: Scalars['String'];
  id: Scalars['Int'];
  last_login?: Maybe<Scalars['DateTime']>;
  location?: Maybe<Scalars['String']>;
  pets?: Maybe<Array<Pet>>;
  phone: Scalars['String'];
  photos?: Maybe<Array<Photo>>;
  provider: Scalars['String'];
  provider_id?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<UserTag>>;
  updatedAt: Scalars['DateTime'];
};

export type UserAvatar = {
  __typename?: 'UserAvatar';
  id: Scalars['Int'];
  image: Photo;
  user: User;
};

export type UserFavorites = {
  __typename?: 'UserFavorites';
  pet: Pet;
  petId: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
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

export type RequiredUserInfoFragment = { __typename?: 'User', id: number, email: string, phone: string, full_name: string, confirmed: boolean, blocked: boolean, location?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number> };

export type LoginMutationVariables = Exact<{
  loginOptions: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', code: number, field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', email: string }> } };

export type RegisterMutationVariables = Exact<{
  registerRegisterOptions: RegisterOptions;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, phone: string, full_name: string, confirmed: boolean, blocked: boolean, location?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number> }> } };

export type SendOtpMutationVariables = Exact<{
  sendOtpPhone: Scalars['String'];
  email: Scalars['String'];
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOTP: { __typename?: 'RegularResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, code: number, field: string }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, email: string, phone: string, full_name: string, confirmed: boolean, blocked: boolean, location?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number> }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, phone: string, full_name: string }> };

export const RequiredUserInfoFragmentDoc = gql`
    fragment RequiredUserInfo on User {
  id
  email
  phone
  full_name
  confirmed
  blocked
  location
  bio
  last_login
  createdAt
  updatedAt
  provider
  provider_id
}
    `;
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
export const MeDocument = gql`
    query Me {
  me {
    ...RequiredUserInfo
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
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    phone
    full_name
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;