import styles from './Lists.module.css';
import { ListItemButton, ListItemText } from "@mui/material";
import Divider from "@mui/material/Divider";
import styled from 'styled-components';

const CustomDivider = styled(Divider)({
  "& .MuiDivider-root": {
    color: '#FFF',
  }
});

export default function ListItem({list}) {
  return (
    <div className={styles.container}>
      {list.map(({ name, created_at }, index) => (
        <ListItemButton key={index + name}>
          <ListItemText primary={name} secondary={created_at} />
        </ListItemButton>
      ))}
      <CustomDivider component="li"/>
    </div>
  );
}
