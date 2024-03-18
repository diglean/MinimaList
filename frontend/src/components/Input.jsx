import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const TextField = styled(MuiTextField)({
  width: "100%",
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
    textAlign: 'center'
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const Input = ({ value }) => {
  return <TextField value={value} />;
};

export default Input;
