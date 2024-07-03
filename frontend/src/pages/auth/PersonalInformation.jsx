import { Box, IconButton, TextField } from "@mui/material";
import Input from "../../components/FormInput";
import Form from "../../components/Form";

import styles from "./styles/PersonalInformation.module.css";
import Button from "../../components/Button";
import { FileUploadOutlined } from "@mui/icons-material";
import Uploader from "../../components/Uploader";

const PersonalInformation = () => {
  const handleUpload = () => {
    console.log('Teste');
  }
  return (
    <div className={styles.main}>
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
        {/* <TextField
          variant="standard"
          type="text"
          InputProps={{
            endAdornment: (
              <IconButton component="label">
                <FileUploadOutlined />
                <input
                  styles={{display:"none"}}
                  type="file"
                  hidden
                  onChange={handleUpload}
                  name="[licenseFile]"
                />
              </IconButton>
            ),
          }}
        /> */}
        <div className="register_box_input">
          <Uploader />
        </div>
      </Form>
    </div>
  );
};

export default PersonalInformation;
