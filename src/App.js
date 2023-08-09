import Head from "./Head";
import Foot from "./Foot";
import Cunt from "./Cunt";
import "./App.css";
import { useState } from "react";

function App() {
  const [item, setItem] = useState([
    {
      id: 1,
      checked: false,
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

  const handleCheck = (id) => {
    const listItem = item.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItem(listItem);
    localStorage.setItem("shopinglist", JSON.stringify(listItem));
  };

  const handleDelete = (id) => {
    const listItem = item.filter((item) => item.id !== id);
    setItem(listItem);
    localStorage.setItem("shopinglist", JSON.stringify(listItem));
  };
  return (
    <div className="App">
      <Head title={"Grocery List"} />
      <Cunt item={item} handleCheck={handleCheck} handleDelete={handleDelete} />
      <Foot length={item.length} />
    </div>
  );
}

export default App;
