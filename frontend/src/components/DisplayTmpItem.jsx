import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import NumberInput from "./NumberInput";
import ListItemInfoGenericModal from "./modals/ListItemInfoGenericModal";

import styles from "./styles/DisplayTmpItem.module.css";
import { useState, useContext } from "react";
import { TmpItemContext } from "../context/TmpItemContext";

const DisplayTmpItem = ({ toggleModal }) => {
  const { tmpItemInfo, cleanTmpItemInfo, setTmpItemInfo, cleanEditItemInfo } =
    useContext(TmpItemContext);

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  return (
    <>
      <ListItem className={styles.list_item_container}>
        <ListItemButton disableRipple onClick={() => toggleModal(true)}>
          <div className={styles.tmp_item_text}>
            <ListItemText
              primary={tmpItemInfo.name}
              secondary={
                tmpItemInfo.price
                  ? "R$ " + tmpItemInfo.price + " / " + tmpItemInfo.unit
                  : ""
              }
            />
          </div>
        </ListItemButton>
        <NumberInput
          inputValue={tmpItemInfo.qty}
          cbHandleChange={(data) => {
            if (data === 0) {
              cleanTmpItemInfo();
              return;
            }

            itemProperty("qty", data);
          }}
        />
      </ListItem>
    </>
  );
};

export default DisplayTmpItem;
