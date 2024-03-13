import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import NoListRegistered from "./NoListRegistered";
import { List } from "@mui/material";

export default function Lists() {
  const [lists, setLists] = useState([]);

  const ROOT = "http://localhost:8000";

  // Laravel api
  useEffect(() => {
    fetch(ROOT + "/api/list/list", {
      method: "POST",
      body: JSON.stringify({
        customer_id: 1,
      }),
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

  // Json server api
  // useEffect(() => {
  //   fetch("http://localhost:5000/lists", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setLists(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div>
      {lists.length > 0 ? (
        <List>
          <ListItem list={lists} listItens={["name", "created_at"]} />
        </List>
      ) : (
        <NoListRegistered />
      )}
    </div>
  );
}
