import { useQuery } from "@tanstack/react-query";
import { State } from "../constants/states";
import { fetchWithAuth } from "./api";
import { Location } from "../types";

export const useGetZips = (city: string, state: State) => {
  return useQuery({
    queryKey: ['zips', city, state],
    queryFn: async () => {
      const params = {
        city,
        states: state ? [state] : undefined,
        size: 100
      };
      
      const response = await fetchWithAuth('/locations/search', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      
      return response;
    },
    enabled: !!city && !!state,
    select: (data) => data.results.map((result: Location) => result.zip_code),
  });
};
