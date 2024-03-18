import { Grid } from "@mui/material";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

import styles from "./styles/NumberInput.module.css";
import { useState, useCallback } from "react";

const NumberInput = () => {
  const [inputValue, setInputValue] = useState(0);

  const updateValue = useCallback((data) => {
    console.log("test");
    
    switch (data) {
      case "increment":
        setInputValue(inputValue => inputValue + 1);
        break;
      case "decrement":
        setInputValue(inputValue => inputValue - 1);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div>
      <Grid container className={styles.grid_container}>
        <Grid item xs={1} className={styles.grid_item}>
          <button onClick={() => updateValue("decrement")} style={{ position: "fixed", zIndex: 5555 }}>Teste</button>
          <Button onClick={() => updateValue("decrement")}>
            <FaMinusCircle size={20} />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Form>
            <Input name="quantity" value={inputValue}/>
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
