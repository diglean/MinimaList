import { Box } from "@mui/material";
import Input from "../../components/FormInput";
import Form from "../../components/Form";

import styles from "./styles/Register.module.css";

const PersonalInformation = () => {
  return (
    <div className={styles.main}>
      <Box className={styles.register_box}>
        <h1>Register</h1>
        <Form>
          <div className={styles.register_box_input}>
            <Input
              label="First Name"
              name="user_name"
              variant="outlined"
              value=""
              cbValueChanged={(data) => console.log(data)}
            />
          </div>
          <div className={styles.register_box_input}>
            <Input
              label="Second Name"
              name="user_name"
              variant="outlined"
              value=""
              cbValueChanged={(data) => console.log(data)}
            />
          </div>
        </Form>
      </Box>
    </div>
  );
};

export default PersonalInformation;
