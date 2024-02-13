import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./Button.module.css";

export default function Button({ onClick, variant, text, type, color }) {
  const CustomButton = styled(MuiButton)({
    color: '#000',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: '#FFF',
    },
  });

  return (
    <div className={styles.container}>
      <CustomButton
        onClick={onClick}
        variant={variant}
        type={type}
        disableRipple
      >
        {text}
      </CustomButton>
    </div>
  );
}
