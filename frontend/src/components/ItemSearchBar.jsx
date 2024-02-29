import * as React from "react";
import { useState } from "react";

import { Grid } from "@mui/material";

import styles from "./styles/ItemSearchBar.module.css";
import CustomListItem from "./SearchBarItemList";
import Button from "./Button";
import Input from "./Input";
import Form from "./Form";

export default function ItemSearchBar() {
  const [tmpItemInfo, setTmpItemInfo] = useState({});

  const [searchValue, setSearchValue] = useState("");

  const handleChange = (data) => {
    setTmpItemInfo([{ name: data.name, qty: 1 }]);
    setSearchValue("");
  };

  const handleItemDetailsChange = (data) => {
    setTmpItemInfo([data]);
  }

  const cleanTmpItemInfo = () => {
    setTmpItemInfo([]);
  };

  const addItemToList = (data) => {
    fetch("http://localhost:5000/lists", {
      method: "POST",
      body: JSON.stringify(data[0]),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className={styles.component}>
      <Form callBackSubmit={(data) => handleChange(data)}>
        <Input
          label="Item Name"
          name="name"
          variant="outlined"
          value={searchValue}
        />
      </Form>
      {tmpItemInfo.length > 0 && (
        <div>
          <CustomListItem item={tmpItemInfo} callbackFormValues={(data) => handleItemDetailsChange(data)}/>
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
                onClick={() => addItemToList(tmpItemInfo)}
                variant="contained"
                text="Confirm"
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
