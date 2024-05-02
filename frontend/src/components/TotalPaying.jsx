import { Typography } from "@mui/material";
import styles from "./styles/TotalPaying.module.css";

const TotalPaying = ({ value }) => {
    return (
        <div className={styles.container_value}>
            <Typography
            id="total-label"
            component="h4"
            sx={{ color: "#FFF", fontSize: "19px" }}
            >
            Total: {value}
            </Typography>
        </div>
    );
}

export default TotalPaying;