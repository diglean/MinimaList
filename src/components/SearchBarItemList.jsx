import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import styles from "./styles/SearchBarItemList.module.css";
import QuantityInput from "./NumberInput";
import { useState } from "react";
import ListItemInfoModal from "./modals/ListItemInfoModal";

export default function CustomListItem({ list, callbackFormValues }) {
  const [openModal, setOpenModal] = useState(false);
  const [tmpItemInfo, setTmpItemInfo] = useState({
    price: null,
    unit: "kg",
  });

  const handleClick = (data) => {
    setOpenModal(true);
  };

  const setTmpItemDetails = (data) => {
    if (data !== false) {
      setTmpItemInfo(data);
    }

    setOpenModal(false);
  };

  return(
    list.length &&
   (<div className={styles.container} key={Math.random()}>
      <ListItemInfoModal
        open={openModal}
        itemData={tmpItemInfo}
        callBackFormValues={(data) => setTmpItemDetails(data)}
      />
      <ListItem>
        <ListItemButton disableRipple onClick={() => handleClick()}>
          <ListItemText
            primary={item}
            secondary={
              tmpItemInfo.price
                ? "R$ " + tmpItemInfo.price + " / " + tmpItemInfo.unit
                : ""
            }
          />
        </ListItemButton>
        <QuantityInput defaultValue="1"/>
      </ListItem>
    </div>)
  )
}
