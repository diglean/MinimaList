import { Box } from "@mui/material";
import Form from "../../components/Form";
import Input from "../../components/FormInput";

import styles from "./styles/LoginInformation.module.css";

const LoginInformation = () => {
  return (
    <div className={styles.main}>
      <h1>Register</h1>
      <Form>
        <div className={styles.register_box_input}>
          <Input
            label="Email"
            name="user_email"
            variant="outlined"
            value=""
            cbValueChanged={(data) => console.log(data)}
          />
        </div>
        <div className={styles.register_box_input}>
          <Input
            label="Password"
            name="user_password"
            variant="outlined"
            value=""
            cbValueChanged={(data) => console.log(data)}
          />
        </div>
        <div className={styles.register_box_input}>
          <Input
            label="Confirm Password"
            name="user_confirm_password"
            variant="outlined"
            value=""
            cbValueChanged={(data) => console.log(data)}
          />
        </div>
      </Form>
    </div>
  );
};

export default LoginInformation;
