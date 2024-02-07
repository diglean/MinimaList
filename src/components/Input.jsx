import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./Input.module.css";

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
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const CustomTextField = forwardRef((props, ref) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.container}>
      <TextField
        className={errors?.name && "input-error"}
        ref={ref}
        label={props.label}
        name={props.name}
        variant={props.variant}
        onChange={props.handleValueChanged}
        value={props.inputValue}
        {...register(props.name, {
          required: `${props.label} is required`,
        })}
      />
      {errors?.[props.name]?.type === "required" && (
        <p className={styles.error_message}>
          <strong>*</strong>
          {errors?.[props.name]?.message}
        </p>
      )}
    </div>
  );
});

export default function Input({ label, name, variant }) {
  const [inputValue, setInputValue] = useState("");

  const handleValueChanged = (inputValue, e) => {
    setInputValue({ ...inputValue, [inputValue]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <CustomTextField
        label={label}
        name={name}
        variant={variant}
        onChange={handleValueChanged}
        value={inputValue}
      />
    </div>
  );
}
