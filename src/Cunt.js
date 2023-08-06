const Cunt = () => {
  const handleNames = () => {
    const names = ["John", "Jane", "Jack"];
    const name = names[Math.floor(Math.random() * names.length)];
    return name;
  };

  const handleClick = () => {
    console.log("CLicked");
  };
  const handleClick2 = (name) => {
    console.log(`${name} Clicked`);
  };
  const handleClick3 = (e) => {
    console.log(e);
  };

  return (
    <main>
      <p onDoubleClick={handleClick}>My name is {handleNames()}</p>
      <button onClick={handleClick}>click me</button>
      <button onClick={() => handleClick2("Tayyab")}>click me</button>
      <button onClick={(e) => handleClick3(e.target.innerText)}>
        click me
      </button>
    </main>
  );
};

export default Cunt;
