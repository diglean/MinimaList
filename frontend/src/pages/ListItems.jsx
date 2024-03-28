import { TransitionGroup } from 'react-transition-group';

import {
  Collapse,
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
  };

  return (
    <TransitionGroup>
      {list.map(({ id, name, unit, price }, index) => (
          <div className={styles.container} key={index + name}>
            <Collapse key={id}>
              <ListItemButton>
                <ListItemText
                  primary={name}
                  secondary={
                    <>
                      <Typography component="span">
                        {CURRENCY + " " + price} / {unit}
                      </Typography>
                    </>
                  }
                  onClick={() => handleClick(id)}
                />
              </ListItemButton>
            </Collapse>
            <Divider variant="middle" component="li" />
          </div>
      ))}
    </TransitionGroup>
  )
};

export default ListItems;
