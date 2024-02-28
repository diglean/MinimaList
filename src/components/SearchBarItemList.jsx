import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import styles from "./styles/SearchBarItemList.module.css";
import QuantityInput from "./NumberInput";
import { useState } from "react";
import ListItemInfoModal from "./modals/ListItemInfoModal";
import { useCallback } from "react";
import { useEffect } from "react";

const CustomListItem = ({ item, callbackFormValues }) => {
  const [openModal, setOpenModal] = useState(false);
  const [tmpItemInfo, setTmpItemInfo] = useState({
    name: null,
    price: null,
    unit: "kg",
  });

  let itemData = item;

  useEffect(
    () => {
      itemProperty("name", itemData[0].name);
    },
    [itemData]
  );

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const handleClick = useCallback((data) => {
    setOpenModal(true);
  }, []);

  const setTmpItemDetails = (data) => {
    if (data !== false) {
      setTmpItemInfo(data);
    }

    setOpenModal(false);
  };

  return (
    item.length && (
      <div className={styles.container} key={Math.random()}>
        <ListItemInfoModal
          itemData={tmpItemInfo}
          callbackFormValues={(data) => setTmpItemDetails(data)}
        >
          <QuantityInput defaultValue="1" />
        </ListItemInfoModal>
      </div>
    )
  );
};

export default CustomListItem;
