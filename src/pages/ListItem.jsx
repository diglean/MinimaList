import {
  List,
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function ListItem(list) {
  return (
    <div>
      <List>
        {list.map(({ name, icon, created_at }, index) => (
          <ListItemButton key={index + name}>
            <ListItemAvatar>
              <Avatar alt="Icon Picture" src={icon} />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={created_at} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}
