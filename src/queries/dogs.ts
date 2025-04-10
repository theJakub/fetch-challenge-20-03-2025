import { useQuery } from '@tanstack/react-query';
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

const fetchSearchResults = async (url: string) => {
  const res = await fetchWithAuth(url);
  return res;
};

const fetchDogsByIds = async (ids: string[]) => {
  const res = await fetchWithAuth('/dogs', {
    method: 'POST',
    body: JSON.stringify(ids),
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
};

export function useDogSearch(currentUrl: string | null) {
  const {
    data: searchData,
    error: searchError,
    isError: isSearchError,
    isLoading: isSearchLoading,
  } = useQuery({
    queryKey: ['dogSearch', currentUrl],
    queryFn: async () => fetchSearchResults(currentUrl!),
    enabled: !!currentUrl,
  });

  const {
    data: dogData,
    error: dogError,
    isError: isDogError,
    isLoading: isDogsLoading,
  } = useQuery({
    queryKey: ['dogs', searchData?.resultIds],
    queryFn: async () => fetchDogsByIds(searchData.resultIds),
    enabled: !!searchData?.resultIds?.length,
  });

  const error = useMemo(() => searchError || dogError, [searchError, dogError]);
  const isError = useMemo(() => isSearchError || isDogError, [isSearchError, isDogError]);
  const isLoading = useMemo(() => isSearchLoading || isDogsLoading, [isSearchLoading, isDogsLoading]);

  return {
    dogs: dogData ?? [],
    error,
    isError,
    isLoading,
    nextPageUrl: searchData?.next ?? null,
    prevPageUrl: searchData?.prev ?? null,
    total: searchData?.total ?? 0,
  };
}
