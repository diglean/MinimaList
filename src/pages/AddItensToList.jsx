import styles from "./styles/AddItensToList.module.css";
import ItemSearchBar from "../components/ItemSearchBar";
import { useLocation } from "react-router-dom";

export default function AddItensToList() {
  const { state } = useLocation();
  const { listName } = state;

  return (
    <div className={styles.container}>
      <ItemSearchBar callBack />
    </div>
  );
}
