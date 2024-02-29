import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function TemporaryDrawer({ open, cbToggleDrawer }) {
  const toggleDrawer = (open) => (event) => {
    if (event.type === "click") {
      cbToggleDrawer(false, event.target.textContent);
    }

    cbToggleDrawer(false, event.target.textContent);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Unity", "Kg", "g"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton disableRipple>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="bottom" open={open} style={{ zIndex: "1300" }}>
        {list("bottom")}
      </Drawer>
    </div>
  );
}
