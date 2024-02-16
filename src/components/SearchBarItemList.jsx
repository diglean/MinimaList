import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import styles from "./SearchBarItemList.module.css";
import QuantityInput from "./NumberInput";
import { useState } from "react";
import ListItemInfoModal from "./modals/ListItemInfoModal";

export default function ListItem({ list, callbackFormValues }) {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (data) => {
    setOpenModal(true);
  };

  const setTmpItemDetails = (data) => {
    if (data === false) {
      setOpenModal(false);
    }

    return;
    // callbackFormValues()
  };

  return list.map(({ item, qty }, index) => (
    <div className={styles.container} key={index + item}>
      <ListItemInfoModal
        open={openModal}
        callBackFormValues={(data) => setTmpItemDetails(data)}
      />
      <ListItemButton disableRipple onClick={() => handleClick()}>
        <ListItemText primary={item} />
      </ListItemButton>
      <QuantityInput />
    </div>
  ));
}
