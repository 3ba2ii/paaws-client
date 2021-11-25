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
  formatted_address?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  lat: Scalars['String'];
  lng: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  street_name?: Maybe<Scalars['String']>;
  street_number?: Maybe<Scalars['Int']>;
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
  addressId?: Maybe<Scalars['Int']>;
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
  size?: Maybe<PetSize>;
  spayedOrNeutered?: Maybe<Scalars['Boolean']>;
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
  success?: Maybe<Scalars['Boolean']>;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isEdited: Scalars['Boolean'];
  parentId?: Maybe<Scalars['Int']>;
  points: Scalars['Int'];
  postId: Scalars['Int'];
  replies: Array<Comment>;
  repliesCount: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updoots: Array<CommentUpdoot>;
  user: User;
  userId: Scalars['Int'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
};

export type CommentUpdoot = {
  __typename?: 'CommentUpdoot';
  changes: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type CreateCommentInputType = {
  /** parentId refers to the parent comment id in case of replying */
  parentId?: Maybe<Scalars['Int']>;
  postId: Scalars['Int'];
  text: Scalars['String'];
};

export type CreateMissingPostInput = {
  address?: Maybe<AddressInput>;
  description: Scalars['String'];
  privacy: PrivacyType;
  thumbnailIdx?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  type: MissingPostTypes;
};

export type CreateMissingPostResponse = {
  __typename?: 'CreateMissingPostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<MissingPost>;
};

export type CreatePetOptions = {
  about: Scalars['String'];
  birthDate: Scalars['DateTime'];
  breeds: Array<Breeds>;
  gender: PetGender;
  name: Scalars['String'];
  size: PetSize;
  spayedOrNeutered?: Maybe<Scalars['Boolean']>;
  thumbnailIdx: Scalars['Int'];
  type: PetType;
  vaccinated?: Maybe<Scalars['Boolean']>;
};

/** Date Filters */
export enum DateFilters {
  LastMonth = 'LAST_MONTH',
  LastWeek = 'LAST_WEEK',
  LastYear = 'LAST_YEAR',
  Today = 'TODAY'
}

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  deleted: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  code: Scalars['Int'];
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FindNearestUsersInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  radius: Scalars['Float'];
};

export type LoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};

export type MissingPost = {
  __typename?: 'MissingPost';
  address?: Maybe<Address>;
  addressId?: Maybe<Scalars['Int']>;
  comments: Array<Comment>;
  commentsCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  descriptionSnippet: Scalars['String'];
  id: Scalars['Int'];
  images: Array<PostImages>;
  points: Scalars['Int'];
  privacy: PrivacyType;
  tags: Array<MissingPostTags>;
  thumbnail?: Maybe<Photo>;
  thumbnailId: Scalars['Int'];
  title: Scalars['String'];
  type: PrivacyType;
  updatedAt: Scalars['DateTime'];
  updoots: Array<PostUpdoot>;
  user: User;
  userId: Scalars['Int'];
  voteStatus?: Maybe<Scalars['Int']>;
};


export type MissingPostDescriptionSnippetArgs = {
  length?: Maybe<Scalars['Int']>;
};

export type MissingPostComments = {
  /** Date must be ISO8601 Format */
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  postId?: Maybe<Scalars['Int']>;
};

/** Missing Post Tags */
export enum MissingPostTags {
  Found = 'Found',
  Missing = 'Missing',
  NearYou = 'NearYou',
  Rescued = 'Rescued',
  Urgent = 'Urgent'
}

/** Either missing, found, rescued, or all */
export enum MissingPostTypes {
  All = 'ALL',
  Found = 'Found',
  Missing = 'Missing',
  Rescued = 'Rescued'
}

