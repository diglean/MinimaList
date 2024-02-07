import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import styles from "./ListItem.module.css";
import { formatDatetime } from "../library/FormatData";

export default function ListItem({ list }) {
  return (
    <div className={styles.container}>
      {list.map(({ name, created_at }, index) => (
        <>
          <ListItemButton key={index + name}>
            <ListItemText
              primary={name}
              secondary={formatDatetime(created_at, "DD/MM/YYYY")}
            />
          </ListItemButton>
          <Divider variant="middle" component="li" />
        </>
      ))}
    </div>
  );
}
