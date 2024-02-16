import { useCallback, useState } from "react";
import ListInfoModal from "../components/ListInfoModal";

import styles from "./NoListRegistered.module.css";
import Button from "../components/Button";

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
    <div className={styles.main}>
      <p>You didn't create any list yet!</p>
      <Button onClick={openModal} variant="outlined" text="Create" />
      <ListInfoModal open={open} callBackFormValues={closeModal} />
    </div>
  );
}
