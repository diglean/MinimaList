import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import styles from "./ItemSearchBar.module.css";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import ListItem from "../pages/ListItem";

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

const filter = createFilterOptions();

export default function ItemSearchBar() {
  const [tmpItemInfo, setTmpItemInfo] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (data) => {
    console.log(data);
    setTmpItemInfo([{ item: data, qty: 1 }]);
    setSearchValue("");
  };

  // const [value, setValue] = useState(null);

  // let myHeaders = new Headers();
  // myHeaders.append("x-api-key", "1a2cd3ab97644a509bfb7bc4c8aa55ae");

  // let requestOptions = {
  //   method: "GET",
  //   redirect: "follow",
  //   headers: myHeaders,
  // };

  // const fetchItens = (data) => {
  //   fetch(
  //     `https://api.spoonacular.com/food/products/search?query=${data}`,
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => {
  //       setProducts(JSON.parse(result).products);
  //       console.log(JSON.parse(result));
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  return (
    <div className={styles.component}>
      <AutoComplete
        value={searchValue}
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
      {tmpItemInfo && <ListItem list={tmpItemInfo} />}
    </div>
  );
}
