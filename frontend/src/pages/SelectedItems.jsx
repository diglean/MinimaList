import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { List } from "@mui/material";

import ListItems from "./ListItems";
import AddItensToList from "./AddItensToList";

const SelectedItems = () => {
  const [items, setItems] = useState([]);
  const { state } = useLocation();

  const ROOT = "localhost:8000";

  const fetchListItems = (data) => {
    fetch(ROOT + "/api/list-itens/list", {
      method: "POST",
      body: JSON.stringify({
        id: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      setItems(resp);
    });
  };

  useEffect(() => {
    const items_id = state.items_id;

    if (items_id !== null) {
      fetchListItems(items_id);
    }
  }, [state]);

  return (
    <div>
      <AddItensToList />
      {items.length > 0 && (
        <List>
          <ListItems list={items} />
        </List>
      )}
    </div>
  );
};

export default SelectedItems;