export type Mutation = {
  __typename?: 'Mutation';
  addUserTag: Scalars['Boolean'];
  changePassword: ChangePasswordResponse;
  comment: CommentResponse;
  createAdoptionPost: AdoptionPostResponse;
  createMissingPost: CreateMissingPostResponse;
  createPet: PetResponse;
  deleteAdoptionPost: DeleteResponse;
  deleteComment: DeleteResponse;
  deleteMissingPost: DeleteResponse;
  deletePet: DeleteResponse;
  deleteUser: DeleteResponse;
  editComment: CommentResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendOTP: RegularResponse;
  updateAdoptionPost: AdoptionPostResponse;
  updateUser: Scalars['Boolean'];
  updootComment: CommentResponse;
  uploadAvatar: UploadImageResponse;
  vote: VotingResponse;
};


export type MutationAddUserTagArgs = {
  tag: UserTagsType;
};


export type MutationChangePasswordArgs = {
  options: ChangePasswordInput;
};


export type MutationCommentArgs = {
  input: CreateCommentInputType;
};


export type MutationCreateAdoptionPostArgs = {
  images: Array<Scalars['Upload']>;
  input: AdoptionPostInput;
};


export type MutationCreateMissingPostArgs = {
  images: Array<Scalars['Upload']>;
  input: CreateMissingPostInput;
};


export type MutationCreatePetArgs = {
  createPetOptions: CreatePetOptions;
};


export type MutationDeleteAdoptionPostArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int'];
};


export type MutationDeleteMissingPostArgs = {
  id: Scalars['Float'];
};


export type MutationDeletePetArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['Int'];
  text: Scalars['String'];
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


export type MutationUpdootCommentArgs = {
  commentId: Scalars['Int'];
  value: Scalars['Int'];
};


export type MutationUploadAvatarArgs = {
  image: Scalars['Upload'];
};


export type MutationVoteArgs = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export enum Notification_Content_Types {
  Comment = 'COMMENT',
  Post = 'POST',
  User = 'USER'
}

