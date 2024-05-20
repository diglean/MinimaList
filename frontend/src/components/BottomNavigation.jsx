import * as React from "react";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import { styled } from "@mui/material/styles";
import useTranslation from "./customHooks/translation.jsx";

export default function BottomNavigation() {
  const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
    color: #595959;
    &.Mui-selected {
        color: #FFF;
    }
  `);

  const [value, setValue] = React.useState(0);

  const translation = useTranslation();

  return (
    <Box sx={{ flexGrow: 1, position: "bottom" }}>
      <MuiBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          bgcolor: "background.black",
          position: "fixed",
          bottom: 0,
          width: 1.0,
          height: 100,
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/lists"
          label={translation.lists}
          icon={<FormatListNumberedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/config"
          label={translation.config}
          icon={<SettingsRoundedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/profile"
          label={translation.profile}
          icon={<AccountCircleRoundedIcon />}
        />
      </MuiBottomNavigation>
    </Box>
  );
}
