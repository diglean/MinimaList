import * as React from "react";
import { useState } from "react";

import { Grid } from "@mui/material";

import styles from "./styles/ItemSearchBar.module.css";

import Button from "./Button";
import Input from "./FormInput";
import Form from "./Form";
import NumberInput from "./NumberInput";

import ListItemInfoModal from "./modals/ListItemInfoModal";

const ItemSearchBar = ({ callbackFormValues }) => {
  const [tmpItemInfo, setTmpItemInfo] = useState({
    name: null,
    qty: 1,
    price: null,
    unit: "kg",
  });

  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (data) => {
    itemProperty("name", data.name);
    setSearchValue("");
  };

  // const handleItemDetailsChange = (data) => {
  //   if (data === false) {
  //     setTmpItemInfo({});
  //     return;
  //   }

  //   setTmpItemInfo([data]);
  // };

  const cleanTmpItemInfo = () => {
    setTmpItemInfo([]);
  };

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  // const handleChangeNumberInput = useCallback((data) => {
  //   itemProperty("qty", data);

  //   // callbackFormValues(tmpItemInfo);
  // }, []);

  const setTmpItemDetails = (data) => {
    if (data !== false) {
      setTmpItemInfo(data);
    }
  };

  return (
    <div className={styles.component}>
      <Form callBackSubmit={(data) => handleSubmit(data)}>
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
            <NumberInput />
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
                onClick={() => callbackFormValues(tmpItemInfo)}
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
