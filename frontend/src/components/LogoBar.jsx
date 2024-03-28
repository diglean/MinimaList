import { Grid } from "@mui/material";
import Button from "./Button";
import styles from "./styles/AppBar.module.css";
import { FaArrowLeft } from "react-icons/fa";

export default function AppBar({ goBack = false }) {
  return (
    <div className={styles.main}>
      <Grid container>
        <Grid item xs={4} className={styles.grid_item}>
          {
            goBack && (
              <Button
                onClick={() => console.log("aaaeeeooo")}
              >
                <FaArrowLeft size={20}/>
              </Button>
            )
          }
        </Grid>
        <Grid item xs={4} className={styles.main_grid_item}>
          <p>MinimaList</p>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
      <div>
      </div>
    </div>
  );
}
