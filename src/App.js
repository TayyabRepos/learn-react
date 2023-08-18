import Head from "./Head";
import Foot from "./Foot";
import Cunt from "./Cunt";
import "./App.css";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import Search from "./Search";

function App() {
  const [item, setItem] = useState([
    {
      id: 1,
      checked: true,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted",
    },
    {
      id: 2,
      checked: false,
      item: "Item 2",
    },
    {
      id: 3,
      checked: false,
      item: "Item 3",
    },
  ]);

  // Find the maximum ID in the initial item list
  const maxId = Math.max(...item.map((item) => item.id), 0);

  useEffect(() => {
    console.log("Item Updated");
  }, [item]);

  const [newItems, setNewItems] = useState("");
  const [search, setSearch] = useState("");

  const setAndSave = (listItem) => {
    setItem(listItem);
    localStorage.setItem("shopinglist", JSON.stringify(listItem));
  };

  const addItem = (itemText) => {
    const myNewItem = { id: maxId + 1, checked: false, item: itemText };
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
      <Cunt
        item={item.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Foot length={item.length} />
    </div>
  );
}

export default App;
