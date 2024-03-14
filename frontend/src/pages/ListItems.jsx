import {
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import styles from "./styles/ListItems.module.css";

const ListItems = ({ list }) => {
  const CURRENCY = "R$";

  const handleClick = (id) => {
    console.log(id);
  }

  return list.map(({ id, name, unit, price }, index) => (
    <div className={styles.container} key={index + name}>
      <ListItemButton>
        <ListItemText
          primary={name}
          secondary={
            <>
              <Typography component="span">{CURRENCY + " " + price} / {unit}</Typography>
            </>
          }
          onClick={() => handleClick(id)}
        />
      </ListItemButton>
      <Divider variant="middle" component="li" />
    </div>
  ));
};

export default ListItems;
