import { useEffect, useState } from "react";
import ListList from "./ListList";
import NoListRegistered from "./NoListRegistered";
import { List } from "@mui/material";
import Loading from "../components/Loading";

export default function Lists() {
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);

  const ROOT = "http://localhost:8000";

  // Laravel api
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
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
      <Loading open={loading} />
      {lists.length > 0 ? (
        <List>
          <ListList list={lists} />
        </List>
      ) : (
        <NoListRegistered />
      )}
    </div>
  );
}
