import { useEffect, useState } from "react";
import ListList from "./ListList";
import NoListRegistered from "./NoListRegistered";
import { List } from "@mui/material";
import Loading from "../components/Loading";
import AppBar from "../components/LogoBar";
import BottomNavigation from "../components/BottomNavigation";

export default function Lists() {
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([{
    id: 1,
    name: 'Lorem',
    created_at: '01/01/2022',
    items_qty: 1
  }]);

  const ROOT = "http://localhost:8000";

  // Laravel api
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(ROOT + "/api/list/list", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       customer_id: 1,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setLists(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  if (lists !== false) {
    return (
      <div>
        {lists.length > 0 ? (
          <List>
            <ListList list={lists} />
          </List>
        ) : (
          <NoListRegistered />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <AppBar />
        <Loading open={loading} />
        <BottomNavigation />
      </div>
    );
  }
}
