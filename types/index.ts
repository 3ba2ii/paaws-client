import {
  CreateMissingPostInput,
  DateFilters,
  LocationFilters,
  Scalars,
  SortingOrder,
} from 'generated/graphql';

export type LocationType = {
  lat: number;
  lng: number;
};
export declare type Libraries = (
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
)[];

export type FiltersTypes = DateFilters | LocationFilters | SortingOrder;
export type FiltersTypeString = 'date' | 'location' | 'order';

export type TagsType = {
  date: DateFilters | null;
  location: LocationFilters | null;
  order: SortingOrder | null;
};

export type PostInputType = CreateMissingPostInput & {
  images: Array<Scalars['Upload']>;
};
