import React, { useCallback, useState } from 'react';
import MultiSelect from '../components/common/MultiSelect';
import {
  Box,
  Button,
  Drawer,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { useDogsContext } from '../context/DogsContext';
import { LocationOn } from '@mui/icons-material';
import { states } from '../constants/states';
import PassiveButton from '../components/common/PassiveButton';

const FilterDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    breeds,
    clearFilters,
    filters,
    handleSetCity,
    handleSetState,
    locationCity,
    locationState,
    setFilters,
  } = useDogsContext();

  const [breedsState, setBreedsState] = useState<string[]>(filters.breeds);
  const [ageState, setAgeState] = useState<number[]>([
    filters.ageMin ?? 0,
    filters.ageMax ?? 20,
  ]);
  const [localCity, setLocalCity] = useState<string>(locationCity);
  const [localState, setLocalState] = useState<string>(locationState);

  const handleBreedFilter = useCallback((breeds: string[]) => {
    setBreedsState(breeds);
  }, []);

  const handleAgeState = useCallback(
    (_event: Event, newValue: number | number[]) => {
      setAgeState(newValue as number[]);
    },
    [],
  );

  const handleSetCityInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalCity(event.target.value);
    },
    [],
  );

  const handleSetStateInput = useCallback(
    (event: SelectChangeEvent<string>) => {
      setLocalState(event.target.value);
    },
    [],
  );

  const handleClear = useCallback(() => {
    clearFilters();
    onClose();
  }, [clearFilters, onClose]);

  const handleAccept = useCallback(() => {
    handleSetCity(localCity);
    handleSetState(localState);
    setFilters({
      ...filters,
      ageMax: ageState[1],
      ageMin: ageState[0],
      breeds: breedsState,
    });
    onClose();
  }, [
    ageState,
    breedsState,
    filters,
    handleSetCity,
    handleSetState,
    localCity,
    localState,
    onClose,
    setFilters,
  ]);

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
        }}
      >
        <Typography
          variant="h6"
          sx={{ borderBottom: '1px solid black', padding: '8px' }}
        >
          Filter Pups
        </Typography>

        <MultiSelect
          options={breeds}
          onChange={handleBreedFilter}
          selectedOptions={breedsState ?? []}
          label="Filter by breed"
          placeholder={'Search breeds'}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>{`Age range: ${ageState[0]}-${ageState[1]}`}</Typography>
          <Slider
            defaultValue={ageState}
            disableSwap
            getAriaValueText={(value: number) => `${value} years`}
            max={20}
            min={0}
            onChange={handleAgeState}
            sx={{ margin: '0 8px', width: 'calc(100% - 16px)' }}
            value={ageState}
            valueLabelDisplay="off"
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>Location</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              placeholder="City"
              value={localCity}
              onChange={handleSetCityInput}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Select
              displayEmpty
              value={localState ?? undefined}
              size="small"
              onChange={handleSetStateInput}
              renderValue={(selected) => {
                if (!selected) {
                  return '- -';
                }
                return selected;
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <PassiveButton onClick={onClose}>Cancel</PassiveButton>
          <Button color="warning" onClick={handleClear}>
            Reset all filters
          </Button>
          <Button color="success" onClick={handleAccept} variant="contained">
            Accept
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
