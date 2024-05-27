import { Box, Grid, Typography } from "@mui/material";
import AppBar from "../../components/LogoBar";
import styles from "./styles/Profile.module.css";
import CustomPaper from "../../components/Paper";

export default function Profile() {
  return (
    <div>
      <AppBar goBack="/"/>
      <div className={styles.container}>

        <div className={styles.profile_container}>

          <Grid container>

            <Grid item sx={4}>
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="Profile Picture"
                src="https://avatars.githubusercontent.com/u/72869261?v=4"
              />
            </Grid>

            <Grid item sx={8} className={styles.name_container}>

              <Typography component="h5" sx={{ color: "#FFF", fontSize: "19px" }}>
                Diego Leandro
                -
              </Typography>
              <Typography component="span" sx={{ color: "#888", fontSize: "12px" }}>
                Lorem Ipsum
              </Typography>

            </Grid>

          </Grid>

        </div>
      </div>
    </div>
  );
}
