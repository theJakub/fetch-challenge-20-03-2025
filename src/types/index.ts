import { State } from "../constants/states";

export interface Dog {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
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

export type SortType = 'breed:asc' | 'breed:desc' | 'age:asc' | 'age:desc' | 'name:asc' | 'name:desc';

export interface DogFilters {
  ageMax?: number;
  ageMin?: number;
  breeds: string[];
  page: number;
  sort: SortType;
  zipCodes: string[];
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: State;
  county: string;
}

export interface LocationSearchResponse {
  results: Location[];
  total: number;
}
