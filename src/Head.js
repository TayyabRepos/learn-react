const Head = ({ title }) => {
  return <header>{title}</header>;
};

Head.defaultProps = {
  title: "Default Title",
};

export default Head;
