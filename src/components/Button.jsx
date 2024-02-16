import { Button as MuiButton } from "@mui/material";
import styles from "./Button.module.css";

export default function Button({ onClick, variant, text, type, className }) {
  return (
    <div className={styles.contained_white_button}>
      <MuiButton
        onClick={onClick}
        variant={variant}
        type={type}
        disableRipple
        className={className}
      >
        {text}
      </MuiButton>
    </div>
  );
}
