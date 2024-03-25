import { useCallback, useState } from "react";
import ListInfoModal from "../components/ListInfoModal";

import styles from "./styles/NoListRegistered.module.css";
import Button from "../components/Button";
import AppBar from "../components/LogoBar";
import BottomNavigation from "../components/BottomNavigation";

export default function NoListRegistered() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  const closeModal = useCallback((data) => {
    if (data === false) {
      setOpen(false);
    }
  });

  return (
    <div>
      <AppBar />
      <div className={styles.main}>
        <p>You didn't create any list yet!</p>
        <Button onClick={openModal} variant="outlined" text="Create" />
        <ListInfoModal open={open} callBackFormValues={closeModal} />
      </div>
      <BottomNavigation />
    </div>
  );
}
