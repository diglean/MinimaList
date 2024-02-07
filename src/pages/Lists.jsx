import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import NoListRegistered from "./NoListRegistered";
import { List, Paper } from "@mui/material";

export default function Lists() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {list.length > 0 ? (
        <List>
          <ListItem list={list} />
        </List>
      ) : (
        <NoListRegistered />
      )}
    </div>
  );
}
