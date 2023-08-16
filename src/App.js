import Head from "./Head";
import Foot from "./Foot";
import Cunt from "./Cunt";
import "./App.css";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import Search from "./Search";

function App() {
  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("shopinglist")) || []
  );

  useEffect(() => {
    console.log("Item Updated");
  }, [item]);

  const [newItems, setNewItems] = useState("");
  const [search, setSearch] = useState("");

  const setAndSave = (listItem) => {
    setItem(listItem);
    localStorage.setItem("shopinglist", JSON.stringify(listItem));
  };

  const addItem = (item) => {
    const id = item.length ? item[item.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItem = [...item, myNewItem];
    setAndSave(listItem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItems) return;
    addItem(newItems);
    setNewItems("");
  };

  const handleCheck = (id) => {
    const listItem = item.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSave(listItem);
  };

  const handleDelete = (id) => {
    const listItem = item.filter((item) => item.id !== id);
    setAndSave(listItem);
  };

  return (
    <div className="App">
      <Head title={"Grocery List"} />
      <AddItem
        newItems={newItems}
        setNewItems={setNewItems}
        handleSubmit={handleSubmit}
      />
      <Search search={search} setSearch={setSearch} />
      <Cunt item={item} handleCheck={handleCheck} handleDelete={handleDelete} />
      <Foot length={item.length} />
    </div>
  );
}

export default App;
