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

const ItemSearchBar = () => {
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

  return (
    <div className={styles.component}>
      <Form callBackSubmit={(data) => setItemName(data)}>
        <Input
          label="Item Name"
          name="name"
          variant="outlined"
          cbValueChanged={(data) => itemProperty("name", data)}
          value={searchValue}
        />
      </Form>
    </div>
  );
};

export default ItemSearchBar;
