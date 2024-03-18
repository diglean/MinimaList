import { Grid } from "@mui/material";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

import styles from "./styles/NumberInput.module.css";

const NumberInput = () => {
  return (
    <Grid container className={styles.grid_container}>
      <Grid item xs={1} className={styles.grid_item}>
        <Button>
          <FaMinusCircle size={20} />
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Form>
          <Input name="quantity" />
        </Form>
      </Grid>
      <Grid item xs={1} className={styles.grid_item}>
        <Button>
          <FaPlusCircle size={20} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default NumberInput;
