import {
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import styles from "./styles/ListItems.module.css";
import ListItemInfoGenericModal from "../components/modals/ListItemInfoGenericModal";
import { useState, useContext } from "react";
import { TmpItemContext } from "../context/TmpItemContext";

const ListItems = ({ list }) => {
  const { tmpItemInfo, setTmpItemInfo } =
    useContext(TmpItemContext);
  const [itemData, setItemData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const CURRENCY = "R$";

  const handleOpenModal = (data) => {
    setOpenModal(true);
    setItemData(data);
  };

  const handleCbFormValues = (data) => {
    if (data === false) {
      setOpenModal(false);
    }
  };

  return (
    <>
      <ListItemInfoGenericModal
        open={openModal}
        itemData={itemData}
        cbFormValues={(data) => handleCbFormValues(data)}
      />
      {list.map(({ id, name, unit, price }, index) => (
        <div className={styles.container} key={index + name}>
          <ListItemButton disableRipple key={index + name}>
            <ListItemText
              primary={name}
              secondary={
                price ? (
                  <>
                    <Typography component="span">
                      {CURRENCY + " " + price} / {unit}
                    </Typography>
                  </>
                ) : (
                  ""
                )
              }
              onClick={() => handleOpenModal({ name, unit, price })}
              key={index + name}
            />
          </ListItemButton>
          <Divider variant="middle" component="li" />
        </div>
      ))}
    </>
  );
};

export default ListItems;
