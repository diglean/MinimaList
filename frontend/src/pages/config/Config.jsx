import { Typography } from "@mui/material";
import CustomPaper from "../../components/Paper";
import styles from "./styles/Config.module.css";

export default function Config() {
  return (
    <div className={styles.container}>
      <br />
      <div className={styles.typography_config}>
        <Typography>Config</Typography>
      </div>
      <br />
      <CustomPaper width={"85vw"} height={"85vh"}>
        <p>Config</p>
      </CustomPaper>
    </div>
  );
}
