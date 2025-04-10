import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from './api';
import { Dog, DogFilters, SearchResult } from '../types';

export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: async () => {
      return await fetchWithAuth('/dogs/breeds') as string[];
    },
    retry: false,
  });
};

export const useSearchDogs = (filters: DogFilters, enabled = true) => {
  return useQuery({
    queryKey: ['dogs', 'search', filters],
    queryFn: async () => {
      // Convert filters to query string
      const queryParams = new URLSearchParams();
      
      if (filters.breeds && filters.breeds.length > 0) {
        filters.breeds.forEach(breed => queryParams.append('breeds', breed));
      }
      
      if (filters.ageMin !== undefined) {
        queryParams.append('ageMin', filters.ageMin.toString());
      }
      
      if (filters.ageMax !== undefined) {
        queryParams.append('ageMax', filters.ageMax.toString());
      }
      
      // Fixed size at 15
      queryParams.append('size', '15');
      
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
