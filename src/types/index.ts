export interface Dog {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

export interface Location {
  city: string;
  county: string;
  latitude: number;
  longitude: number;
  state: string;
  zip_code: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface SearchResult {
  next?: string;
  prev?: string;
  resultIds: string[];
  total: number;
}

export interface Match {
  match: string;
}

export interface User {
  email: string;
  name: string;
}

export interface DogFilters {
  ageMax?: number;
  ageMin?: number;
  breeds?: string[];
  from?: number;
  size?: number;
  sort?: string;
  zipCodes?: string[];
}

export interface LocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    bottom_left?: Coordinates;
    top_right?: Coordinates;
    bottom_right?: Coordinates;
    top_left?: Coordinates;
  };
  size?: number;
  from?: number;
}

export interface LocationSearchResult {
  results: Location[];
  total: number;
}
