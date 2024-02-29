import { Button as MuiButton } from "@mui/material";

export default function Button(props) {
  return (
    <div>
      <MuiButton
        onClick={props.onClick}
        variant={props.variant}
        type={props.type}
        disableRipple
        className={props.className}
      >
        {props.text ?? props.children}
      </MuiButton>
    </div>
  );
}
