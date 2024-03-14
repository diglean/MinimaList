import {
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import styles from "./styles/ListItems.module.css";

const ListItems = ({ list }) => {
  return list.map(({ name, created_at, items_qty, items_id }, index) => (
    <div className={styles.container} key={index + name}>
      <ListItemButton>
        <ListItemText
          primary={name}
          secondary={
            <>
              <Typography component="span">{items_qty} Itens</Typography>
            </>
          }
          // onClick={() => handleClick(items_id)}
        />
      </ListItemButton>
      <Divider variant="middle" component="li" />
    </div>
  ));
};

export default ListItems;
