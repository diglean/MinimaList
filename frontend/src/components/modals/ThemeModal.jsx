import {
  Box,
  Fade,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import useLocalization from "../customHooks/translation";

import styles from "./styles/ThemeModal.module.css";
import Button from "../Button";
import { useContext } from "react";
import { UserConfigContext } from "../../context/UserConfigContext";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.black",
  border: "1px solid",
  p: 2,
  color: "#FFF",
  width: "70%",
  borderRadius: "10px",
};

const selectStyle = {
  color: "white",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFF",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFF",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFF",
  },
  ".MuiSvgIcon-root ": {
    fill: "white !important",
  },
  minWidth: 120,
  zIndex: 99999,
};

const ThemeModal = ({ open, callbackCloseModal }) => {
  const { userConfig, setUserConfig } = useContext(UserConfigContext);
  const localization = useLocalization();

  const handleChange = (e) => {
    userConfigProperty("theme_id", e.target.value);
  };

  const userConfigProperty = (property, newValue) => {
    setUserConfig((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const handleSubmit = (data) => {
    if (data === false) {
      userConfigProperty("theme_id", userConfig.theme_id);
    }

    callbackCloseModal(false);
  };

  return (
    <div>
      <Box sx={{ minWidth: 120, zIndex: 99999 }}>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ zIndex: "99998" }}
        >
          <Fade in={open} timeout={400}>
            <Box sx={modalStyle}>
              <div className={styles.typography}>
                <Typography variant="h5">{localization.theme}</Typography>
              </div>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="select-theme"
                  value={userConfig.theme_id}
                  sx={selectStyle}
                  MenuProps={{
                    style: { zIndex: 99999 },
                  }}
                  onChange={handleChange}
                >
                  <MenuItem value="void">{localization.void}</MenuItem>
                  <MenuItem value="night">{localization.night}</MenuItem>
                  <MenuItem value="day_light">
                    {localization.day_light}
                  </MenuItem>
                </Select>
                <div className={styles.buttons}>
                  <Grid container spacing="0.5" justifyContent="flex-end">
                    <Grid item>
                      <Button
                        variant="text"
                        text={localization.cancel}
                        onClick={() => handleSubmit(false)}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        text={localization.confirm}
                        onClick={() => handleSubmit(true)}
                      />
                    </Grid>
                  </Grid>
                </div>
              </FormControl>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </div>
  );
};

export default ThemeModal;