import ListItem from "./ListItem";
const Cunt = ({ item, handleCheck, handleDelete }) => {
  return (
    <>
      {item.length ? (
        <ListItem
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>List is empty</p>
      )}
    </>
  );
};

export default Cunt;
