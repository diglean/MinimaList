import * as React from "react";
import { useState } from "react";

import { Grid } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";

import styles from "./ItemSearchBar.module.css";
import ListItem from "./SearchBarItemList";
import Button from "./Button";
import Input from "./Input";
import Form from "./Form";

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
};

const filter = createFilterOptions();

export default function ItemSearchBar() {
  const [tmpItemInfo, setTmpItemInfo] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (data) => {
    setTmpItemInfo([{ item: data.itemName, qty: 1 }]);
    setSearchValue("");
  };

  const cleanTmpItemInfo = () => {
    setTmpItemInfo([]);
  };

  const addItemToList = (data) => {
    // setItemList([ item: data]);
  };

  return (
    <div className={styles.component}>
      <Form callBackSubmit={(data) => handleChange(data)}>
        <Input label="Item Name" name="itemName" variant="outlined" />
      </Form>
      {tmpItemInfo && (
        <div>
          <ListItem list={tmpItemInfo} />
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            className={styles.button_container}
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
                color={{
                  color: "#000",
                  backgroundColor: "#FFF",
                }}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
