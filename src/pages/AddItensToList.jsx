import styles from "./AddItensToList.module.css";
import ItemSearchBar from "../components/ItemSearchBar";
import { useState } from "react";

export default function AddItensToList() {
  const [isItemSelected, setItemSelected] = useState(true);

  return (
    <div className={styles.container}>
      <ItemSearchBar />
    </div>
  );
}
