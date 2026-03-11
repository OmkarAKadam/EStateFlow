import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      <Link to="/">Home</Link>
      <Link to="/create-property">Create Property</Link>
    </nav>
  );
};

export default Navbar;