import Input from "../../components/FormInput";

import styles from "./styles/Register.module.css";

const LoginInformation = () => {
    return (
        <div>
            <h1>Register Information</h1>
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
        </div>
    );
}

export default LoginInformation;