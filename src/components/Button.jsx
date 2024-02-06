import { Button as MuiButton } from "@mui/material";
import styles from "./Button.module.css";

export default function Button({ onClick, variant, text, type }) {
  return (
    <div className={styles.main}>
      <MuiButton onClick={onClick} variant={variant} type={type}>
        {text}
      </MuiButton>
    </div>
  );
}
