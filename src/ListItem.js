import React from "react";
import LineItem from "./LineItem";
const ListItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <ul>
      {item.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ListItem;
