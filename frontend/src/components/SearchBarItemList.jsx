import styles from "./styles/SearchBarItemList.module.css";
import QuantityInput from "./NumberInput";
import { useState } from "react";
import ListItemInfoModal from "./modals/ListItemInfoModal";
import { useCallback } from "react";
import { useEffect } from "react";

const CustomListItem = ({ item, callbackFormValues }) => {
  const [tmpItemInfo, setTmpItemInfo] = useState({
    name: null,
    qty: 1,
    price: null,
    unit: "kg",
  });

  const handleChangeNumberInput = useCallback((data) => {
    itemProperty("qty", data);
    callbackFormValues(tmpItemInfo);
  },[]);

  useEffect(() => {
    itemProperty("name", item[0].name);
  }, [item]);

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
      </div>
    )
  );
};

export default CustomListItem;
