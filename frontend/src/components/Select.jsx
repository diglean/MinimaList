import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const style = {
  color: '#000',
  backgroundColor: '#FFF'
};

const names = [
  'Cleaning',
  'Groceries',
  'Household',
  'Personal',
  'Beverages',
  'Canned',
  'Frozen',
  'Pantry',
  'Vegetables',
  'Fruits',
  'Meat',
  'Dairy',
  'Drinks',
  'Snacks',
  'Cereals',
  'Other ',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
          <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            sx={{
              color: "white",
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFF',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFF',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFF',
              },
              '.MuiSvgIcon-root ': {
                fill: "white !important",
              }
            }}
            input={<OutlinedInput id="select-multiple-chip" label="Category" sx={{ maxHeight: '100px', width: '100%' }}/>}
            renderValue={(selected) => (
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 0.5, 
                maxHeight: '80px', 
                overflow: 'scroll', 
                paddingTop: '5px',
              }}
              >
                {selected.map((value) => (
                    <Chip key={value} label={value} sx={style}/>
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
          </Select>
      </FormControl>
    </div>
  );
}