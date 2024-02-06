import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AddItensToList.module.css";

export default function AddItensToList() {
  const navigate = useNavigate();

  let location = useLocation();
  const listName = location?.state?.listName ?? "lorem";

  return (
    <div className={styles.container}>
      <p>Add Itens to List.</p>
      {listName}
    </div>
  );
}
