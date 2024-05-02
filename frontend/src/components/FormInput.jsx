import { useEffect, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";

import styles from "./styles/FormInput.module.css";

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

function Input(props, ref) {
  const [inputValue, setInputValue] = useState(props.value ?? "");

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleValueChanged = useCallback(
    (e) => {
      setInputValue(e.target.value);

      if (typeof props.cbValueChanged === "function") {
        props.cbValueChanged(e.target.value);
      }
    },
    [setInputValue, props]
  );

  useEffect(() => {
    if (typeof props.value !== "undefined") {
      setInputValue(props.value);
    }
  }, [props]);

  return (
    <div className={styles.container}>
      <TextField
        className={errors?.name && "input-error"}
        ref={ref}
        label={props.label}
        name={props.name}
        variant={props.variant}
        onChangeCapture={(e) => handleValueChanged(e)}
        value={inputValue}
        InputProps={props.InputProps}
        {...register(props.name, {
          required: props.required ? `${props.label} is required` : false,
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
}

export default Input;
