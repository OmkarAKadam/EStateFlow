import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>

      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {isAuthenticated && role === "OWNER" && (
        <Link to="/create-property">Create Property</Link>
      )}

      {isAuthenticated && (
        <>
          <Link to="/favorites">Favorites</Link>
          <Link to="/messages">Messages</Link>
        </>
      )}

      {isAuthenticated && role === "OWNER" && (
        <>
          <Link to="/create-property">Create Property</Link>
          <Link to="/my-properties">My Properties</Link>
        </>
      )}

      {isAuthenticated && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
