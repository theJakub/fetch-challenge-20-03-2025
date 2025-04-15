import React from 'react';
import { Dog, DogFilters } from '../types';
import DogTile from './DogTile';
import { Box } from '@mui/material';

const TilesIdea = ({
  breeds,
  dogs,
  filters,
  handleBreedFilter,
  handleChangePage,
  handleSort,
  isLoading,
  page,
  total,
}: {
  breeds: string[];
  dogs: Dog[];
  filters: DogFilters;
  handleBreedFilter: (breeds: string[]) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleSort: () => void;
  isLoading: boolean;
  page: number;
  total: number;
}) => {
  return (
    <Box display={'flex'} flexWrap={'wrap'} gap={'16px'}>
      {dogs.map((dog) => (
        <DogTile key={dog.id} dog={dog} />
      ))}
    </Box>
  );
};

export default TilesIdea;
