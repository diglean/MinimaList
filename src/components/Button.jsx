import { Button as MuiButton } from "@mui/material";
import styles from "./styles/Button.module.css";

export default function Button({ onClick, variant, text, type, className }) {
  return (
    <div>
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
