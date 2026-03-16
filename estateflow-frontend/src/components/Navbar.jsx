import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          EstateFlow
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link className="hover:text-blue-600 transition" to="/">
            Home
          </Link>

          {!isAuthenticated && (
            <>
              <Link className="hover:text-blue-600 transition" to="/login">
                Login
              </Link>

              <Link
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && role === "OWNER" && (
            <>
              <Link className="hover:text-blue-600 transition" to="/create-property">
                Create Property
              </Link>

              <Link className="hover:text-blue-600 transition" to="/my-properties">
                My Properties
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link className="hover:text-blue-600 transition" to="/favorites">
                Favorites
              </Link>

              <Link className="hover:text-blue-600 transition" to="/messages">
                Inbox
              </Link>

              <Link className="hover:text-blue-600 transition" to="/messages/sent">
                Sent
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;