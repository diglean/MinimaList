import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SelectedItems = () => {
  const [items, setItems] = useState([]);
  const { state } = useLocation();

  const ROOT = "localhost:8000";

  useEffect(
    (state) => {
      fetch(ROOT + "/api/list", {
        method: "POST",
        body: JSON.stringify({
          id: state.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {

        });
    },
    [state]
  );


};

export default SelectedItems;
