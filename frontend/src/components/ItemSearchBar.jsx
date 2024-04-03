import * as React from "react";
import { useState, useContext } from "react";

import { Grid } from "@mui/material";

import styles from "./styles/ItemSearchBar.module.css";

import Button from "./Button";
import Input from "./FormInput";
import Form from "./Form";
import NumberInput from "./NumberInput";

import ListItemInfoModal from "./modals/ListItemInfoModal";
import { TmpItemContext } from "../context/TmpItemContext";

const ItemSearchBar = ({ callbackFormValues }) => {
  const { tmpItemInfo, setTmpItemInfo, cleanTmpItemInfo } =
    useContext(TmpItemContext);
  const [searchValue, setSearchValue] = useState("");

  const setItemName = (data) => {
    itemProperty("name", data.name);
    setSearchValue("");
  };

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const setTmpItemDetails = (data) => {
    if (data !== false) {
      setTmpItemInfo(data);
    }
  };

  return (
    <div className={styles.component}>
      <Form callBackSubmit={(data) => setItemName(data)}>
        <Input
          label="Item Name"
          name="name"
          variant="outlined"
          value={searchValue}
        />
      </Form>
      {tmpItemInfo.name && (
        <div className={styles.container} key={Math.random()}>
          <ListItemInfoModal
            itemData={tmpItemInfo}
            callbackFormValues={(data) => setTmpItemDetails(data)}
          >
            <NumberInput
              inputValue={tmpItemInfo.qty}
              cbHandleChange={(data) => {
                itemProperty("qty", data);
              }}
            />
          </ListItemInfoModal>
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
                onClick={() => {
                  cleanTmpItemInfo();
                  callbackFormValues(tmpItemInfo);
                }}
                variant="contained"
                text="Confirm"
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ItemSearchBar;
