import * as React from 'react';

import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiBottomNavigation from '@mui/material/BottomNavigation';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { ThemeProvider } from '@mui/system';

import { styled } from "@mui/material/styles";
import theme from './theme';

export default function BottomNavigation() {
  const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
    color: #595959;
    &.Mui-selected {
        color: #FFF;
    }
  `);

  const [value, setValue] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, position: 'bottom' }}>
          <MuiBottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => { setValue(newValue) }}
              sx={{ 
                bgcolor: 'background.black', 
                position: 'fixed', 
                bottom: 0, 
                width: 1.0
              }}
          >
              <BottomNavigationAction
                component={Link} 
                to="/lists" 
                label="Lists" 
                icon={<FormatListNumberedIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/config"
                label="Options"
                icon={<SettingsRoundedIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/profile"
                label="Profile"
                icon={<AccountCircleRoundedIcon />}
                />
          </MuiBottomNavigation>
        </Box>
    </ThemeProvider>
  );
}
