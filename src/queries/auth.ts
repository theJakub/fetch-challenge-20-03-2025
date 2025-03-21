import { useMutation } from '@tanstack/react-query';
import { fetchWithAuth } from './api';
import { User } from '../types';
import { queryClient } from './queryClient';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (user: User) => {
      return await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify(user),
      });
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      return await fetchWithAuth('/auth/logout', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      // Clear all queries from cache on logout
      queryClient.clear();
    },
  });
};
