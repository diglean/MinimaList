import * as React from "react";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { forwardRef } from "react";
import { memo } from "react";
import { useEffect } from "react";

const NumberInput = forwardRef(function CustomNumberInput(props, ref) {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (typeof props !== "undefined") {
      setValue(props.value);
    }
  },[props])

  const handleChange = (data) => {
    props.cbValue(data);
    setValue(data);
  };

  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
      onChange={(event, newValue) => handleChange(newValue)}
      value={value}
    />
  );
});

const QuantityInput = ({ value, cbValue }) => {
  return (
    <NumberInput
      aria-label="Quantity Input"
      min={1}
      max={99}
      name="qty"
      cbValue={(data) => cbValue(data)}
      value={value}
    />
  );
};

export default memo(QuantityInput);

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: #FFF;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: #FFF;
  background: #000;
  border: none;
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 1rem;
  text-align: center;

  &:hover {
    border-color: #FFF;
  }

  &:focus {
    border-color: #FFF;
    box-shadow: 0 0 0 3px #FFF;
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border: none;
  background: #000;
  color: #FFF;
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: #000;
    border: none;
    color: #FFF;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
