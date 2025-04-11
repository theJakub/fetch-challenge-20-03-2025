import React, { useState } from 'react';
import { Autocomplete, Checkbox, TextField, FormControl } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiSelect = ({
  options,
  defaultSelectedOptions = [],
  onBlur,
}: {
  options: string[];
  defaultSelectedOptions?: string[];
  onBlur: (selectedOptions: string[]) => void;
}) => {
  const [selectedBreeds, setSelectedBreeds] = useState(defaultSelectedOptions);

  return (
    <FormControl sx={{ width: '100%' }}>
      <Autocomplete
        multiple
        id="breed-select"
        options={options}
        disableCloseOnSelect
        value={selectedBreeds}
        onChange={(_, newValue) => {
          setSelectedBreeds(newValue);
        }}
        onBlur={() => onBlur(selectedBreeds)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filter by breed"
            placeholder={selectedBreeds ? '' : 'Breeds'}
          />
        )}
        renderValue={(value) => value?.join(', ')}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        clearOnBlur={false}
        selectOnFocus={false}
        handleHomeEndKeys={false}
      />
    </FormControl>
  );
};

export default MultiSelect;
