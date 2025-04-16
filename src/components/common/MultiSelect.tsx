import React from 'react';
import { Autocomplete, Checkbox, TextField, FormControl } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiSelect = ({
  options,
  selectedOptions = [],
  onChange,
  label,
  placeholder,
}: {
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
  label: string;
  placeholder: string;
}) => {
  return (
    <FormControl sx={{ width: '300px' }}>
      <Autocomplete
        multiple
        options={options}
        disableCloseOnSelect
        value={selectedOptions}
        onChange={(_, newValue) => {
          onChange(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
        // renderValue={(value) => {
        //   console.log(value);
        //   return value.length > 0 ? `${value.length} Breeds` : '';
        // }}
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
