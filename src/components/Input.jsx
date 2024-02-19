import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./styles/Input.module.css";
import { useEffect } from "react";
import { useCallback } from "react";

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

export default function Input(props) {
  const [inputValue, setInputValue] = useState("");

  const handleValueChanged = (inputValue, e) => {
    setInputValue({ ...inputValue, [inputValue]: e.target.value });
  };

  useEffect(() => {
    if (props.value) {
      setInputValue(props.value);
    }
  }, [props]);

  const test = useCallback(() => {
    console.log("aa");
  }, []);

  return (
    <div className={styles.container}>
      <CustomTextField
        label={props.label}
        name={props.name}
        variant={props.variant}
        onChange={handleValueChanged}
        value={inputValue}
        onFocus={test}
      >
        {props.children}
      </CustomTextField>
    </div>
  );
}
