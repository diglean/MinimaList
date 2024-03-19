import { Grid } from "@mui/material";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

import styles from "./styles/NumberInput.module.css";
import { useCallback } from "react";

const NumberInput = ({ inputValue, cbHandleChange }) => {
  const updateValue = useCallback(
    (data) => {
      switch (data) {
        case "increment":
          inputValue = inputValue + 1;
          break;
        case "decrement":
          inputValue = inputValue - 1;
          break;
        default:
          break;
      }

      cbHandleChange(inputValue);
    },
    [cbHandleChange]
  );

  return (
    <div>
      <Grid container className={styles.grid_container}>
        <Grid item xs={1} className={styles.grid_item}>
          <Button onClick={() => updateValue("decrement")}>
            <FaMinusCircle size={20} />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Form>
            <Input name="quantity" value={inputValue} />
          </Form>
        </Grid>
        <Grid item xs={1} className={styles.grid_item}>
          <Button onClick={() => updateValue("increment")}>
            <FaPlusCircle size={20} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default NumberInput;
