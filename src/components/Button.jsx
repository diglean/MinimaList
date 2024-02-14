import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./Button.module.css";

import { createTheme, PaletteColorOptions } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

export default function Button({ onClick, variant, text, type, color }) {
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      anger: createColor("#F40B27"),
      apple: createColor("#5DBA40"),
      steelBlue: createColor("#5C76B7"),
      violet: createColor("#BC00A3"),
      white: {
        main: "#FFF",
        contrastText: "#000",
      },
    },
  });

  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <MuiButton
          onClick={onClick}
          variant={variant}
          type={type}
          disableRipple
          color="white"
        >
          {text}
        </MuiButton>
      </ThemeProvider>
    </div>
  );
}
