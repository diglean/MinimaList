import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/system';

import theme from '../components/theme';

const CustomPaper = ({ width, height, children}) => {
  return (
    <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                width: width,
                height: height,
            },
        }}
    >
        <Paper elevation={8}>
            {children}
        </Paper>
    </Box>
  );
}

export default CustomPaper;