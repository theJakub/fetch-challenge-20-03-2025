import React, { useCallback, useMemo } from 'react';
import { Box, Chip } from '@mui/material';
import { useDogsContext } from '../context/DogsContext';

const FilterChips = () => {
  const {
    filters,
    handleSetCity,
    handleSetState,
    locationCity,
    locationState,
    setFilters,
  } = useDogsContext();

  const ageFilter = useMemo(() => {
    if (
      (filters.ageMax && filters.ageMax !== 20) ||
      (filters.ageMin && filters.ageMin !== 0)
    ) {
      return `${filters.ageMin} - ${filters.ageMax}`;
    }
  }, [filters]);

  const handleDeleteBreed = useCallback(
    (deleteOption: string) => {
      setFilters({
        ...filters,
        breeds: filters.breeds.filter((breed) => breed !== deleteOption),
      });
    },

    [filters, setFilters],
  );

  const handleDeleteAge = useCallback(() => {
    setFilters({
      ...filters,
      ageMax: undefined,
      ageMin: undefined,
    });
  }, [filters, setFilters]);

  const handleDeleteLocation = useCallback(() => {
    handleSetCity('');
    handleSetState('');
    setFilters({
      ...filters,
      zipCodes: [],
    });
  }, [filters, handleSetCity, handleSetState, setFilters]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {filters.breeds.map((breed) => (
        <Chip
          key={breed}
          label={breed}
          onDelete={() => handleDeleteBreed(breed)}
          color="primary"
          variant="outlined"
          size="medium"
        />
      ))}
      {ageFilter && (
        <Chip
          label={ageFilter}
          onDelete={handleDeleteAge}
          color="primary"
          variant="outlined"
          size="medium"
        />
      )}
      {locationCity && locationState && (
        <Chip
          label={`${locationCity}, ${locationState}`}
          onDelete={handleDeleteLocation}
          color="primary"
          variant="outlined"
          size="medium"
        />
      )}
    </Box>
  );
};
export default FilterChips;
