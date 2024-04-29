import * as React from "react";
import { useState, useContext } from "react";

import styles from "./styles/ItemSearchBar.module.css";

import Input from "./FormInput";
import Form from "./Form";

import { TmpItemContext } from "../context/TmpItemContext";

const ItemSearchBar = () => {
  const { tmpItemInfo, setTmpItemInfo } =
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
          value={searchValue}
        />
      </Form>
    </div>
  );
};

export default ItemSearchBar;
