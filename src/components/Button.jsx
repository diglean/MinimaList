import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./Button.module.css";

import { createTheme, PaletteColorOptions } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

export default function Button({ onClick, variant, text, type, color }) {
  // let componentColor = {};
  // componentColor.color = "#000";
  // componentColor.backgroundColor = "#FFF";
  
  // const CustomButton = styled(Button)({
  //   color: "green",
  //   backgroundColor: "#FFF",
  //   "&:hover": {
  //     backgroundColor: "#FFF",
  //   },
  // });

  return (
    <div className={styles.container}>
      <MuiButton
        color="primary"
        onClick={onClick}
        variant={variant}
        type={type}
        disableRipple
      >
        {text}
      </MuiButton>
    </div>
  );
}
