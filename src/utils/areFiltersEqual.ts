import { DogFilters } from "../types";

// No longer used, but left as an example for project structure
export const areBreedsEqual = (urlFilters: DogFilters, contextFilters: DogFilters) => {
  if (!urlFilters.breeds && !contextFilters.breeds) return true;
  if (!urlFilters.breeds || !contextFilters.breeds) return false;
  if (urlFilters.breeds.length !== contextFilters.breeds.length) return false;
  
  const sortedUrl = [...urlFilters.breeds].sort();
  const sortedContext = [...contextFilters.breeds].sort();
  
  return sortedUrl.every((breed, index) => breed === sortedContext[index]);
};

export const areFiltersEqual = (urlFilters: DogFilters, contextFilters: DogFilters) => {
  const arePrimitivesEqual = (property: keyof DogFilters) => {
    return urlFilters[property] === contextFilters[property];
  };

  return (
    areBreedsEqual(urlFilters, contextFilters) &&
    arePrimitivesEqual('ageMin') &&
    arePrimitivesEqual('ageMax') &&
    arePrimitivesEqual('sort') &&
    arePrimitivesEqual('page')
  );
};