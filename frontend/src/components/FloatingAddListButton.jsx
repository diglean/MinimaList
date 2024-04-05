import { Zoom, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { FaPlus } from 'react-icons/fa';

const FloatingAddListButton = ({ cbOnClick, open }) => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, 'position': 'absolute', 'bottom': '80px', 'right': '20px' }}>
      <Zoom key={1} in={open} timeout={transitionDuration}>
        <Fab variant="extended" color="primary" onClick={() => cbOnClick()}>
          <FaPlus sx={{ mr: 1 }} />&nbsp;Create
        </Fab>
      </Zoom>
    </Box>
  );
}

export default FloatingAddListButton;