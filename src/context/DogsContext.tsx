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
import { useBreeds, useDogSearch } from '../queries/dogs';
import { useNavigate } from 'react-router-dom';

interface DogsContextType {
  breeds: string[];
  clearFilters: () => void;
  dogs: Dog[];
  error: Error | null;
  filters: DogFilters;
  handleChangePage: (event: unknown, newPage: number) => void;
  isError: boolean;
  isLoading: boolean;
  page: number;
  searchTerm: string;
  setFilters: (filters: DogFilters) => void;
  setSearchTerm: (term: string) => void;
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
  from: 0,
  sort: 'breed:asc',
};

export const DogsProvider = ({ children }: DogsProviderProps) => {
  const [page, setPage] = useState(0);
  const [filters, setFiltersState] = useState<DogFilters>(defaultFilters);
  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const breedsQuery = useBreeds();
  const dogsQuery = useDogSearch(currentPageUrl);

  const error = useMemo(() => {
    return dogsQuery.error || breedsQuery.error;
  }, [dogsQuery.error, breedsQuery.error]);

  const isError = useMemo(() => {
    return dogsQuery.isError || breedsQuery.isError;
  }, [dogsQuery.isError, breedsQuery.isError]);

  const isLoading = useMemo(() => {
    return dogsQuery.isLoading || breedsQuery.isLoading;
  }, [dogsQuery.isLoading, breedsQuery.isLoading]);

  const handleChangePage = useCallback(
    (_event: unknown, newPage: number) => {
      if (newPage > page && dogsQuery.nextPageUrl) {
        setCurrentPageUrl(dogsQuery.nextPageUrl);
      } else if (newPage < page && dogsQuery.prevPageUrl) {
        setCurrentPageUrl(dogsQuery.prevPageUrl);
      }
      setPage(newPage);
    },
    [dogsQuery.nextPageUrl, dogsQuery.prevPageUrl, page],
  );

  const setFilters = useCallback((newFilters: Partial<DogFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filters.breeds && filters.breeds.length > 0) {
      filters.breeds.forEach((breed) => queryParams.append('breeds', breed));
    }

    if (filters.ageMin !== undefined) {
      queryParams.append('ageMin', filters.ageMin.toString());
    }

    if (filters.ageMax !== undefined) {
      queryParams.append('ageMax', filters.ageMax.toString());
    }

    queryParams.append('size', '15');

    if (filters.from !== undefined) {
      queryParams.append('from', filters.from.toString());
    }

    if (filters.sort) {
      queryParams.append('sort', filters.sort);
    }

    setCurrentPageUrl(`/dogs/search?${queryParams}`);
  }, [filters]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [isError, navigate]);

  const value = useMemo(
    () => ({
      breeds: breedsQuery.data || [],
      clearFilters,
      dogs: dogsQuery.dogs || [],
      error,
      filters,
      handleChangePage,
      isError,
      isLoading,
      page,
      searchTerm,
      setFilters,
      setSearchTerm,
      total: dogsQuery.total,
    }),
    [
      breedsQuery.data,
      clearFilters,
      dogsQuery.dogs,
      dogsQuery.total,
      error,
      filters,
      handleChangePage,
      isError,
      isLoading,
      page,
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
