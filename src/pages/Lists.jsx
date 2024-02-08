import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import NoListRegistered from "./NoListRegistered";
import { List } from "@mui/material";

export default function Lists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLists(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {lists.length > 0 ? (
        <List>
          <ListItem list={lists} />
        </List>
      ) : (
        <NoListRegistered />
      )}
    </div>
  );
}
