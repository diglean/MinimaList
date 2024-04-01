import {
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import styles from "./styles/ListItems.module.css";
import { useCallback } from "react";
import ListItemInfoGenericModal from "../components/modals/ListItemInfoGenericModal";
import { useState } from "react";

const ListItems = ({ list }) => {
  const [itemData, setItemData] = useState(null);
  const CURRENCY = "R$";

  const openModal = (data) => {
    setItemData;
    console.log(id);
  };

  return (
    <>
      <ListItemInfoGenericModal open={itemData} itemData={itemData} />
      {list.map(({ id, name, unit, price }, index) => (
        <div className={styles.container} key={index + name}>
          <ListItemButton disableRipple key={index + name}>
            <ListItemText
              primary={name}
              secondary={
                <>
                  <Typography component="span">
                    {CURRENCY + " " + price} / {unit}
                  </Typography>
                </>
              }
              onClick={() => openModal({ name, unit, price })}
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
