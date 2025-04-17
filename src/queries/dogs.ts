import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from './api';
import { useMemo } from 'react';

export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: async () => {
      return await fetchWithAuth('/dogs/breeds') as string[];
    },
    retry: false,
  });
};

export const fetchSearchResults = async (url: string) => {
  const res = await fetchWithAuth(url);
  return res;
};

export const fetchDogsByIds = async (ids: string[]) => {
  const res = await fetchWithAuth('/dogs', {
    method: 'POST',
    body: JSON.stringify(ids),
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
};

export function useDogSearch(currentUrl: string | null, isEnabled: boolean) {
  const {
    data: searchData,
    error: searchError,
    isError: isSearchError,
    isPending: isSearchPending,
  } = useQuery({
    queryKey: ['dogSearch', currentUrl],
    queryFn: async () => fetchSearchResults(currentUrl!),
    enabled: isEnabled && !!currentUrl,
  });

  const {
    data: dogData,
    error: dogError,
    isError: isDogError,
    isPending: isDogsPending,
  } = useQuery({
    queryKey: ['dogs', searchData?.resultIds],
    queryFn: async () => fetchDogsByIds(searchData.resultIds),
    enabled: isEnabled && !!searchData?.resultIds?.length,
  });

  const error = useMemo(() => searchError || dogError, [searchError, dogError]);
  const isError = useMemo(() => isSearchError || isDogError, [isSearchError, isDogError]);
  const isPending = useMemo(() => isSearchPending || isDogsPending, [isSearchPending, isDogsPending]);

  return {
    dogs: dogData ?? [],
    error,
    isError,
    isPending,
    nextPageUrl: searchData?.next ?? null,
    prevPageUrl: searchData?.prev ?? null,
    total: searchData?.total ?? 0,
  };
}

export const fetchMatch = async (dogIds: string[]) => {
  const res = await fetchWithAuth('/dogs/match', {
    method: 'POST',
    body: JSON.stringify(dogIds),
  });
  return res;
};

export const useMatchDog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (favoriteIds: string[]) => {
      return await fetchWithAuth('/dogs/match', {
        method: 'POST',
        body: JSON.stringify(favoriteIds),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['dogMatch'], data.match);
    },
  });
};

export const useMatchDogResult = () => {
  return useQuery({
    queryKey: ['dogMatch'],
    queryFn: () => {},
    enabled: false
  });
};