import { useContext } from "react";
import {
  Box,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";

import Button from "../Button";
import useLocalization from "../customHooks/translation";

import { useLanguageContext } from "../../context/LanguageContext";
import { UserConfigContext } from "../../context/UserConfigContext";

import styles from "./styles/LanguageModal.module.css";

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

const LanguageModal = ({ open, callbackCloseModal }) => {
  const localization = useLocalization();
  const { userConfig, setUserConfig } = useContext(UserConfigContext);
  const { language, changeLanguage } = useLanguageContext();

  const userConfigProperty = (property, newValue) => {
    setUserConfig((tmpItemInfo) => ({
      ...tmpItemInfo,
      [property]: newValue,
    }));
  };

  const handleChange = (e) => {
    changeLanguage(e.target.value);
  };

  const handleSubmit = (data) => {
    if (data === false) {
      changeLanguage(userConfig.language_id);
    } else {
      userConfigProperty("language_id", localization.language_id);
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
                <Typography variant="h5">{localization.language}</Typography>
              </div>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={localization.language_id}
                  sx={selectStyle}
                  MenuProps={{
                    style: { zIndex: 99999 },
                  }}
                  onChange={handleChange}
                >
                  <MenuItem value="pt_br">🇧🇷 Português</MenuItem>
                  <MenuItem value="en_us">🇺🇸 English</MenuItem>
                  <MenuItem value="es_es">🇪🇸 Español</MenuItem>
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
                        onClick={() => {
                          handleSubmit(true);
                        }}
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

export default LanguageModal;
