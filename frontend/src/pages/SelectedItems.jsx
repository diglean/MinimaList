import { useEffect } from "react";

const SelectedItems = ({ items_id }) => {
  const [listData, setListData] = useState({});
  const { state } = useLocation();

  const ROOT = "localhost:8000";

  useEffect(
    (items_id) => {
      fetch(ROOT + "/api/list", {
        method: "POST",
        body: JSON.stringify({
          id: state.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    [items_id]
  );
};

export default SelectedItems;
