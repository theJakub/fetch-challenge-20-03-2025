const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  // Some endpoints might not return JSON
  if (response.headers.get('content-type')?.includes('application/json')) {
    return await response.json();
  }
  
  return response;
};
