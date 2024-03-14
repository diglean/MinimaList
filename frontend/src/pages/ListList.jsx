import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import styles from "./styles/ListLists.module.css";
import { formatDatetime } from "../library/FormatData";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListList({ list }) {
  const navigate = useNavigate();

  const handleClick = (data) => {
    navigate("/selecteditems", { state: { items_id: data } });
  };

  return list.map(({ name, created_at, items_qty, items_id }, index) => (
    <div className={styles.container} key={index + name}>
      <ListItemButton>
        <ListItemText
          primary={name}
          secondary={
            <>
              <Typography component="span">{items_qty} Itens</Typography>
              <br />
              <Typography component="span">
                {formatDatetime(created_at, "DD/MM/YYYY")}
              </Typography>
            </>
          }
          onClick={() => handleClick(items_id)}
        />
      </ListItemButton>
      <Divider variant="middle" component="li" />
    </div>
  ));
}
