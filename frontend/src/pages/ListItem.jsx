import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import styles from "./styles/ListItem.module.css";
import { formatDatetime } from "../library/FormatData";

export default function ListItem({ list }) {
  const handleClick = () => {
    console.log("aeeehooo");
  };

  return list.map(({ name, created_at }, index) => (
    <div className={styles.container} key={index + name}>
      <ListItemButton>
        <ListItemText
          primary={name}
          secondary={formatDatetime(created_at, "DD/MM/YYYY")}
          onClick={handleClick}
        />
      </ListItemButton>
      <Divider variant="middle" component="li" />
    </div>
  ));
}