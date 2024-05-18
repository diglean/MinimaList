import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFF",
            contrastText: "#000"
        },
        background: {
            black: '#000',
            paper: '#333'
        }
    },
    select: {
        '&:before': {
            borderColor: "#FFF",
        },
        "&:after": {
            borderColor: "#FFF",
        },
    },
    icon: {
        fill: "#FFF",
    },
});

export default theme