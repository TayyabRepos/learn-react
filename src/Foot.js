const Foot = () => {
  const today = new Date();
  return (
    <footer>
      <p>Copyright &copy; {today.toUTCString()}</p>
    </footer>
  );
};

export default Foot;
