import React, { useCallback, useMemo } from 'react';
import { Box, Chip } from '@mui/material';
import { useDogsContext } from '../context/DogsContext';
import { useNavigate } from 'react-router-dom';

const FilterChips = () => {
  const navigate = useNavigate();
  const {
    filters,
    handleSetCity,
    handleSetState,
    locationCity,
    locationState,
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
      const filteredBreeds = filters.breeds.filter(
        (breed) => breed !== deleteOption,
      );
      const searchParamsString = encodeURIComponent(
        JSON.stringify({
          ...filters,
          breeds: filteredBreeds,
        }),
      );
      navigate(`/search/${searchParamsString}`);
    },
    [filters, navigate],
  );

  const handleDeleteAge = useCallback(() => {
    const searchParamsString = encodeURIComponent(
      JSON.stringify({
        ...filters,
        ageMax: undefined,
        ageMin: undefined,
      }),
    );
    navigate(`/search/${searchParamsString}`);
  }, [filters, navigate]);

  const handleDeleteLocation = useCallback(() => {
    handleSetCity('');
    handleSetState('');
    const searchParamsString = encodeURIComponent(
      JSON.stringify({
        ...filters,
        zipCodes: [],
      }),
    );
    navigate(`/search/${searchParamsString}`);
  }, [filters, handleSetCity, handleSetState, navigate]);

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
