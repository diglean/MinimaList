import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AddItensToList.module.css";
import ItemSearchBar from "../components/ItemSearchBar";
import { useState } from "react";

export default function AddItensToList() {
  const [isItemSelected, setItemSelected] = useState(true);

  return (
    <div className={styles.container}>
      <ItemSearchBar />
      {isItemSelected && <p>Lorem ipsum dolor sit amet.</p>}
    </div>
  );
}
