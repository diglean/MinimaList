import { Box, Fade, FormControl, MenuItem, Modal, Select, Typography } from "@mui/material";
import useLocalization from "../customHooks/translation";

import styles from "./styles/CurrencyModal.module.css";
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

const CurrencyModal = ({ open, callbackCloseModal }) => {
  const { userConfig, setUserConfig } = useContext(UserConfigContext);
  const localization = useLocalization();

  const handleChange = (e) => {
    userConfigProperty("currency_id", e.target.value);
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
                <Typography variant="h5">{localization.currency}</Typography>
              </div>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="select-theme"
                  value={userConfig.currency_id}
                  sx={selectStyle}
                  MenuProps={{
                    style: { zIndex: 99999 },
                  }}
                  onChange={handleChange}
                >
                  <MenuItem value="BRL">BRL</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </div>
  );
};

export default CurrencyModal;
