import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import NoListRegistered from "./NoListRegistered";

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
        console.log(data);
        setList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>{list.length > 0 ? <ListItem /> : <NoListRegistered />}</div>;
}
