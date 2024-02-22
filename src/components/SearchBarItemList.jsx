import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import styles from "./styles/SearchBarItemList.module.css";
import QuantityInput from "./NumberInput";
import { useState } from "react";
import ListItemInfoModal from "./modals/ListItemInfoModal";

export default function CustomListItem({ list, callbackFormValues }) {
  const [openModal, setOpenModal] = useState(false);
  const [itemInfo, setItemInfo] = useState([{}]);

  const handleClick = (data) => {
    setOpenModal(true);
  };

  const setTmpItemDetails = (data) => {
    if (data === false) {
      setOpenModal(false);
    }

    setItemInfo(data);

    return;
  };

  return list.map(({ item, qty }, index) => (
    <div className={styles.container} key={index + item}>
      <ListItemInfoModal
        open={openModal}
        callBackFormValues={(data) => setTmpItemDetails(data)}
      />
      <ListItem>
        <ListItemButton disableRipple onClick={() => handleClick()}>
          <ListItemText primary={item} secondary="R$3,50/KG" />
        </ListItemButton>
        <QuantityInput />
      </ListItem>
    </div>
  ));
}
