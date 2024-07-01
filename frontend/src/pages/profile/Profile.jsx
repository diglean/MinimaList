import { Box, Divider, Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import AppBar from "../../components/LogoBar";
import styles from "./styles/Profile.module.css";
import HistoryIcon from '@mui/icons-material/History';

export default function Profile() {
  return (
    <div>
      <AppBar goBack="/"/>
      <div className={styles.container}>
        <div className={styles.profile_container}>
          <Grid container spacing="10">
            <Grid item sx={4} className={styles.grid_profile}>
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
            <Grid item sx={8}>
              <Grid container>
                <Grid item sx={12} className={styles.name_container}>
                  <Typography component="h5" sx={{ color: "#FFF", fontSize: "20px" }}>
                    Diego Leandro
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sx={12} className={styles.name_container}>
                  <Typography component="h5" sx={{ color: "#888", fontSize: "17px" }}>
                    Diego Leandro
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={styles.options_container}>
        <List>
          {/* Lists history */}
          <ListItemButton
            disableRipple
            key="history"
          >
            <HistoryIcon />
            <ListItemText primary="Histórico" />
          </ListItemButton>
          <Divider variant="middle" component="li" />
          {/* Relatórios */}
          <ListItemButton
            disableRipple
            key="history"
          >
            <HistoryIcon />
            <ListItemText primary="Relatórios" />
          </ListItemButton>
          <Divider variant="middle" component="li" />
        </List>
      </div>
    </div>
  );
}
