import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';
import { Dog, DogFilters } from '../types';
import {
  fetchDogsByIds,
  fetchSearchResults,
  useBreeds,
  useDogSearch,
} from '../queries/dogs';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../queries/queryClient';
import { useGetZips } from '../queries/location';

interface DogsContextType {
  breeds: string[];
  clearFilters: () => void;
  dogs: Dog[];
  error: Error | null;
  favoriteDogs: Record<string, Dog>;
  filters: DogFilters;
  handleAddFavoriteDog: (dog: Dog) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleRemoveFavoriteDog: (dogId: string) => void;
  handleSetCity: (locationCity: string) => void;
  handleSetState: (locationState: string) => void;
  isError: boolean;
  isPending: boolean;
  locationCity: string;
  locationState: string;
  setFilters: (filters: DogFilters) => void;
  total: number;
}

const DogsContext = createContext<DogsContextType | undefined>(undefined);

interface DogsProviderProps {
  children: ReactNode;
}

const defaultFilters: DogFilters = {
  ageMax: undefined,
  ageMin: undefined,
  breeds: [],
  page: 0,
  sort: 'breed:asc',
  zipCodes: [],
};

export const DogsProvider = ({ children }: DogsProviderProps) => {
  const [filters, setFiltersState] = useState<DogFilters>(defaultFilters);
  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);
  const [locationCity, setLocationCity] = useState('');
  const [locationState, setLocationState] = useState('');
  const [favoriteDogs, setFavoriteDogs] = useState<{ [key: string]: Dog }>({});

  const navigate = useNavigate();
  const breedsQuery = useBreeds();
  const zipsQuery = useGetZips(locationCity, locationState);
  const dogsQuery = useDogSearch(currentPageUrl, !zipsQuery.isLoading);

  const error = useMemo(() => {
    return dogsQuery.error || breedsQuery.error;
  }, [dogsQuery.error, breedsQuery.error]);

  const isError = useMemo(() => {
    return dogsQuery.isError || breedsQuery.isError;
  }, [dogsQuery.isError, breedsQuery.isError]);

  const isPending = useMemo(() => {
    return dogsQuery.isPending || breedsQuery.isPending;
  }, [dogsQuery.isPending, breedsQuery.isPending]);

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setFiltersState((prev) => ({ ...prev, page: newPage }));
  }, []);

  const setFilters = useCallback((newFilters: Partial<DogFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const handleSetCity = useCallback((newCity: string) => {
    setLocationCity(newCity);
  }, []);

  const handleSetState = useCallback((newState: string) => {
    setLocationState(newState);
  }, []);

  const handleAddFavoriteDog = useCallback((dog: Dog) => {
    setFavoriteDogs((prev) => ({ ...prev, [dog.id]: dog }));
  }, []);

  const handleRemoveFavoriteDog = useCallback((dogId: string) => {
    setFavoriteDogs((prev) => {
      const newFavoriteDogs = { ...prev };
      delete newFavoriteDogs[dogId];
      return newFavoriteDogs;
    });
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filters.page !== undefined) {
      queryParams.append('from', (filters.page * 15).toString());
    } else {
      queryParams.append('from', '0');
    }

    if (filters.breeds && filters.breeds.length > 0) {
      filters.breeds.forEach((breed) => queryParams.append('breeds', breed));
    }

    if (locationCity && locationState && zipsQuery?.data?.length) {
      zipsQuery.data.forEach((zip: string) =>
        queryParams.append('zipCodes', zip),
      );
    }

    if (filters.ageMin !== undefined) {
      queryParams.append('ageMin', filters.ageMin.toString());
    }

    if (filters.ageMax !== undefined) {
      queryParams.append('ageMax', filters.ageMax.toString());
    }

    queryParams.append('size', '15');

    if (filters.sort) {
      queryParams.append('sort', filters.sort);
    }

    setCurrentPageUrl(`/dogs/search?${queryParams}`);
  }, [filters, locationCity, locationState, zipsQuery.data]);

  // The "next" value from the API is not formatted correctly for zipCodes
  // if a filter set includes zipCodes, skip the prefetch since the 'next' value
  // will cause a 500 error
  useEffect(() => {
    if (
      dogsQuery.nextPageUrl &&
      !dogsQuery.nextPageUrl.includes('zipCodes%5B')
    ) {
      queryClient.prefetchQuery({
        queryKey: ['dogSearch', dogsQuery.nextPageUrl],
        queryFn: async () => {
          const searchData = await fetchSearchResults(dogsQuery.nextPageUrl);

          if (searchData?.resultIds?.length) {
            queryClient.prefetchQuery({
              queryKey: ['dogs', searchData.resultIds],
              queryFn: async () => {
                const dogData = await fetchDogsByIds(searchData.resultIds);
                return dogData;
              },
            });
          }

          return searchData;
        },
      });
    }
  }, [dogsQuery.nextPageUrl]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('user');
      localStorage.removeItem('favoriteDogs');
      navigate('/login');
    }
  }, [isError, navigate]);

  useEffect(() => {
    localStorage.setItem('favoriteDogs', JSON.stringify(favoriteDogs));
  }, [favoriteDogs]);

  useEffect(() => {
    const favoriteDogs = localStorage.getItem('favoriteDogs');
    if (favoriteDogs) {
      setFavoriteDogs(JSON.parse(favoriteDogs));
    }
  }, []);

  const value = useMemo(
    () => ({
      breeds: breedsQuery.data || [],
      clearFilters,
      dogs: dogsQuery.dogs || [],
      error,
      favoriteDogs,
      filters,
      handleAddFavoriteDog,
      handleChangePage,
      handleRemoveFavoriteDog,
      handleSetCity,
      handleSetState,
      isError,
      isPending,
      locationCity,
      locationState,
      setFilters,
      total: dogsQuery.total,
    }),
    [
      breedsQuery.data,
      clearFilters,
      dogsQuery.dogs,
      dogsQuery.total,
      error,
      favoriteDogs,
      filters,
      handleAddFavoriteDog,
      handleChangePage,
      handleRemoveFavoriteDog,
      handleSetCity,
      handleSetState,
      isError,
      isPending,
      locationCity,
      locationState,
      setFilters,
    ],
  );

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
};

export const useDogsContext = () => {
  const context = useContext(DogsContext);

  if (context === undefined) {
    throw new Error('useDogContext must be used within a DogsProvider');
  }

  return context;
};
