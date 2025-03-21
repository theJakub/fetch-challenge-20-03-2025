import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from './api';
import { Dog, DogFilters, SearchResult, Match } from '../types';
import { useCallback, useState } from 'react';

// Get all dog breeds
export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: async () => {
      return await fetchWithAuth('/dogs/breeds') as string[];
    },
  });
};

// Search dogs with filters
export const useSearchDogs = (filters: DogFilters, enabled = true) => {
  return useQuery({
    queryKey: ['dogs', 'search', filters],
    queryFn: async () => {
      // Convert filters to query string
      const queryParams = new URLSearchParams();
      
      if (filters.breeds && filters.breeds.length > 0) {
        filters.breeds.forEach(breed => queryParams.append('breeds', breed));
      }
      
      if (filters.zipCodes && filters.zipCodes.length > 0) {
        filters.zipCodes.forEach(zipCode => queryParams.append('zipCodes', zipCode));
      }
      
      if (filters.ageMin !== undefined) {
        queryParams.append('ageMin', filters.ageMin.toString());
      }
      
      if (filters.ageMax !== undefined) {
        queryParams.append('ageMax', filters.ageMax.toString());
      }
      
      if (filters.size !== undefined) {
        queryParams.append('size', filters.size.toString());
      }
      
      if (filters.from !== undefined) {
        queryParams.append('from', filters.from.toString());
      }
      
      if (filters.sort) {
        queryParams.append('sort', filters.sort);
      }
      
      return await fetchWithAuth(`/dogs/search?${queryParams.toString()}`) as SearchResult;
    },
    enabled,
  });
};

// Get dogs by IDs
export const useDogs = (dogIds: string[], enabled = true) => {
  return useQuery({
    queryKey: ['dogs', dogIds],
    queryFn: async () => {
      if (!dogIds.length) return [];
      return await fetchWithAuth('/dogs', {
        method: 'POST',
        body: JSON.stringify(dogIds),
      }) as Dog[];
    },
    enabled: enabled && dogIds.length > 0,
  });
};

// Generate a match from favorite dogs
export const useGenerateMatch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (favoriteIds: string[]) => {
      return await fetchWithAuth('/dogs/match', {
        method: 'POST',
        body: JSON.stringify(favoriteIds),
      }) as Match;
    },
    onSuccess: (data) => {
      // Pre-fetch the matched dog's details
      if (data.match) {
        queryClient.prefetchQuery({
          queryKey: ['dogs', [data.match]],
          queryFn: async () => {
            return await fetchWithAuth('/dogs', {
              method: 'POST',
              body: JSON.stringify([data.match]),
            }) as Dog[];
          },
        });
      }
    },
  });
};

// Custom hook to handle pagination with React Query
export const usePaginatedDogs = (initialFilters: DogFilters) => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<DogFilters>(initialFilters);
  
  const searchQuery = useSearchDogs(filters);
  const dogIdsQuery = useDogs(searchQuery.data?.resultIds || [], searchQuery.isSuccess);
  
  const fetchNextPage = useCallback(() => {
    if (searchQuery.data?.next) {
      // Extract query parameters from the next URL
      const url = new URL(searchQuery.data.next, window.location.origin);
      const nextFilters: DogFilters = { ...filters };
      
      url.searchParams.forEach((value, key) => {
        if (key === 'breeds' || key === 'zipCodes') {
          nextFilters[key] = nextFilters[key] || [];
          nextFilters[key]?.push(value);
        } else if (key === 'ageMin' || key === 'ageMax' || key === 'size' || key === 'from') {
          nextFilters[key] = parseInt(value, 10);
        } else if (key === 'sort') {
          nextFilters.sort = value;
        }
      });
      
      setFilters(nextFilters);
      
      // Prefetch the next page
      queryClient.prefetchQuery({
        queryKey: ['dogs', 'search', nextFilters],
        queryFn: async () => {
          const queryParams = new URLSearchParams(url.search);
          return await fetchWithAuth(`/dogs/search?${queryParams.toString()}`) as SearchResult;
        },
      });
    }
  }, [searchQuery.data, filters, queryClient]);
  
  const fetchPrevPage = useCallback(() => {
    if (searchQuery.data?.prev) {
      // Extract query parameters from the prev URL
      const url = new URL(searchQuery.data.prev, window.location.origin);
      const prevFilters: DogFilters = { ...filters };
      
      url.searchParams.forEach((value, key) => {
        if (key === 'breeds' || key === 'zipCodes') {
          prevFilters[key] = prevFilters[key] || [];
          prevFilters[key]?.push(value);
        } else if (key === 'ageMin' || key === 'ageMax' || key === 'size' || key === 'from') {
          prevFilters[key] = parseInt(value, 10);
        } else if (key === 'sort') {
          prevFilters.sort = value;
        }
      });
      
      setFilters(prevFilters);
    }
  }, [searchQuery.data, filters]);
  
  return {
    filters,
    setFilters,
    searchResult: searchQuery.data,
    dogs: dogIdsQuery.data || [],
    isLoading: searchQuery.isLoading || dogIdsQuery.isLoading,
    isError: searchQuery.isError || dogIdsQuery.isError,
    error: searchQuery.error || dogIdsQuery.error,
    fetchNextPage,
    fetchPrevPage,
  };
};
