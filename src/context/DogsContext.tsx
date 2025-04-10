import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';
import { Dog, DogFilters, SearchResult } from '../types';
import { useBreeds, useSearchDogs, useDogs } from '../queries/dogs';
import { useNavigate } from 'react-router-dom';

interface DogsContextType {
  dogs: Dog[];
  breeds: string[];
  error: Error | null;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
  filters: DogFilters;
  isError: boolean;
  isLoading: boolean;
  searchResult: SearchResult | undefined;
  searchTerm: string;
  setFilters: (filters: DogFilters) => void;
  setSearchTerm: (term: string) => void;
}

const DogsContext = createContext<DogsContextType | undefined>(undefined);

interface DogsProviderProps {
  children: ReactNode;
}

export const DogsProvider: React.FC<DogsProviderProps> = ({ children }) => {
  const [filters, setFiltersState] = useState<DogFilters>({
    breeds: [],
    ageMin: undefined,
    ageMax: undefined,
    sort: 'breed:asc',
    from: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const breedsQuery = useBreeds();
  const searchQuery = useSearchDogs(filters);
  const dogIdsQuery = useDogs(
    searchQuery.data?.resultIds || [],
    searchQuery.isSuccess,
  );

  const error = useMemo(() => {
    return searchQuery.error || breedsQuery.error || dogIdsQuery.error;
  }, [searchQuery.error, breedsQuery.error, dogIdsQuery.error]);

  const isError = useMemo(() => {
    return searchQuery.isError || breedsQuery.isError || dogIdsQuery.isError;
  }, [searchQuery.isError, breedsQuery.isError, dogIdsQuery.isError]);

  const isLoading = useMemo(() => {
    return (
      searchQuery.isLoading || breedsQuery.isLoading || dogIdsQuery.isLoading
    );
  }, [searchQuery.isLoading, breedsQuery.isLoading, dogIdsQuery.isLoading]);

  const fetchNextPage = useCallback(() => {
    if (searchQuery.data?.next) {
      const url = new URL(searchQuery.data.next, window.location.origin);
      const nextFilters: DogFilters = { ...filters };

      // Extract 'from' parameter from next URL
      const fromParam = url.searchParams.get('from');
      if (fromParam) {
        nextFilters.from = parseInt(fromParam, 10);
      }

      setFiltersState(nextFilters);
    }
  }, [searchQuery.data, filters]);

  const fetchPrevPage = useCallback(() => {
    if (searchQuery.data?.prev) {
      const url = new URL(searchQuery.data.prev, window.location.origin);
      const prevFilters: DogFilters = { ...filters };

      // Extract 'from' parameter from prev URL
      const fromParam = url.searchParams.get('from');
      if (fromParam) {
        prevFilters.from = parseInt(fromParam, 10);
      }

      setFiltersState(prevFilters);
    }
  }, [searchQuery.data, filters]);

  const setFilters = useCallback((newFilters: DogFilters) => {
    setFiltersState({
      ...newFilters,
      from: newFilters.from || 0,
    });
  }, []);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [isError]);
  console.log('searchQuery', searchQuery.data);
  const value = useMemo(
    () => ({
      dogs: dogIdsQuery.data || [],
      breeds: breedsQuery.data || [],
      error,
      fetchNextPage,
      fetchPrevPage,
      filters,
      isError,
      isLoading,
      searchResult: searchQuery.data,
      searchTerm,
      setFilters,
      setSearchTerm,
    }),
    [
      breedsQuery.data,
      dogIdsQuery.data,
      error,
      fetchNextPage,
      fetchPrevPage,
      filters,
      isError,
      isLoading,
      searchQuery.data,
      searchTerm,
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
