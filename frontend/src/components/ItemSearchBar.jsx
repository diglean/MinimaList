import * as React from "react";
import { useState, useContext } from "react";

import { Grid, ListItem, ListItemButton, ListItemText } from "@mui/material";

import styles from "./styles/ItemSearchBar.module.css";

import Button from "./Button";
import Input from "./FormInput";
import Form from "./Form";
import NumberInput from "./NumberInput";

import { TmpItemContext } from "../context/TmpItemContext";
import ListItemInfoGenericModal from "./modals/ListItemInfoGenericModal";

const ItemSearchBar = ({ callbackFormValues }) => {
  const [modalOpen, setModalOpen] = useState(false);
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

    setModalOpen(false);
  };

  return (
    <div className={styles.component}>
      <ListItemInfoGenericModal open={modalOpen} cbFormValues={(data) => setTmpItemDetails(data)}/>
      <Form callBackSubmit={(data) => setItemName(data)}>
        <Input
          label="Item Name"
          name="name"
          variant="outlined"
          cbValueChanged={(data) => itemProperty("name", data)}
          value={searchValue}
        />
      </Form>
      {tmpItemInfo.name && (
        <>
          <div className={styles.container} key={Math.random()}>
            <ListItem className={styles.list_item_container}>
              <ListItemButton disableRipple onClick={() => setModalOpen(true)}>
                <ListItemText
                  primary={tmpItemInfo.name}
                  secondary={
                    tmpItemInfo.price
                      ? "R$ " + tmpItemInfo.price + " / " + tmpItemInfo.unit
                      : ""
                  }
                />
              </ListItemButton>
              <NumberInput
                inputValue={tmpItemInfo.qty}
                cbHandleChange={(data) => {
                  itemProperty("qty", data);
                }}
              />
            </ListItem>
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
        </>
      )}
    </div>
  );
};

export default ItemSearchBar;
