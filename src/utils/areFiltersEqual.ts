import { DogFilters } from "../types";

export const breedsEqual = (urlFilters: DogFilters, contextFilters: DogFilters) => {
  if (!urlFilters.breeds && !contextFilters.breeds) return true;
  if (!urlFilters.breeds || !contextFilters.breeds) return false;
  if (urlFilters.breeds.length !== contextFilters.breeds.length) return false;
  
  const sortedUrl = [...urlFilters.breeds].sort();
  const sortedContext = [...contextFilters.breeds].sort();
  
  return sortedUrl.every((breed, index) => breed === sortedContext[index]);
};

export const areFiltersEqual = (urlFilters: DogFilters, contextFilters: DogFilters) => {
  const primitivesDiffer = (property: keyof DogFilters) => {
    return urlFilters[property] !== contextFilters[property];
  };

  return (
    !breedsEqual(urlFilters, contextFilters) ||
    primitivesDiffer('ageMin') ||
    primitivesDiffer('ageMax') ||
    primitivesDiffer('sort') ||
    primitivesDiffer('page')
  );
};