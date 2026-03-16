import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-tight hover:text-blue-700 transition"
        >
          EstateFlow
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">

          <Link
            className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
            to="/"
          >
            Home
          </Link>

          {!isAuthenticated && (
            <>
              <Link
                className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && role === "OWNER" && (
            <>
              <Link
                className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
                to="/create-property"
              >
                Create Property
              </Link>

              <Link
                className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
                to="/my-properties"
              >
                My Properties
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
                to="/favorites"
              >
                Favorites
              </Link>

              <Link
                className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
                to="/messages"
              >
                Messages
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition shadow-sm"
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