export type Notification = {
  __typename?: 'Notification';
  /** ID of post, comment or any table that will specified on contentType Column */
  contentId: Scalars['Int'];
  contentType: Notification_Content_Types;
  createdAt: Scalars['DateTime'];
  expirationDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isRead: Scalars['Boolean'];
  message: Scalars['String'];
  notificationType: NotificationType;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

/** Upvote or downvote a post or Comment */
export enum NotificationType {
  CommentNotification = 'COMMENT_NOTIFICATION',
  Downvote = 'DOWNVOTE',
  MissingPetAroundYou = 'MISSING_PET_AROUND_YOU',
  ReplyNotification = 'REPLY_NOTIFICATION',
  Upvote = 'UPVOTE'
}

export type PaginatedAdoptionPosts = {
  __typename?: 'PaginatedAdoptionPosts';
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
  posts: Array<AdoptionPost>;
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  comments: Array<Comment>;
  errors?: Maybe<Array<FieldError>>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type PaginatedMissingPosts = {
  __typename?: 'PaginatedMissingPosts';
  errors?: Maybe<Array<FieldError>>;
  hasMore?: Maybe<Scalars['Boolean']>;
  missingPosts: Array<MissingPost>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
  users: Array<User>;
};

export type PaginationArgs = {
  /** Date must be ISO8601 Format */
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type ParentCommentReplies = {
  /** Date must be ISO8601 Format */
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
};

export type Pet = {
  __typename?: 'Pet';
  about: Scalars['String'];
  birthDate: Scalars['DateTime'];
  breeds: Array<PetBreed>;
  colors: Array<PetColor>;
  createdAt: Scalars['DateTime'];
  gender: PetGender;
  id: Scalars['Int'];
  images?: Maybe<Array<PetImages>>;
  name: Scalars['String'];
  size: PetSize;
  spayedOrNeutered?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<Photo>;
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

export type PetColor = {
  __typename?: 'PetColor';
  color: Breeds;
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
  creatorId: Scalars['Int'];
  filename: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type PostFilters = {
  date?: Maybe<Array<DateFilters>>;
};

export type PostImages = {
  __typename?: 'PostImages';
  photo: Photo;
  photoId: Scalars['Int'];
  post: MissingPost;
  postId: Scalars['Int'];
};

export type PostUpdoot = {
  __typename?: 'PostUpdoot';
  changes: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['Int'];
};

/** Post Privacy */
export enum PrivacyType {
  OnlyMe = 'ONLY_ME',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  adoptionPost?: Maybe<AdoptionPost>;
  adoptionPosts: PaginatedAdoptionPosts;
  comments: PaginatedComments;
  getCommentReplies: PaginatedComments;
  getNearestUsers?: Maybe<Array<User>>;
  isValidToken: Scalars['Boolean'];
  me?: Maybe<User>;
  missingPosts: PaginatedMissingPosts;
  notifications: Array<Notification>;
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


export type QueryCommentsArgs = {
  options: MissingPostComments;
};


export type QueryGetCommentRepliesArgs = {
  options: ParentCommentReplies;
};


export type QueryGetNearestUsersArgs = {
  options: FindNearestUsersInput;
};


export type QueryIsValidTokenArgs = {
  token: Scalars['String'];
};


export type QueryMissingPostsArgs = {
  filters?: Maybe<PostFilters>;
  input: PaginationArgs;
  type?: Maybe<MissingPostTypes>;
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
  filename?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  addressId?: Maybe<Scalars['Int']>;
  adoptionPosts?: Maybe<Array<AdoptionPost>>;
  avatar?: Maybe<Photo>;
  avatarId?: Maybe<Scalars['Int']>;
  bio?: Maybe<Scalars['String']>;
  blocked: Scalars['Boolean'];
  comments: Array<Comment>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  favorites?: Maybe<Array<UserFavorites>>;
  full_name: Scalars['String'];
  id: Scalars['Int'];
  last_login?: Maybe<Scalars['DateTime']>;
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
  missingPosts?: Maybe<Array<MissingPost>>;
  notifications: Array<Notification>;
  pets?: Maybe<Array<Pet>>;
  phone: Scalars['String'];
  photos?: Maybe<Array<Photo>>;
  provider: Scalars['String'];
  provider_id?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<UserTag>>;
  updatedAt: Scalars['DateTime'];
  updoots: Array<PostUpdoot>;
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

export type VotingResponse = {
  __typename?: 'VotingResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type WhereClause = {
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type MissingPostFragmentFragment = { __typename?: 'MissingPost', id: number, title: string, voteStatus?: Maybe<number>, commentsCount: number, tags: Array<MissingPostTags>, points: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }, address?: Maybe<{ __typename?: 'Address', id: number, distance?: Maybe<number> }>, thumbnail?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> };

export type RequiredUserInfoFragment = { __typename?: 'User', id: number, email: string, phone: string, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number>, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> };

export type CreateAdoptionPostMutationVariables = Exact<{
  petImages: Array<Scalars['Upload']> | Scalars['Upload'];
  postInput: AdoptionPostInput;
}>;


export type CreateAdoptionPostMutation = { __typename?: 'Mutation', createAdoptionPost: { __typename?: 'AdoptionPostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, adoptionPost?: Maybe<{ __typename?: 'AdoptionPost', id: number, userId: number, petId: number, createdAt: any, updatedAt: any, pet: { __typename?: 'Pet', id: number, name: string }, user: { __typename?: 'User', id: number, email: string }, address?: Maybe<{ __typename?: 'Address', distance?: Maybe<number> }> }> } };

export type CreateMissingPostMutationVariables = Exact<{
  input: CreateMissingPostInput;
  images: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type CreateMissingPostMutation = { __typename?: 'Mutation', createMissingPost: { __typename?: 'CreateMissingPostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, post?: Maybe<{ __typename?: 'MissingPost', descriptionSnippet: string, id: number, title: string, voteStatus?: Maybe<number>, commentsCount: number, tags: Array<MissingPostTags>, points: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }, address?: Maybe<{ __typename?: 'Address', id: number, distance?: Maybe<number> }>, thumbnail?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }> } };

export type CreatePetMutationVariables = Exact<{
  createPetOptions: CreatePetOptions;
}>;


export type CreatePetMutation = { __typename?: 'Mutation', createPet: { __typename?: 'PetResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, pet?: Maybe<{ __typename?: 'Pet', id: number, updatedAt: any, createdAt: any, name: string, type: PetType }> } };

export type LoginMutationVariables = Exact<{
  loginOptions: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', code: number, field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, phone: string, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number>, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string>, id: number }> }> } };

export type PostVoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type PostVoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'VotingResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type RegisterMutationVariables = Exact<{
  registerRegisterOptions: RegisterOptions;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, phone: string, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number>, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }> } };

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


export type AdoptionPostsQuery = { __typename?: 'Query', adoptionPosts: { __typename?: 'PaginatedAdoptionPosts', hasMore: boolean, posts: Array<{ __typename?: 'AdoptionPost', id: number, createdAt: any, updatedAt: any, pet: { __typename?: 'Pet', id: number, name: string, gender: PetGender, size: PetSize, birthDate: any, breeds: Array<{ __typename?: 'PetBreed', breed: Breeds }>, thumbnail?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> }, address?: Maybe<{ __typename?: 'Address', distance?: Maybe<number>, country?: Maybe<string>, state?: Maybe<string> }> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, email: string, phone: string, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, provider_id?: Maybe<number>, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string>, id: number }> }> };

export type MissingPostsQueryVariables = Exact<{
  input: PaginationArgs;
  length?: Maybe<Scalars['Int']>;
  type?: Maybe<MissingPostTypes>;
  filters?: Maybe<PostFilters>;
}>;


export type MissingPostsQuery = { __typename?: 'Query', missingPosts: { __typename?: 'PaginatedMissingPosts', hasMore?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, missingPosts: Array<{ __typename?: 'MissingPost', descriptionSnippet: string, id: number, title: string, voteStatus?: Maybe<number>, commentsCount: number, tags: Array<MissingPostTags>, points: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }, address?: Maybe<{ __typename?: 'Address', id: number, distance?: Maybe<number> }>, thumbnail?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }> } };

export type PaginatedUsersQueryVariables = Exact<{
  usersWhere: WhereClause;
}>;


export type PaginatedUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', hasMore: boolean, users: Array<{ __typename?: 'User', id: number, email: string, phone: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export const MissingPostFragmentFragmentDoc = gql`
    fragment MissingPostFragment on MissingPost {
  id
  title
  voteStatus
  user {
    id
    displayName
    avatar {
      id
      url
    }
  }
  commentsCount
  tags
  address {
    id
    distance
  }
  points
  thumbnail {
    id
    url
  }
  createdAt
  updatedAt
}
    `;
export const RequiredUserInfoFragmentDoc = gql`
    fragment RequiredUserInfo on User {
  id
  email
  phone
  displayName
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
    id
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
export const CreateMissingPostDocument = gql`
    mutation CreateMissingPost($input: CreateMissingPostInput!, $images: [Upload!]!) {
  createMissingPost(input: $input, images: $images) {
    errors {
      field
      message
      code
    }
    post {
      ...MissingPostFragment
      descriptionSnippet(length: 120)
    }
  }
}
    ${MissingPostFragmentFragmentDoc}`;
export type CreateMissingPostMutationFn = Apollo.MutationFunction<CreateMissingPostMutation, CreateMissingPostMutationVariables>;

/**
 * __useCreateMissingPostMutation__
 *
 * To run a mutation, you first call `useCreateMissingPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMissingPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMissingPostMutation, { data, loading, error }] = useCreateMissingPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useCreateMissingPostMutation(baseOptions?: Apollo.MutationHookOptions<CreateMissingPostMutation, CreateMissingPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMissingPostMutation, CreateMissingPostMutationVariables>(CreateMissingPostDocument, options);
      }
export type CreateMissingPostMutationHookResult = ReturnType<typeof useCreateMissingPostMutation>;
export type CreateMissingPostMutationResult = Apollo.MutationResult<CreateMissingPostMutation>;
export type CreateMissingPostMutationOptions = Apollo.BaseMutationOptions<CreateMissingPostMutation, CreateMissingPostMutationVariables>;
export const CreatePetDocument = gql`
    mutation CreatePet($createPetOptions: CreatePetOptions!) {
  createPet(createPetOptions: $createPetOptions) {
    errors {
      field
      message
      code
    }
    pet {
      id
      updatedAt
      createdAt
      name
      type
    }
  }
}
    `;
export type CreatePetMutationFn = Apollo.MutationFunction<CreatePetMutation, CreatePetMutationVariables>;

/**
 * __useCreatePetMutation__
 *
 * To run a mutation, you first call `useCreatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPetMutation, { data, loading, error }] = useCreatePetMutation({
 *   variables: {
 *      createPetOptions: // value for 'createPetOptions'
 *   },
 * });
 */
export function useCreatePetMutation(baseOptions?: Apollo.MutationHookOptions<CreatePetMutation, CreatePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePetMutation, CreatePetMutationVariables>(CreatePetDocument, options);
      }
export type CreatePetMutationHookResult = ReturnType<typeof useCreatePetMutation>;
export type CreatePetMutationResult = Apollo.MutationResult<CreatePetMutation>;
export type CreatePetMutationOptions = Apollo.BaseMutationOptions<CreatePetMutation, CreatePetMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginOptions: LoginInput!) {
  login(options: $loginOptions) {
    errors {
      code
      field
      message
    }
    user {
      ...RequiredUserInfo
      avatar {
        url
      }
    }
  }
}
    ${RequiredUserInfoFragmentDoc}`;
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
export const PostVoteDocument = gql`
    mutation PostVote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId) {
    errors {
      field
      message
      code
    }
    success
  }
}
    `;
export type PostVoteMutationFn = Apollo.MutationFunction<PostVoteMutation, PostVoteMutationVariables>;

/**
 * __usePostVoteMutation__
 *
 * To run a mutation, you first call `usePostVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postVoteMutation, { data, loading, error }] = usePostVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostVoteMutation(baseOptions?: Apollo.MutationHookOptions<PostVoteMutation, PostVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostVoteMutation, PostVoteMutationVariables>(PostVoteDocument, options);
      }
export type PostVoteMutationHookResult = ReturnType<typeof usePostVoteMutation>;
export type PostVoteMutationResult = Apollo.MutationResult<PostVoteMutation>;
export type PostVoteMutationOptions = Apollo.BaseMutationOptions<PostVoteMutation, PostVoteMutationVariables>;
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
        gender
        size
        birthDate
        breeds {
          breed
        }
        thumbnail {
          url
        }
      }
      address {
        distance
        country
        state
      }
      createdAt
      updatedAt
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
      url
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
export const MissingPostsDocument = gql`
    query MissingPosts($input: PaginationArgs!, $length: Int, $type: MissingPostTypes, $filters: PostFilters) {
  missingPosts(input: $input, type: $type, filters: $filters) {
    hasMore
    errors {
      field
      message
      code
    }
    missingPosts {
      ...MissingPostFragment
      descriptionSnippet(length: $length)
    }
  }
}
    ${MissingPostFragmentFragmentDoc}`;

/**
 * __useMissingPostsQuery__
 *
 * To run a query within a React component, call `useMissingPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMissingPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMissingPostsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      length: // value for 'length'
 *      type: // value for 'type'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useMissingPostsQuery(baseOptions: Apollo.QueryHookOptions<MissingPostsQuery, MissingPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MissingPostsQuery, MissingPostsQueryVariables>(MissingPostsDocument, options);
      }
export function useMissingPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MissingPostsQuery, MissingPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MissingPostsQuery, MissingPostsQueryVariables>(MissingPostsDocument, options);
        }
export type MissingPostsQueryHookResult = ReturnType<typeof useMissingPostsQuery>;
export type MissingPostsLazyQueryHookResult = ReturnType<typeof useMissingPostsLazyQuery>;
export type MissingPostsQueryResult = Apollo.QueryResult<MissingPostsQuery, MissingPostsQueryVariables>;
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