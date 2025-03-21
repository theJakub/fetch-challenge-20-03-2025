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
import {
  useBreeds,
  useSearchDogs,
  useDogs,
  useGenerateMatch,
  usePaginatedDogs,
} from '../queries/dogs';

interface DogsContextType {
  // Data
  dogs: Dog[];
  breeds: string[];
  searchResult: SearchResult | undefined;
  selectedDog: Dog | null;
  favorites: Dog[];

  // Filters and sorting
  filters: DogFilters;
  searchTerm: string;
  sortField: keyof Dog;
  sortDirection: 'asc' | 'desc';

  // Pagination
  page: number;
  rowsPerPage: number;
  totalDogs: number;

  // Loading and error states
  isLoading: boolean;
  isError: boolean;
  error: Error | null;

  // Actions
  setFilters: (filters: DogFilters) => void;
  setSearchTerm: (term: string) => void;
  setSortField: (field: keyof Dog) => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  addToFavorites: (dog: Dog) => void;
  removeFromFavorites: (dogId: string) => void;
  clearFavorites: () => void;
  selectDog: (dog: Dog | null) => void;
  generateMatch: () => Promise<Dog | null>;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
  applySearch: () => void;
  isFavorite: (dogId: string) => boolean;
}

const DogsContext = createContext<DogsContextType | undefined>(undefined);

interface DogsProviderProps {
  children: ReactNode;
}

export const DogsProvider: React.FC<DogsProviderProps> = ({ children }) => {
  // State for filters and sorting
  const [filters, setFiltersState] = useState<DogFilters>({
    breeds: [],
    ageMin: undefined,
    ageMax: undefined,
    sort: 'breed:asc',
    size: 25,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Dog>('breed');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // State for selected dog and favorites
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [favorites, setFavorites] = useState<Dog[]>([]);

  // Fetch breeds
  const breedsQuery = useBreeds();

  // Use the paginated dogs hook
  const {
    dogs,
    searchResult,
    isLoading,
    isError,
    error,
    fetchNextPage,
    fetchPrevPage,
    setFilters: setPaginatedFilters,
  } = usePaginatedDogs(filters);

  // Generate match mutation
  const generateMatchMutation = useGenerateMatch();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('dogFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('dogFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Update sort in filters when sortField or sortDirection changes
  useEffect(() => {
    setFiltersState((prev) => ({
      ...prev,
      sort: `${sortField}:${sortDirection}`,
    }));
  }, [sortField, sortDirection]);

  // Set filters with proper size and from values for pagination
  const setFilters = useCallback(
    (newFilters: DogFilters) => {
      const updatedFilters = {
        ...newFilters,
        size: rowsPerPage,
        from: page * rowsPerPage,
      };
      setFiltersState(updatedFilters);
      setPaginatedFilters(updatedFilters);
    },
    [page, rowsPerPage, setPaginatedFilters],
  );

  // Apply search term to filter dogs by name or breed
  const applySearch = useCallback(() => {
    // This is a client-side filter since the API doesn't support name search
    // The actual filtering happens in the computed filteredDogs value
  }, []);

  // Handle page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      setFilters({
        ...filters,
        from: newPage * rowsPerPage,
      });
    },
    [filters, rowsPerPage, setFilters],
  );

  // Handle rows per page change
  const handleRowsPerPageChange = useCallback(
    (newRowsPerPage: number) => {
      setRowsPerPage(newRowsPerPage);
      setPage(0); // Reset to first page
      setFilters({
        ...filters,
        size: newRowsPerPage,
        from: 0,
      });
    },
    [filters, setFilters],
  );

  // Add dog to favorites
  const addToFavorites = useCallback((dog: Dog) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === dog.id)) {
        return prev;
      }
      return [...prev, dog];
    });
  }, []);

  // Remove dog from favorites
  const removeFromFavorites = useCallback((dogId: string) => {
    setFavorites((prev) => prev.filter((dog) => dog.id !== dogId));
  }, []);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  // Check if a dog is in favorites
  const isFavorite = useCallback(
    (dogId: string) => {
      return favorites.some((dog) => dog.id === dogId);
    },
    [favorites],
  );

  // Select a dog for details view
  const selectDog = useCallback((dog: Dog | null) => {
    setSelectedDog(dog);
  }, []);

  // Generate a match from favorites
  const generateMatch = useCallback(async () => {
    if (favorites.length === 0) {
      return null;
    }

    try {
      const favoriteIds = favorites.map((dog) => dog.id);
      const result = await generateMatchMutation.mutateAsync(favoriteIds);

      if (result.match) {
        // Find the matched dog in our favorites
        const matchedDog = favorites.find((dog) => dog.id === result.match);

        if (matchedDog) {
          return matchedDog;
        }

        // If not found in favorites, fetch it
        const dogsQuery = useDogs([result.match], true);
        if (dogsQuery.data && dogsQuery.data.length > 0) {
          return dogsQuery.data[0];
        }
      }

      return null;
    } catch (error) {
      console.error('Error generating match:', error);
      return null;
    }
  }, [favorites, generateMatchMutation]);

  // Filter dogs by search term (client-side filtering)
  const filteredDogs = useMemo(() => {
    if (!searchTerm) return dogs;

    return dogs.filter(
      (dog) =>
        dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dog.breed.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [dogs, searchTerm]);

  // Calculate total dogs count
  const totalDogs = useMemo(() => {
    return searchResult?.total || 0;
  }, [searchResult]);

  // Context value
  const value = useMemo(
    () => ({
      dogs: filteredDogs,
      breeds: breedsQuery.data || [],
      searchResult,
      selectedDog,
      favorites,

      filters,
      searchTerm,
      sortField,
      sortDirection,

      page,
      rowsPerPage,
      totalDogs,

      isLoading,
      isError,
      error,

      setFilters,
      setSearchTerm,
      setSortField,
      setSortDirection,
      setPage: handlePageChange,
      setRowsPerPage: handleRowsPerPageChange,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
      selectDog,
      generateMatch,
      fetchNextPage,
      fetchPrevPage,
      applySearch,
      isFavorite,
    }),
    [
      filteredDogs,
      breedsQuery.data,
      searchResult,
      selectedDog,
      favorites,
      filters,
      searchTerm,
      sortField,
      sortDirection,
      page,
      rowsPerPage,
      totalDogs,
      isLoading,
      isError,
      error,
      setFilters,
      setSearchTerm,
      setSortField,
      setSortDirection,
      handlePageChange,
      handleRowsPerPageChange,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
      selectDog,
      generateMatch,
      fetchNextPage,
      fetchPrevPage,
      applySearch,
      isFavorite,
    ],
  );

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
};

// Custom hook to use the dogs context
export const useDogContext = () => {
  const context = useContext(DogsContext);

  if (context === undefined) {
    throw new Error('useDogContext must be used within a DogsProvider');
  }

  return context;
};
