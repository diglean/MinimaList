import styles from "./AddItensToList.module.css";
import ItemSearchBar from "../components/ItemSearchBar";
import { useState } from "react";

export default function AddItensToList() {
  return (
    <div className={styles.container}>
      <ItemSearchBar />
    </div>
  );
}
