import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/favicon.svg";


const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-gray-900"
        >
          <img
            src={logo}
            alt="EstateFlow logo"
            className="w-10 h-10 object-cover"
          />
          EstateFlow
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/">Home</NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/favorites">Favorites</NavLink>
              <NavLink to="/messages">Messages</NavLink>
            </>
          )}

          {isAuthenticated && role === "OWNER" && (
            <>
              <NavLink to="/my-properties">My Listings</NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink to="/profile">Profile</NavLink>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:bg-red-50 px-4 py-2 rounded-full transition"
            >
              Logout
            </button>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 space-y-2">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/profile" onClick={() => setOpen(false)}>
                Profile
              </NavLink>
              <NavLink to="/favorites" onClick={() => setOpen(false)}>
                Favorites
              </NavLink>
              <NavLink to="/messages" onClick={() => setOpen(false)}>
                Messages
              </NavLink>
            </>
          )}

          {isAuthenticated && role === "OWNER" && (
            <>
              <NavLink to="/my-properties" onClick={() => setOpen(false)}>
                My Listings
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink to="/profile" onClick={() => setOpen(false)}>
                Profile
              </NavLink>
            </>
          )}

          <div className="pt-3 border-t border-gray-200">
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" onClick={() => setOpen(false)}>
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
