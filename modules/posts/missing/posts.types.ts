import {
  Maybe,
  MissingPostTags,
  MissingPostTypes,
  PrivacyType,
} from 'generated/graphql';

export type MissingPostType = {
  __typename?: 'MissingPost';
  descriptionSnippet: string;
  id: number;
  title: string;
  description: string;
  voteStatus?: Maybe<number>;
  privacy: PrivacyType;
  type: MissingPostTypes;
  showEmail?: Maybe<boolean>;
  showPhoneNumber?: Maybe<boolean>;
  commentsCount: number;
  tags: Array<MissingPostTags>;
  points: number;
  createdAt: any;
  updatedAt: any;
  user: {
    __typename?: 'User';
    id: number;
    displayName: string;
    avatar?: Maybe<{
      __typename?: 'Photo';
      id: number;
      url?: Maybe<string>;
    }>;
  };
  thumbnail?: Maybe<{
    __typename?: 'Photo';
    id: number;
    url?: Maybe<string>;
  }>;
  address?: Maybe<{
    __typename?: 'Address';
    id: number;
    distance?: Maybe<number>;
  }>;
};
