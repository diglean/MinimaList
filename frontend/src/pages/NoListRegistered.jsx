import { useCallback, useState } from "react";
import ListInfoModal from "../components/ListInfoModal";

import styles from "./styles/NoListRegistered.module.css";
import Button from "../components/Button";
import AppBar from "../components/LogoBar";
import BottomNavigation from "../components/BottomNavigation";

export default function NoListRegistered({ callbackOpenModal }) {
  return (
    <div>
      <AppBar />
      <div className={styles.main}>
        <p>You didn't create any list yet!</p>
        <Button onClick={() => callbackOpenModal()} variant="outlined" text="Create" />
      </div>
      <BottomNavigation />
    </div>
  );
}
