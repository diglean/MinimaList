import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AddItensToList.module.css";
import ItemSearchBar from "../components/ItemSearchBar";

export default function AddItensToList() {
  const navigate = useNavigate();

  let location = useLocation();
  const listName = location?.state?.listName ?? "lorem";

  return (
    <div className={styles.container}>
      <ItemSearchBar/>
    </div>
  );
}
