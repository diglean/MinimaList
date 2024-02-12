import * as React from "react";
import { useState } from "react";

import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";

import styles from "./ItemSearchBar.module.css";
import ListItem from "./SearchBarItemList";
import Button from "./Button";

const AutoComplete = styled(Autocomplete)({
  "& .MuiAutocomplete-clearIndicator": {
    color: "#FFF",
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
});

const style = {
  height: "10px",
  position: "fixed",
  bottom: "15%",
  width: "100%",
}

const filter = createFilterOptions();

export default function ItemSearchBar() {
  const [tmpItemInfo, setTmpItemInfo] = useState([]);

  const handleChange = (data) => {
    setTmpItemInfo([{ item: data, qty: 1 }]);
  };

  const cleanTmpItemInfo = () => {
    setTmpItemInfo([]);
  };

  const addItemToList = (data) => {
    // setItemList([ item: data]);
  };

  return (
    <div className={styles.component}>
      <AutoComplete
        // value={searchValue}
        onChange={(event) => {
          if (typeof event.target.value === "string") {
            handleChange(event.target.value);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={[]}
        getOptionLabel={(option) => {
          if (typeof option.title === "string") {
            return option.title;
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
        renderOption={(props, option) => {
          <li {...props}>{option["title"]}</li>;
        }}
        sx={{ width: "100%" }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Item name" />}
      />
      {tmpItemInfo && (
        <div>
          <ListItem list={tmpItemInfo} />
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              display="flex"
              alignItems="center"
              justifyContent="center"
              direction="row"
              style={style}
            >
              <Grid item>
                <Button
                  onClick={() => cleanTmpItemInfo()}
                  variant="outlined"
                  text="Cancel"
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={() => addItemToList()}
                  variant="contained"
                  text="Confirm"
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </div>
  );
}
