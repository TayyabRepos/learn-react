import Head from "./Head";
import Foot from "./Foot";
import Cunt from "./Cunt";
import "./App.css";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import Search from "./Search";

function App() {
  const API_URL = "http://localhost:3500/item";
  const [item, setItem] = useState([]);
  const [newItems, setNewItems] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setfetchError] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  // Find the maximum ID in the initial item list
  const maxId = Math.max(...item.map((item) => item.id), 0);

  useEffect(() => {
    const fatchItem = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive the items");
        const listItem = await response.json();
        setItem(listItem);
        setfetchError(null);
        console.log(listItem);
      } catch (err) {
        setfetchError(err.message);
      } finally {
        setisLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fatchItem())();
    }, 1000);
  }, []);

  const addItem = (itemText) => {
    const myNewItem = { id: maxId + 1, checked: false, item: itemText };
    const listItem = [...item, myNewItem];
    setItem(listItem);
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
    setItem(listItem);
  };

  const handleDelete = (id) => {
    const listItem = item.filter((item) => item.id !== id);
    setItem(listItem);
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
      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}

        {!fetchError && !isLoading && (
          <Cunt
            item={item.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Foot length={item.length} />
    </div>
  );
}

export default App;
