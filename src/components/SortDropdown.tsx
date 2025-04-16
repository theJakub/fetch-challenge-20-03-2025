import React from 'react';
import { useDogsContext } from '../context/DogsContext';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { SortType } from '../types';

const sortOptions = [
  { value: 'breed:asc', label: 'Breed: A-Z' },
  { value: 'breed:desc', label: 'Breed: Z-A' },
  { value: 'age:asc', label: 'Age: low to high' },
  { value: 'age:desc', label: 'Age: high to low' },
  { value: 'name:asc', label: 'Name: A-Z' },
  { value: 'name:desc', label: 'Name: Z-A' },
];

const SortDropdown = () => {
  const { filters, setFilters } = useDogsContext();
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      sort: event.target.value as SortType,
    });
  };

  return (
    <Select
      value={filters.sort}
      onChange={handleSortChange}
      renderValue={(value) => {
        const option = sortOptions.find((opt) => opt.value === value);
        return (
          <Typography component="span">
            Sort by
            <Typography
              component="span"
              fontWeight="bold"
            >{` ${option?.label}`}</Typography>
          </Typography>
        );
      }}
    >
      {sortOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SortDropdown;
