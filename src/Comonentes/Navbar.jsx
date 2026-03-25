import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ProfileCard from "./ProfileCard";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!(token && user));
  };

  useEffect(() => {
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/rooms", label: "Rooms" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="bg-gray-900 text-white px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:text-gray-300 transition-colors"
        >
          RoomFinder
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="relative group text-gray-300 hover:text-white transition-colors duration-200"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-white text-gray-900 font-semibold px-5 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200"
            >
              Login
            </Link>
          ) : (
            <ProfileCard inDrawer={false} onClose={() => setMenuOpen(false)} />
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-700 transition-colors"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* MOBILE FULL WIDTH DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-gray-900 text-white z-50 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* DRAWER HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold hover:text-gray-300 transition-colors"
          >
            RoomFinder
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* DRAWER LINKS */}
        <nav className="flex flex-col gap-2 px-6 py-6 flex-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 text-base font-medium transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* DRAWER FOOTER */}
        <div className="px-6 py-6 border-t border-gray-700">
          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full bg-white text-gray-900 font-semibold text-center px-4 py-3 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              Login
            </Link>
          ) : (
            // ⭐ onClose prop pass kiya — drawer band hoga
            <ProfileCard inDrawer={true} onClose={() => setMenuOpen(false)} />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;