import styles from "./AddItensToList.module.css";
import ItemSearchBar from "../components/ItemSearchBar";

export default function AddItensToList() {
  return (
    <div className={styles.container}>
      <ItemSearchBar callBack/>
    </div>
  );
}
