import Head from "./Head";
import Foot from "./Foot";
import Cunt from "./Cunt";
import "./App.css";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import Search from "./Search";
import apiRequest from "./apiRequest";

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

  const addItem = async (itemText) => {
    const myNewItem = { id: maxId + 1, checked: false, item: itemText };
    const listItem = [...item, myNewItem];
    setItem(listItem);
    const optionPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, optionPost);
    if (result) setfetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItems) return;
    addItem(newItems);
    setNewItems("");
  };

  const handleCheck = async (id) => {
    const listItem = item.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItem(listItem);
    const myItem = listItem.filter((item) => item.id === id);
    const optionPatch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, optionPatch);
    if (result) setfetchError(result);
  };

  const handleDelete = async (id) => {
    const listItem = item.filter((item) => item.id !== id);
    setItem(listItem);

    const optionDelete = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, optionDelete);
    if (result) setfetchError(result);
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
