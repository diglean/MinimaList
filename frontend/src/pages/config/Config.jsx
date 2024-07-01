import { Divider, List, ListItemButton, ListItemText } from "@mui/material";

import LanguageIcon from '@mui/icons-material/Language';
import BrushIcon from '@mui/icons-material/Brush';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';

import styles from "./styles/Config.module.css";
import AppBar from "../../components/LogoBar";
import useTranslation from "../../components/customHooks/translation";
import { useState, useContext } from "react";
import LanguageModal from "../../components/modals/LanguageModal";
import ThemeModal from "../../components/modals/ThemeModal";
import { UserConfigContext } from "../../context/UserConfigContext";
import CurrencyModal from "../../components/modals/CurrencyModal";

export default function Config() {
  const translation = useTranslation();
  const [openedModal, setOpenedModal] = useState(null);
  const { userConfig, setUserConfig } = useContext(UserConfigContext);

  return (
    <div>
      <LanguageModal open={openedModal === 'language-modal'} callbackCloseModal={(data) => setOpenedModal(data)}/>
      <ThemeModal open={openedModal === 'theme-modal'} callbackCloseModal={(data) => setOpenedModal(data)}/>
      <CurrencyModal open={openedModal === 'currency-modal'} callbackCloseModal={(data) => setOpenedModal(data)}/>
      <AppBar goBack="/"/>
      <div className={styles.container}>
        <List>
          <ListItemButton
            disableRipple
            key="language"
            onClick={() => setOpenedModal("language-modal")}
          >
            <LanguageIcon />
            <ListItemText
              primary={translation.language}
              secondary={translation[userConfig.language_id]}
            />
          </ListItemButton>
          <Divider variant="middle" component="li" />
          {/* <ListItemButton
            disableRipple
            key="theme"
            onClick={() => setOpenedModal("theme-modal")}
          >
            <BrushIcon />
            <ListItemText
              primary={translation.theme}
              secondary={translation[userConfig.theme_id]}
            />
          </ListItemButton>
          <Divider variant="middle" component="li" /> */}
          <ListItemButton
            disableRipple
            key="currency"
            onClick={() => setOpenedModal("currency-modal")}
          >
            <AttachMoneyIcon />
            <ListItemText
              primary={translation.currency}
              secondary={userConfig.currency_id}
            />
          </ListItemButton>
          <Divider variant="middle" component="li" />
          <ListItemButton
            disableRipple
            key="about"
            onClick={() => setOpenedModal("about-modal")}
          >
            <InfoIcon />
            <ListItemText
              primary={translation.about}
            />
          </ListItemButton>
        </List>
      </div>
    </div>
  );
}
