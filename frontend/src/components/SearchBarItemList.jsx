import styles from "./styles/SearchBarItemList.module.css";
import QuantityInput from "./NumberInput";
import { useState } from "react";
import ListItemInfoModal from "./modals/ListItemInfoModal";
import { useCallback } from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "./Button";

const CustomListItem = ({ item, callbackFormValues }) => {
  const [tmpItemInfo, setTmpItemInfo] = useState({
    name: null,
    qty: 1,
    price: null,
    unit: "kg",
  });

  useEffect(() => {
    itemProperty("name", item[0].name);
  }, [item]);

  const handleChangeNumberInput = useCallback(
    (data) => {
      itemProperty("qty", data);
      callbackFormValues(tmpItemInfo);
    },
    [tmpItemInfo, callbackFormValues]
  );

  const itemProperty = (property, newValue) => {
    setTmpItemInfo((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const setTmpItemDetails = (data) => {
    if (data !== false) {
      setTmpItemInfo(data);
    }
  };

  return (
    item.length && (
      <div className={styles.container} key={Math.random()}>
        <ListItemInfoModal
          itemData={tmpItemInfo}
          callbackFormValues={(data) => setTmpItemDetails(data)}
        >
          <QuantityInput
            value={tmpItemInfo.qty}
            cbValue={(data) => handleChangeNumberInput(data)}
          />
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
              onClick={() => callbackFormValues(false)}
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
    )
  );
};

export default CustomListItem;
