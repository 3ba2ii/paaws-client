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

export type BaseRegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  full_name: Scalars['String'];
  password: Scalars['String'];
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
  isReply: Scalars['Boolean'];
  parentId?: Maybe<Scalars['Int']>;
  points: Scalars['Int'];
  postId: Scalars['Int'];
  replies?: Maybe<Array<Comment>>;
  repliesCount: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updoots: Array<CommentUpdoot>;
  user: User;
  userId: Scalars['Int'];
  voteStatus?: Maybe<Scalars['Int']>;
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
  showEmail?: Maybe<Scalars['Boolean']>;
  showPhoneNumber?: Maybe<Scalars['Boolean']>;
  thumbnailIdx?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  type: MissingPostTypes;
};

export type CreateMissingPostResponse = {
  __typename?: 'CreateMissingPostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<MissingPost>;
};

export type CreatePetInput = {
  about: Scalars['String'];
  birthDate: Scalars['DateTime'];
  breeds: Array<Breeds>;
  colors: Array<PetColors>;
  gender: PetGender;
  name: Scalars['String'];
  size: PetSize;
  thumbnailIdx: Scalars['Int'];
  type: PetType;
};

export type CreateUserOwnedPetResponse = {
  __typename?: 'CreateUserOwnedPetResponse';
  errors?: Maybe<Array<FieldError>>;
  ownedPet?: Maybe<OwnedPet>;
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

export type EditMissingPostResponse = {
  __typename?: 'EditMissingPostResponse';
  errors?: Maybe<Array<FieldError>>;
  missingPost?: Maybe<MissingPost>;
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

export type FindUserByTokenIdResponse = {
  __typename?: 'FindUserByTokenIdResponse';
  errors?: Maybe<Array<FieldError>>;
  found?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type LocationFilterComponents = {
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  locationFilter?: Maybe<LocationFilters>;
};

/** Location Filters */
export enum LocationFilters {
  NearCustomLocation = 'NEAR_CUSTOM_LOCATION',
  NearMe = 'NEAR_ME',
  Within_5Km = 'WITHIN_5KM',
  Within_10Km = 'WITHIN_10KM'
}

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
  showEmail?: Maybe<Scalars['Boolean']>;
  showPhoneNumber?: Maybe<Scalars['Boolean']>;
  tags: Array<MissingPostTags>;
  thumbnail?: Maybe<Photo>;
  thumbnailId: Scalars['Int'];
  title: Scalars['String'];
  type: MissingPostTypes;
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

export type MissingPostResponse = {
  __typename?: 'MissingPostResponse';
  errors?: Maybe<Array<FieldError>>;
  isOwner?: Maybe<Scalars['Boolean']>;
  missingPost?: Maybe<MissingPost>;
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
  addMPComment: CommentResponse;
  addUserTag: Scalars['Boolean'];
  changePassword: ChangePasswordResponse;
  createMissingPost: CreateMissingPostResponse;
  createUserOwnedPet: CreateUserOwnedPetResponse;
  deleteAdoptionPost: DeleteResponse;
  deleteComment: DeleteResponse;
  deleteMissingPost: DeleteResponse;
  deleteUser: DeleteResponse;
  deleteUserOwnedPet: Scalars['Boolean'];
  editComment: CommentResponse;
  editMissingPost: EditMissingPostResponse;
  forgotPassword: Scalars['Boolean'];
  isUserRegistered: FindUserByTokenIdResponse;
  login: UserResponse;
  loginWithAuthProvider: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  registerWithAuthProvider: UserResponse;
  sendEmailVerification: RegularResponse;
  sendOTP: RegularResponse;
  updateUser: Scalars['Boolean'];
  updootComment: CommentResponse;
  uploadAvatar: UploadImageResponse;
  verifyPhoneNumber: RegularResponse;
  vote: VotingResponse;
};


export type MutationAddMpCommentArgs = {
  input: CreateCommentInputType;
};


export type MutationAddUserTagArgs = {
  tag: UserTagsType;
};


export type MutationChangePasswordArgs = {
  options: ChangePasswordInput;
};


export type MutationCreateMissingPostArgs = {
  images: Array<Scalars['Upload']>;
  input: CreateMissingPostInput;
};


export type MutationCreateUserOwnedPetArgs = {
  images: Array<Scalars['Upload']>;
  petInfo: CreatePetInput;
};


export type MutationDeleteAdoptionPostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int'];
};


export type MutationDeleteMissingPostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserOwnedPetArgs = {
  petId: Scalars['Float'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationEditMissingPostArgs = {
  id: Scalars['Int'];
  input: UpdateMissingPostInput;
};


export type MutationForgotPasswordArgs = {
  identifier: Scalars['String'];
};


export type MutationIsUserRegisteredArgs = {
  idToken: Scalars['String'];
  provider: Scalars['String'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationLoginWithAuthProviderArgs = {
  provider: ProviderTypes;
  providerId: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerOptions: BaseRegisterInput;
};


export type MutationRegisterWithAuthProviderArgs = {
  provider: ProviderTypes;
  providerId: Scalars['String'];
};


export type MutationSendEmailVerificationArgs = {
  email: Scalars['String'];
};


export type MutationSendOtpArgs = {
  email: Scalars['String'];
  phone: Scalars['String'];
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


export type MutationVerifyPhoneNumberArgs = {
  otp: Scalars['String'];
  phone: Scalars['String'];
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

export type OwnedPet = {
  __typename?: 'OwnedPet';
  about: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  pet: Pet;
  petId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
};

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

export type PaginatedUserOwnedPetsResponse = {
  __typename?: 'PaginatedUserOwnedPetsResponse';
  errors?: Maybe<Array<FieldError>>;
  hasMore?: Maybe<Scalars['Boolean']>;
  ownedPets: Array<OwnedPet>;
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
  birthDate: Scalars['DateTime'];
  breeds: Array<PetBreed>;
  colors: Array<PetColor>;
  createdAt: Scalars['DateTime'];
  gender: PetGender;
  id: Scalars['Int'];
  images?: Maybe<Array<PetImages>>;
  name: Scalars['String'];
  size: PetSize;
  thumbnail?: Maybe<Photo>;
  type: PetType;
  updatedAt: Scalars['DateTime'];
};

export type PetBreed = {
  __typename?: 'PetBreed';
  breed: Breeds;
  pet: Pet;
  petId: Scalars['Float'];
};

export type PetColor = {
  __typename?: 'PetColor';
  color: PetColors;
  pet: Pet;
  petId: Scalars['Float'];
};

/** Basic Pet Colors */
export enum PetColors {
  Blue = 'BLUE',
  Green = 'GREEN',
  Red = 'RED'
}

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
  date?: Maybe<DateFilters>;
  location?: Maybe<LocationFilterComponents>;
  order?: Maybe<SortingOrder>;
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

/** Auth Provider Types */
export enum ProviderTypes {
  Apple = 'APPLE',
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Local = 'LOCAL',
  Twitter = 'TWITTER'
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
  missingPost: MissingPostResponse;
  missingPosts: PaginatedMissingPosts;
  notifications: Array<Notification>;
  user?: Maybe<User>;
  userOwnedPet?: Maybe<OwnedPet>;
  userOwnedPets: PaginatedUserOwnedPetsResponse;
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


export type QueryMissingPostArgs = {
  id: Scalars['Int'];
};


export type QueryMissingPostsArgs = {
  filters?: Maybe<PostFilters>;
  input: PaginationArgs;
  type?: Maybe<MissingPostTypes>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserOwnedPetArgs = {
  id: Scalars['Int'];
};


export type QueryUserOwnedPetsArgs = {
  paginationArgs: PaginationArgs;
  userId: Scalars['Float'];
};


export type QueryUsersArgs = {
  where: WhereClause;
};

export type RegularResponse = {
  __typename?: 'RegularResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Sorting Order Filters */
export enum SortingOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type UpdateMissingPostInput = {
  description?: Maybe<Scalars['String']>;
  privacy?: Maybe<PrivacyType>;
  showEmail?: Maybe<Scalars['Boolean']>;
  showPhoneNumber?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<MissingPostTypes>;
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
  ownedPets?: Maybe<Array<OwnedPet>>;
  pets: Array<Pet>;
  petsCount?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  phoneVerified: Scalars['Boolean'];
  photos?: Maybe<Array<Photo>>;
  provider: Scalars['String'];
  providerId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<UserTag>>;
  updatedAt: Scalars['DateTime'];
  updoots: Array<PostUpdoot>;
  userPets?: Maybe<Array<OwnedPet>>;
};

export type UserFavorites = {
  __typename?: 'UserFavorites';
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

export type VotingResponse = {
  __typename?: 'VotingResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type WhereClause = {
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type CommentFragmentFragment = { __typename?: 'Comment', id: number, updatedAt: any, createdAt: any, postId: number, parentId?: Maybe<number>, text: string, points: number, voteStatus?: Maybe<number>, repliesCount: number, isReply: boolean, isEdited: boolean, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> } };

export type MissingPostFragmentFragment = { __typename?: 'MissingPost', id: number, title: string, description: string, voteStatus?: Maybe<number>, privacy: PrivacyType, type: MissingPostTypes, showEmail?: Maybe<boolean>, showPhoneNumber?: Maybe<boolean>, commentsCount: number, tags: Array<MissingPostTags>, points: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }, thumbnail?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }>, address?: Maybe<{ __typename?: 'Address', id: number, distance?: Maybe<number> }> };

export type RequiredUserInfoFragment = { __typename?: 'User', id: number, email: string, phone?: Maybe<string>, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, providerId?: Maybe<string>, phoneVerified: boolean, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> };

export type AddMpCommentMutationVariables = Exact<{
  input: CreateCommentInputType;
}>;


export type AddMpCommentMutation = { __typename?: 'Mutation', addMPComment: { __typename?: 'CommentResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, comment?: Maybe<{ __typename?: 'Comment', id: number, updatedAt: any, createdAt: any, postId: number, parentId?: Maybe<number>, text: string, points: number, voteStatus?: Maybe<number>, repliesCount: number, isReply: boolean, isEdited: boolean, replies?: Maybe<Array<{ __typename?: 'Comment', id: number, updatedAt: any, createdAt: any, postId: number, parentId?: Maybe<number>, text: string, points: number, voteStatus?: Maybe<number>, repliesCount: number, isReply: boolean, isEdited: boolean, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> } }>>, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> } }> } };

export type ChangePasswordMutationVariables = Exact<{
  options: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type CreateMissingPostMutationVariables = Exact<{
  input: CreateMissingPostInput;
  images: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type CreateMissingPostMutation = { __typename?: 'Mutation', createMissingPost: { __typename?: 'CreateMissingPostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, post?: Maybe<{ __typename?: 'MissingPost', descriptionSnippet: string, id: number, title: string, description: string, voteStatus?: Maybe<number>, privacy: PrivacyType, type: MissingPostTypes, showEmail?: Maybe<boolean>, showPhoneNumber?: Maybe<boolean>, commentsCount: number, tags: Array<MissingPostTags>, points: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }, thumbnail?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }>, address?: Maybe<{ __typename?: 'Address', id: number, distance?: Maybe<number> }> }> } };

export type CreateUserOwnedPetMutationVariables = Exact<{
  images: Array<Scalars['Upload']> | Scalars['Upload'];
  petInfo: CreatePetInput;
}>;


export type CreateUserOwnedPetMutation = { __typename?: 'Mutation', createUserOwnedPet: { __typename?: 'CreateUserOwnedPetResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, ownedPet?: Maybe<{ __typename?: 'OwnedPet', updatedAt: any, createdAt: any, userId: number, about: string, pet: { __typename?: 'Pet', id: number, name: string, type: PetType, gender: PetGender, size: PetSize, birthDate: any } }> } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DeleteResponse', deleted: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type DeleteMissingPostMutationVariables = Exact<{
  deleteMissingPostId: Scalars['Int'];
}>;


export type DeleteMissingPostMutation = { __typename?: 'Mutation', deleteMissingPost: { __typename?: 'DeleteResponse', deleted: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type DeleteUserOwnedPetMutationVariables = Exact<{
  petId: Scalars['Float'];
}>;


export type DeleteUserOwnedPetMutation = { __typename?: 'Mutation', deleteUserOwnedPet: boolean };

export type EditCommentMutationVariables = Exact<{
  text: Scalars['String'];
  commentId: Scalars['Int'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'CommentResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, comment?: Maybe<{ __typename?: 'Comment', id: number, updatedAt: any, createdAt: any, postId: number, parentId?: Maybe<number>, text: string, points: number, voteStatus?: Maybe<number>, repliesCount: number, isReply: boolean, isEdited: boolean, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> } }> } };

export type EditMissingPostMutationVariables = Exact<{
  input: UpdateMissingPostInput;
  id: Scalars['Int'];
}>;


export type EditMissingPostMutation = { __typename?: 'Mutation', editMissingPost: { __typename?: 'EditMissingPostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, missingPost?: Maybe<{ __typename?: 'MissingPost', id: number, title: string, description: string, voteStatus?: Maybe<number>, privacy: PrivacyType, type: MissingPostTypes, showEmail?: Maybe<boolean>, showPhoneNumber?: Maybe<boolean>, commentsCount: number, tags: Array<MissingPostTags>, points: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }, thumbnail?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }>, address?: Maybe<{ __typename?: 'Address', id: number, distance?: Maybe<number> }> }> } };

export type ForgotPasswordMutationVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  loginOptions: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', code: number, field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, phone?: Maybe<string>, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, providerId?: Maybe<string>, phoneVerified: boolean, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string>, id: number }> }> } };

export type LoginWithAuthProviderMutationVariables = Exact<{
  providerId: Scalars['String'];
  provider: ProviderTypes;
}>;


export type LoginWithAuthProviderMutation = { __typename?: 'Mutation', loginWithAuthProvider: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, phone?: Maybe<string>, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, providerId?: Maybe<string>, phoneVerified: boolean, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string>, id: number }> }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type PostVoteMutationVariables = Exact<{
  value: Scalars['Int'];
  id: Scalars['Int'];
}>;


export type PostVoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'VotingResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type RegisterMutationVariables = Exact<{
  registerOptions: BaseRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, phone?: Maybe<string>, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, providerId?: Maybe<string>, phoneVerified: boolean, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }> } };

export type RegisterWithProviderMutationVariables = Exact<{
  providerId: Scalars['String'];
  provider: ProviderTypes;
}>;


export type RegisterWithProviderMutation = { __typename?: 'Mutation', registerWithAuthProvider: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, phone?: Maybe<string>, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, providerId?: Maybe<string>, phoneVerified: boolean, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }> } };

export type SendOtpMutationVariables = Exact<{
  sendOtpPhone: Scalars['String'];
  email: Scalars['String'];
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOTP: { __typename?: 'RegularResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, code: number, field: string }>> } };

export type UpdateUserInfoMutationVariables = Exact<{
  updateUserUpdateOptions: UpdateUserInfo;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUser: boolean };

export type UpdootCommentMutationVariables = Exact<{
  value: Scalars['Int'];
  id: Scalars['Int'];
}>;


export type UpdootCommentMutation = { __typename?: 'Mutation', updootComment: { __typename?: 'CommentResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, comment?: Maybe<{ __typename?: 'Comment', id: number, updatedAt: any, createdAt: any, postId: number, parentId?: Maybe<number>, text: string, points: number, voteStatus?: Maybe<number>, repliesCount: number, isReply: boolean, isEdited: boolean, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> } }> } };

export type UploadAvatarMutationVariables = Exact<{
  uploadAvatarImage: Scalars['Upload'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar: { __typename?: 'UploadImageResponse', url?: Maybe<string>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type VerifyPhoneNumberMutationVariables = Exact<{
  otp: Scalars['String'];
  phone: Scalars['String'];
}>;


export type VerifyPhoneNumberMutation = { __typename?: 'Mutation', verifyPhoneNumber: { __typename?: 'RegularResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type AdoptionPostsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type AdoptionPostsQuery = { __typename?: 'Query', adoptionPosts: { __typename?: 'PaginatedAdoptionPosts', hasMore: boolean, posts: Array<{ __typename?: 'AdoptionPost', id: number, createdAt: any, updatedAt: any, pet: { __typename?: 'Pet', id: number, name: string, gender: PetGender, size: PetSize, birthDate: any, breeds: Array<{ __typename?: 'PetBreed', breed: Breeds }>, thumbnail?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> }, address?: Maybe<{ __typename?: 'Address', distance?: Maybe<number>, country?: Maybe<string>, state?: Maybe<string> }> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type GetCommentRepliesQueryVariables = Exact<{
  options: ParentCommentReplies;
}>;


export type GetCommentRepliesQuery = { __typename?: 'Query', getCommentReplies: { __typename?: 'PaginatedComments', hasMore?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, comments: Array<{ __typename?: 'Comment', id: number, updatedAt: any, createdAt: any, postId: number, parentId?: Maybe<number>, text: string, points: number, voteStatus?: Maybe<number>, repliesCount: number, isReply: boolean, isEdited: boolean, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> } }> } };

export type GetUserPhoneQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetUserPhoneQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', id: number, displayName: string, phone?: Maybe<string> }> };

export type GetUserEmailQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetUserEmailQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', id: number, displayName: string, email: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, email: string, phone?: Maybe<string>, displayName: string, full_name: string, confirmed: boolean, blocked: boolean, lng?: Maybe<string>, lat?: Maybe<string>, bio?: Maybe<string>, last_login?: Maybe<any>, createdAt: any, updatedAt: any, provider: string, providerId?: Maybe<string>, phoneVerified: boolean, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string>, id: number }> }> };

export type MissingPostCommentsQueryVariables = Exact<{
  options: MissingPostComments;
}>;


export type MissingPostCommentsQuery = { __typename?: 'Query', comments: { __typename?: 'PaginatedComments', hasMore?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, comments: Array<{ __typename?: 'Comment', id: number, updatedAt: any, createdAt: any, postId: number, parentId?: Maybe<number>, text: string, points: number, voteStatus?: Maybe<number>, repliesCount: number, isReply: boolean, isEdited: boolean, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> } }> } };

export type MissingPostQueryVariables = Exact<{
  missingPostId: Scalars['Int'];
}>;


export type MissingPostQuery = { __typename?: 'Query', missingPost: { __typename?: 'MissingPostResponse', isOwner?: Maybe<boolean>, missingPost?: Maybe<{ __typename?: 'MissingPost', id: number, title: string, description: string, voteStatus?: Maybe<number>, privacy: PrivacyType, type: MissingPostTypes, showEmail?: Maybe<boolean>, showPhoneNumber?: Maybe<boolean>, commentsCount: number, tags: Array<MissingPostTags>, points: number, createdAt: any, updatedAt: any, address?: Maybe<{ __typename?: 'Address', id: number, street_name?: Maybe<string>, street_number?: Maybe<number>, formatted_address?: Maybe<string>, city?: Maybe<string>, state?: Maybe<string>, zip?: Maybe<string>, country?: Maybe<string>, lat: string, lng: string, distance?: Maybe<number> }>, images: Array<{ __typename?: 'PostImages', photo: { __typename?: 'Photo', id: number, url?: Maybe<string> } }>, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }, thumbnail?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export type MissingPostsQueryVariables = Exact<{
  input: PaginationArgs;
  filters?: Maybe<PostFilters>;
  type?: Maybe<MissingPostTypes>;
  length?: Maybe<Scalars['Int']>;
}>;


export type MissingPostsQuery = { __typename?: 'Query', missingPosts: { __typename?: 'PaginatedMissingPosts', hasMore?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, missingPosts: Array<{ __typename?: 'MissingPost', descriptionSnippet: string, id: number, title: string, description: string, voteStatus?: Maybe<number>, privacy: PrivacyType, type: MissingPostTypes, showEmail?: Maybe<boolean>, showPhoneNumber?: Maybe<boolean>, commentsCount: number, tags: Array<MissingPostTags>, points: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, displayName: string, avatar?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }> }, thumbnail?: Maybe<{ __typename?: 'Photo', id: number, url?: Maybe<string> }>, address?: Maybe<{ __typename?: 'Address', id: number, distance?: Maybe<number> }> }> } };

export type UserContactInfoQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserContactInfoQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', id: number, displayName: string, email: string, phone?: Maybe<string> }> };

export type UserOwnedPetQueryVariables = Exact<{
  userOwnedPetId: Scalars['Int'];
}>;


export type UserOwnedPetQuery = { __typename?: 'Query', userOwnedPet?: Maybe<{ __typename?: 'OwnedPet', updatedAt: any, createdAt: any, about: string, petId: number, userId: number, user: { __typename?: 'User', id: number, updatedAt: any, createdAt: any, email: string }, pet: { __typename?: 'Pet', id: number, name: string, type: PetType, gender: PetGender, size: PetSize, birthDate: any, colors: Array<{ __typename?: 'PetColor', color: PetColors }>, images?: Maybe<Array<{ __typename?: 'PetImages', photo: { __typename?: 'Photo', url?: Maybe<string> } }>> } }> };

export type UserOwnedPetsQueryVariables = Exact<{
  userId: Scalars['Float'];
  paginationArgs: PaginationArgs;
}>;


export type UserOwnedPetsQuery = { __typename?: 'Query', userOwnedPets: { __typename?: 'PaginatedUserOwnedPetsResponse', hasMore?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>>, ownedPets: Array<{ __typename?: 'OwnedPet', id: number, userId: number, petId: number, createdAt: any, pet: { __typename?: 'Pet', id: number, updatedAt: any, createdAt: any, name: string, type: PetType, birthDate: any, thumbnail?: Maybe<{ __typename?: 'Photo', url?: Maybe<string> }> } }> } };

export type UserProfilePageQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserProfilePageQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', id: number, full_name: string, displayName: string, createdAt: any, bio?: Maybe<string>, petsCount?: Maybe<number>, avatar?: Maybe<{ __typename?: 'Photo', url?: Maybe<string>, id: number }> }> };

export type PaginatedUsersQueryVariables = Exact<{
  usersWhere: WhereClause;
}>;


export type PaginatedUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', hasMore: boolean, users: Array<{ __typename?: 'User', id: number, email: string, phone?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string, code: number }>> } };

export const CommentFragmentFragmentDoc = gql`
    fragment CommentFragment on Comment {
  id
  updatedAt
  createdAt
  postId
  parentId
  text
  points
  voteStatus
  user {
    id
    displayName
    avatar {
      url
    }
  }
  repliesCount
  isReply
  isEdited
}
    `;
export const MissingPostFragmentFragmentDoc = gql`
    fragment MissingPostFragment on MissingPost {
  id
  title
  description
  voteStatus
  privacy
  type
  showEmail
  showPhoneNumber
  commentsCount
  tags
  points
  createdAt
  updatedAt
  user {
    id
    displayName
    avatar {
      id
      url
    }
  }
  thumbnail {
    id
    url
  }
  address {
    id
    distance
  }
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
  providerId
  phoneVerified
  avatar {
    id
    url
  }
}
    `;
export const AddMpCommentDocument = gql`
    mutation AddMPComment($input: CreateCommentInputType!) {
  addMPComment(input: $input) {
    errors {
      field
      message
      code
    }
    comment {
      ...CommentFragment
      replies {
        ...CommentFragment
      }
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type AddMpCommentMutationFn = Apollo.MutationFunction<AddMpCommentMutation, AddMpCommentMutationVariables>;

/**
 * __useAddMpCommentMutation__
 *
 * To run a mutation, you first call `useAddMpCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMpCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMpCommentMutation, { data, loading, error }] = useAddMpCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMpCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddMpCommentMutation, AddMpCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMpCommentMutation, AddMpCommentMutationVariables>(AddMpCommentDocument, options);
      }
export type AddMpCommentMutationHookResult = ReturnType<typeof useAddMpCommentMutation>;
export type AddMpCommentMutationResult = Apollo.MutationResult<AddMpCommentMutation>;
export type AddMpCommentMutationOptions = Apollo.BaseMutationOptions<AddMpCommentMutation, AddMpCommentMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($options: ChangePasswordInput!) {
  changePassword(options: $options) {
    errors {
      field
      message
      code
    }
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
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
export const CreateUserOwnedPetDocument = gql`
    mutation CreateUserOwnedPet($images: [Upload!]!, $petInfo: CreatePetInput!) {
  createUserOwnedPet(images: $images, petInfo: $petInfo) {
    errors {
      field
      message
      code
    }
    ownedPet {
      updatedAt
      createdAt
      pet {
        id
        name
        type
        gender
        size
        birthDate
      }
      userId
      about
    }
  }
}
    `;
export type CreateUserOwnedPetMutationFn = Apollo.MutationFunction<CreateUserOwnedPetMutation, CreateUserOwnedPetMutationVariables>;

/**
 * __useCreateUserOwnedPetMutation__
 *
 * To run a mutation, you first call `useCreateUserOwnedPetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserOwnedPetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserOwnedPetMutation, { data, loading, error }] = useCreateUserOwnedPetMutation({
 *   variables: {
 *      images: // value for 'images'
 *      petInfo: // value for 'petInfo'
 *   },
 * });
 */
export function useCreateUserOwnedPetMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserOwnedPetMutation, CreateUserOwnedPetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserOwnedPetMutation, CreateUserOwnedPetMutationVariables>(CreateUserOwnedPetDocument, options);
      }
export type CreateUserOwnedPetMutationHookResult = ReturnType<typeof useCreateUserOwnedPetMutation>;
export type CreateUserOwnedPetMutationResult = Apollo.MutationResult<CreateUserOwnedPetMutation>;
export type CreateUserOwnedPetMutationOptions = Apollo.BaseMutationOptions<CreateUserOwnedPetMutation, CreateUserOwnedPetMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: Int!) {
  deleteComment(commentId: $commentId) {
    errors {
      field
      message
      code
    }
    deleted
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteMissingPostDocument = gql`
    mutation DeleteMissingPost($deleteMissingPostId: Int!) {
  deleteMissingPost(id: $deleteMissingPostId) {
    errors {
      field
      message
      code
    }
    deleted
  }
}
    `;
export type DeleteMissingPostMutationFn = Apollo.MutationFunction<DeleteMissingPostMutation, DeleteMissingPostMutationVariables>;

/**
 * __useDeleteMissingPostMutation__
 *
 * To run a mutation, you first call `useDeleteMissingPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMissingPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMissingPostMutation, { data, loading, error }] = useDeleteMissingPostMutation({
 *   variables: {
 *      deleteMissingPostId: // value for 'deleteMissingPostId'
 *   },
 * });
 */
export function useDeleteMissingPostMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMissingPostMutation, DeleteMissingPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMissingPostMutation, DeleteMissingPostMutationVariables>(DeleteMissingPostDocument, options);
      }
export type DeleteMissingPostMutationHookResult = ReturnType<typeof useDeleteMissingPostMutation>;
export type DeleteMissingPostMutationResult = Apollo.MutationResult<DeleteMissingPostMutation>;
export type DeleteMissingPostMutationOptions = Apollo.BaseMutationOptions<DeleteMissingPostMutation, DeleteMissingPostMutationVariables>;
export const DeleteUserOwnedPetDocument = gql`
    mutation DeleteUserOwnedPet($petId: Float!) {
  deleteUserOwnedPet(petId: $petId)
}
    `;
export type DeleteUserOwnedPetMutationFn = Apollo.MutationFunction<DeleteUserOwnedPetMutation, DeleteUserOwnedPetMutationVariables>;

/**
 * __useDeleteUserOwnedPetMutation__
 *
 * To run a mutation, you first call `useDeleteUserOwnedPetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserOwnedPetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserOwnedPetMutation, { data, loading, error }] = useDeleteUserOwnedPetMutation({
 *   variables: {
 *      petId: // value for 'petId'
 *   },
 * });
 */
export function useDeleteUserOwnedPetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserOwnedPetMutation, DeleteUserOwnedPetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserOwnedPetMutation, DeleteUserOwnedPetMutationVariables>(DeleteUserOwnedPetDocument, options);
      }
export type DeleteUserOwnedPetMutationHookResult = ReturnType<typeof useDeleteUserOwnedPetMutation>;
export type DeleteUserOwnedPetMutationResult = Apollo.MutationResult<DeleteUserOwnedPetMutation>;
export type DeleteUserOwnedPetMutationOptions = Apollo.BaseMutationOptions<DeleteUserOwnedPetMutation, DeleteUserOwnedPetMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($text: String!, $commentId: Int!) {
  editComment(text: $text, commentId: $commentId) {
    errors {
      field
      message
      code
    }
    comment {
      ...CommentFragment
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      text: // value for 'text'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const EditMissingPostDocument = gql`
    mutation EditMissingPost($input: UpdateMissingPostInput!, $id: Int!) {
  editMissingPost(input: $input, id: $id) {
    errors {
      field
      message
      code
    }
    missingPost {
      ...MissingPostFragment
    }
  }
}
    ${MissingPostFragmentFragmentDoc}`;
export type EditMissingPostMutationFn = Apollo.MutationFunction<EditMissingPostMutation, EditMissingPostMutationVariables>;

/**
 * __useEditMissingPostMutation__
 *
 * To run a mutation, you first call `useEditMissingPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMissingPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMissingPostMutation, { data, loading, error }] = useEditMissingPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditMissingPostMutation(baseOptions?: Apollo.MutationHookOptions<EditMissingPostMutation, EditMissingPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMissingPostMutation, EditMissingPostMutationVariables>(EditMissingPostDocument, options);
      }
export type EditMissingPostMutationHookResult = ReturnType<typeof useEditMissingPostMutation>;
export type EditMissingPostMutationResult = Apollo.MutationResult<EditMissingPostMutation>;
export type EditMissingPostMutationOptions = Apollo.BaseMutationOptions<EditMissingPostMutation, EditMissingPostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($identifier: String!) {
  forgotPassword(identifier: $identifier)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
export const LoginWithAuthProviderDocument = gql`
    mutation LoginWithAuthProvider($providerId: String!, $provider: ProviderTypes!) {
  loginWithAuthProvider(providerId: $providerId, provider: $provider) {
    errors {
      field
      message
      code
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
export type LoginWithAuthProviderMutationFn = Apollo.MutationFunction<LoginWithAuthProviderMutation, LoginWithAuthProviderMutationVariables>;

/**
 * __useLoginWithAuthProviderMutation__
 *
 * To run a mutation, you first call `useLoginWithAuthProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithAuthProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithAuthProviderMutation, { data, loading, error }] = useLoginWithAuthProviderMutation({
 *   variables: {
 *      providerId: // value for 'providerId'
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useLoginWithAuthProviderMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithAuthProviderMutation, LoginWithAuthProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithAuthProviderMutation, LoginWithAuthProviderMutationVariables>(LoginWithAuthProviderDocument, options);
      }
export type LoginWithAuthProviderMutationHookResult = ReturnType<typeof useLoginWithAuthProviderMutation>;
export type LoginWithAuthProviderMutationResult = Apollo.MutationResult<LoginWithAuthProviderMutation>;
export type LoginWithAuthProviderMutationOptions = Apollo.BaseMutationOptions<LoginWithAuthProviderMutation, LoginWithAuthProviderMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const PostVoteDocument = gql`
    mutation PostVote($value: Int!, $id: Int!) {
  vote(value: $value, postId: $id) {
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
 *      id: // value for 'id'
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
    mutation Register($registerOptions: BaseRegisterInput!) {
  register(registerOptions: $registerOptions) {
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
 *      registerOptions: // value for 'registerOptions'
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
export const RegisterWithProviderDocument = gql`
    mutation RegisterWithProvider($providerId: String!, $provider: ProviderTypes!) {
  registerWithAuthProvider(providerId: $providerId, provider: $provider) {
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
export type RegisterWithProviderMutationFn = Apollo.MutationFunction<RegisterWithProviderMutation, RegisterWithProviderMutationVariables>;

/**
 * __useRegisterWithProviderMutation__
 *
 * To run a mutation, you first call `useRegisterWithProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterWithProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerWithProviderMutation, { data, loading, error }] = useRegisterWithProviderMutation({
 *   variables: {
 *      providerId: // value for 'providerId'
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useRegisterWithProviderMutation(baseOptions?: Apollo.MutationHookOptions<RegisterWithProviderMutation, RegisterWithProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterWithProviderMutation, RegisterWithProviderMutationVariables>(RegisterWithProviderDocument, options);
      }
export type RegisterWithProviderMutationHookResult = ReturnType<typeof useRegisterWithProviderMutation>;
export type RegisterWithProviderMutationResult = Apollo.MutationResult<RegisterWithProviderMutation>;
export type RegisterWithProviderMutationOptions = Apollo.BaseMutationOptions<RegisterWithProviderMutation, RegisterWithProviderMutationVariables>;
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
export const UpdootCommentDocument = gql`
    mutation UpdootComment($value: Int!, $id: Int!) {
  updootComment(value: $value, commentId: $id) {
    errors {
      field
      message
      code
    }
    comment {
      ...CommentFragment
    }
  }
}
    ${CommentFragmentFragmentDoc}`;
export type UpdootCommentMutationFn = Apollo.MutationFunction<UpdootCommentMutation, UpdootCommentMutationVariables>;

/**
 * __useUpdootCommentMutation__
 *
 * To run a mutation, you first call `useUpdootCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdootCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updootCommentMutation, { data, loading, error }] = useUpdootCommentMutation({
 *   variables: {
 *      value: // value for 'value'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdootCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdootCommentMutation, UpdootCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdootCommentMutation, UpdootCommentMutationVariables>(UpdootCommentDocument, options);
      }
export type UpdootCommentMutationHookResult = ReturnType<typeof useUpdootCommentMutation>;
export type UpdootCommentMutationResult = Apollo.MutationResult<UpdootCommentMutation>;
export type UpdootCommentMutationOptions = Apollo.BaseMutationOptions<UpdootCommentMutation, UpdootCommentMutationVariables>;
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
export const VerifyPhoneNumberDocument = gql`
    mutation VerifyPhoneNumber($otp: String!, $phone: String!) {
  verifyPhoneNumber(otp: $otp, phone: $phone) {
    errors {
      field
      message
      code
    }
    success
  }
}
    `;
export type VerifyPhoneNumberMutationFn = Apollo.MutationFunction<VerifyPhoneNumberMutation, VerifyPhoneNumberMutationVariables>;

/**
 * __useVerifyPhoneNumberMutation__
 *
 * To run a mutation, you first call `useVerifyPhoneNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPhoneNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPhoneNumberMutation, { data, loading, error }] = useVerifyPhoneNumberMutation({
 *   variables: {
 *      otp: // value for 'otp'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useVerifyPhoneNumberMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPhoneNumberMutation, VerifyPhoneNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyPhoneNumberMutation, VerifyPhoneNumberMutationVariables>(VerifyPhoneNumberDocument, options);
      }
export type VerifyPhoneNumberMutationHookResult = ReturnType<typeof useVerifyPhoneNumberMutation>;
export type VerifyPhoneNumberMutationResult = Apollo.MutationResult<VerifyPhoneNumberMutation>;
export type VerifyPhoneNumberMutationOptions = Apollo.BaseMutationOptions<VerifyPhoneNumberMutation, VerifyPhoneNumberMutationVariables>;
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
export const GetCommentRepliesDocument = gql`
    query GetCommentReplies($options: ParentCommentReplies!) {
  getCommentReplies(options: $options) {
    errors {
      field
      message
      code
    }
    hasMore
    comments {
      ...CommentFragment
    }
  }
}
    ${CommentFragmentFragmentDoc}`;

/**
 * __useGetCommentRepliesQuery__
 *
 * To run a query within a React component, call `useGetCommentRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentRepliesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetCommentRepliesQuery(baseOptions: Apollo.QueryHookOptions<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>(GetCommentRepliesDocument, options);
      }
export function useGetCommentRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>(GetCommentRepliesDocument, options);
        }
export type GetCommentRepliesQueryHookResult = ReturnType<typeof useGetCommentRepliesQuery>;
export type GetCommentRepliesLazyQueryHookResult = ReturnType<typeof useGetCommentRepliesLazyQuery>;
export type GetCommentRepliesQueryResult = Apollo.QueryResult<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>;
export const GetUserPhoneDocument = gql`
    query GetUserPhone($userId: Int!) {
  user(id: $userId) {
    id
    displayName
    phone
  }
}
    `;

/**
 * __useGetUserPhoneQuery__
 *
 * To run a query within a React component, call `useGetUserPhoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPhoneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPhoneQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserPhoneQuery(baseOptions: Apollo.QueryHookOptions<GetUserPhoneQuery, GetUserPhoneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPhoneQuery, GetUserPhoneQueryVariables>(GetUserPhoneDocument, options);
      }
export function useGetUserPhoneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPhoneQuery, GetUserPhoneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPhoneQuery, GetUserPhoneQueryVariables>(GetUserPhoneDocument, options);
        }
export type GetUserPhoneQueryHookResult = ReturnType<typeof useGetUserPhoneQuery>;
export type GetUserPhoneLazyQueryHookResult = ReturnType<typeof useGetUserPhoneLazyQuery>;
export type GetUserPhoneQueryResult = Apollo.QueryResult<GetUserPhoneQuery, GetUserPhoneQueryVariables>;
export const GetUserEmailDocument = gql`
    query GetUserEmail($userId: Int!) {
  user(id: $userId) {
    id
    displayName
    email
  }
}
    `;

/**
 * __useGetUserEmailQuery__
 *
 * To run a query within a React component, call `useGetUserEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEmailQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserEmailQuery, GetUserEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEmailQuery, GetUserEmailQueryVariables>(GetUserEmailDocument, options);
      }
export function useGetUserEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEmailQuery, GetUserEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEmailQuery, GetUserEmailQueryVariables>(GetUserEmailDocument, options);
        }
export type GetUserEmailQueryHookResult = ReturnType<typeof useGetUserEmailQuery>;
export type GetUserEmailLazyQueryHookResult = ReturnType<typeof useGetUserEmailLazyQuery>;
export type GetUserEmailQueryResult = Apollo.QueryResult<GetUserEmailQuery, GetUserEmailQueryVariables>;
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
export const MissingPostCommentsDocument = gql`
    query MissingPostComments($options: MissingPostComments!) {
  comments(options: $options) {
    errors {
      field
      message
      code
    }
    hasMore
    comments {
      ...CommentFragment
    }
  }
}
    ${CommentFragmentFragmentDoc}`;

/**
 * __useMissingPostCommentsQuery__
 *
 * To run a query within a React component, call `useMissingPostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMissingPostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMissingPostCommentsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useMissingPostCommentsQuery(baseOptions: Apollo.QueryHookOptions<MissingPostCommentsQuery, MissingPostCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MissingPostCommentsQuery, MissingPostCommentsQueryVariables>(MissingPostCommentsDocument, options);
      }
export function useMissingPostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MissingPostCommentsQuery, MissingPostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MissingPostCommentsQuery, MissingPostCommentsQueryVariables>(MissingPostCommentsDocument, options);
        }
export type MissingPostCommentsQueryHookResult = ReturnType<typeof useMissingPostCommentsQuery>;
export type MissingPostCommentsLazyQueryHookResult = ReturnType<typeof useMissingPostCommentsLazyQuery>;
export type MissingPostCommentsQueryResult = Apollo.QueryResult<MissingPostCommentsQuery, MissingPostCommentsQueryVariables>;
export const MissingPostDocument = gql`
    query MissingPost($missingPostId: Int!) {
  missingPost(id: $missingPostId) {
    missingPost {
      ...MissingPostFragment
      address {
        id
        street_name
        street_number
        formatted_address
        city
        state
        zip
        country
        lat
        lng
      }
      images {
        photo {
          id
          url
        }
      }
    }
    isOwner
    errors {
      field
      message
      code
    }
  }
}
    ${MissingPostFragmentFragmentDoc}`;

/**
 * __useMissingPostQuery__
 *
 * To run a query within a React component, call `useMissingPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useMissingPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMissingPostQuery({
 *   variables: {
 *      missingPostId: // value for 'missingPostId'
 *   },
 * });
 */
export function useMissingPostQuery(baseOptions: Apollo.QueryHookOptions<MissingPostQuery, MissingPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MissingPostQuery, MissingPostQueryVariables>(MissingPostDocument, options);
      }
export function useMissingPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MissingPostQuery, MissingPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MissingPostQuery, MissingPostQueryVariables>(MissingPostDocument, options);
        }
export type MissingPostQueryHookResult = ReturnType<typeof useMissingPostQuery>;
export type MissingPostLazyQueryHookResult = ReturnType<typeof useMissingPostLazyQuery>;
export type MissingPostQueryResult = Apollo.QueryResult<MissingPostQuery, MissingPostQueryVariables>;
export const MissingPostsDocument = gql`
    query MissingPosts($input: PaginationArgs!, $filters: PostFilters, $type: MissingPostTypes, $length: Int) {
  missingPosts(input: $input, filters: $filters, type: $type) {
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
 *      filters: // value for 'filters'
 *      type: // value for 'type'
 *      length: // value for 'length'
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
export const UserContactInfoDocument = gql`
    query UserContactInfo($userId: Int!) {
  user(id: $userId) {
    id
    displayName
    email
    phone
  }
}
    `;

/**
 * __useUserContactInfoQuery__
 *
 * To run a query within a React component, call `useUserContactInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserContactInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserContactInfoQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserContactInfoQuery(baseOptions: Apollo.QueryHookOptions<UserContactInfoQuery, UserContactInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserContactInfoQuery, UserContactInfoQueryVariables>(UserContactInfoDocument, options);
      }
export function useUserContactInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserContactInfoQuery, UserContactInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserContactInfoQuery, UserContactInfoQueryVariables>(UserContactInfoDocument, options);
        }
export type UserContactInfoQueryHookResult = ReturnType<typeof useUserContactInfoQuery>;
export type UserContactInfoLazyQueryHookResult = ReturnType<typeof useUserContactInfoLazyQuery>;
export type UserContactInfoQueryResult = Apollo.QueryResult<UserContactInfoQuery, UserContactInfoQueryVariables>;
export const UserOwnedPetDocument = gql`
    query UserOwnedPet($userOwnedPetId: Int!) {
  userOwnedPet(id: $userOwnedPetId) {
    updatedAt
    createdAt
    about
    petId
    userId
    user {
      id
      updatedAt
      createdAt
      email
    }
    pet {
      id
      name
      type
      gender
      size
      birthDate
      colors {
        color
      }
      images {
        photo {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useUserOwnedPetQuery__
 *
 * To run a query within a React component, call `useUserOwnedPetQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOwnedPetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOwnedPetQuery({
 *   variables: {
 *      userOwnedPetId: // value for 'userOwnedPetId'
 *   },
 * });
 */
export function useUserOwnedPetQuery(baseOptions: Apollo.QueryHookOptions<UserOwnedPetQuery, UserOwnedPetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOwnedPetQuery, UserOwnedPetQueryVariables>(UserOwnedPetDocument, options);
      }
export function useUserOwnedPetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOwnedPetQuery, UserOwnedPetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOwnedPetQuery, UserOwnedPetQueryVariables>(UserOwnedPetDocument, options);
        }
export type UserOwnedPetQueryHookResult = ReturnType<typeof useUserOwnedPetQuery>;
export type UserOwnedPetLazyQueryHookResult = ReturnType<typeof useUserOwnedPetLazyQuery>;
export type UserOwnedPetQueryResult = Apollo.QueryResult<UserOwnedPetQuery, UserOwnedPetQueryVariables>;
export const UserOwnedPetsDocument = gql`
    query UserOwnedPets($userId: Float!, $paginationArgs: PaginationArgs!) {
  userOwnedPets(userId: $userId, paginationArgs: $paginationArgs) {
    errors {
      field
      message
      code
    }
    hasMore
    ownedPets {
      id
      userId
      petId
      createdAt
      pet {
        id
        updatedAt
        createdAt
        name
        type
        birthDate
        thumbnail {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useUserOwnedPetsQuery__
 *
 * To run a query within a React component, call `useUserOwnedPetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOwnedPetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOwnedPetsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      paginationArgs: // value for 'paginationArgs'
 *   },
 * });
 */
export function useUserOwnedPetsQuery(baseOptions: Apollo.QueryHookOptions<UserOwnedPetsQuery, UserOwnedPetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserOwnedPetsQuery, UserOwnedPetsQueryVariables>(UserOwnedPetsDocument, options);
      }
export function useUserOwnedPetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserOwnedPetsQuery, UserOwnedPetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserOwnedPetsQuery, UserOwnedPetsQueryVariables>(UserOwnedPetsDocument, options);
        }
export type UserOwnedPetsQueryHookResult = ReturnType<typeof useUserOwnedPetsQuery>;
export type UserOwnedPetsLazyQueryHookResult = ReturnType<typeof useUserOwnedPetsLazyQuery>;
export type UserOwnedPetsQueryResult = Apollo.QueryResult<UserOwnedPetsQuery, UserOwnedPetsQueryVariables>;
export const UserProfilePageDocument = gql`
    query UserProfilePage($userId: Int!) {
  user(id: $userId) {
    id
    full_name
    displayName
    createdAt
    avatar {
      url
      id
    }
    bio
    petsCount
  }
}
    `;

/**
 * __useUserProfilePageQuery__
 *
 * To run a query within a React component, call `useUserProfilePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfilePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfilePageQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserProfilePageQuery(baseOptions: Apollo.QueryHookOptions<UserProfilePageQuery, UserProfilePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfilePageQuery, UserProfilePageQueryVariables>(UserProfilePageDocument, options);
      }
export function useUserProfilePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfilePageQuery, UserProfilePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfilePageQuery, UserProfilePageQueryVariables>(UserProfilePageDocument, options);
        }
export type UserProfilePageQueryHookResult = ReturnType<typeof useUserProfilePageQuery>;
export type UserProfilePageLazyQueryHookResult = ReturnType<typeof useUserProfilePageLazyQuery>;
export type UserProfilePageQueryResult = Apollo.QueryResult<UserProfilePageQuery, UserProfilePageQueryVariables>;
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