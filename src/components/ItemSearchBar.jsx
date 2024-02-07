import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import styles from './ItemSearchBar.module.css';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const AutoComplete = styled(Autocomplete)({
  "& .MuiAutocomplete-clearIndicator": {
    color: "#FFF"
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "#c4c4c4",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#c4c4c4",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
})

const filter = createFilterOptions();

export default function ItemSearchBar() {
  const [productNames, setProductNames] = useState([]);
  const [value, setValue] = useState(null);

  const [itemName, setItemName] = useState("");

  return (
    <div className={styles.component}>
      <AutoComplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setItemName(newValue);
            });
          } else if (newValue && newValue.inputValue) {
            setItemName(newValue.inputValue);
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={productNames}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        noOptionsText="No itens available"
        renderOption={(props, option) => <li {...props}>{option?.title}</li>}
        sx={{ width: '100%' }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Item name"/>}
      />
    </div>
  );
}