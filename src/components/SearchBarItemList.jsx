import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import styles from "./SearchBarItemList.module.css";
import QuantityInput from "./NumberInput";

export default function ListItem({ list }) {
  return list.map(({ item, qty }, index) => (
    <div className={styles.container} key={index + item}>
      <ListItemButton disableRipple>
        <ListItemText
          primary={item}
        />
        <QuantityInput />
      </ListItemButton>
    </div>
  ));
}
