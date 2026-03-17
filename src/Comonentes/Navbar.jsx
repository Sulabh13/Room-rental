import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = () => {

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  };

  useEffect(() => {

    // Initial check
    checkLogin();

    // Detect login/logout from same tab
    const interval = setInterval(() => {
      checkLogin();
    }, 500);

    return () => clearInterval(interval);

  }, []);

  return (

    <nav className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between">

      {/* LOGO */}

      <div className="text-xl font-bold">

        <Link to="/">
          RoomFinder
        </Link>

      </div>

      {/* CENTER LINKS */}

      <div className="flex gap-8 text-sm font-medium">

        <Link
          to="/"
          className="hover:text-gray-300 transition"
        >
          Home
        </Link>

        <Link
          to="/rooms"
          className="hover:text-gray-300 transition"
        >
          Rooms
        </Link>

        <Link
          to="/about"
          className="hover:text-gray-300 transition"
        >
          About
        </Link>

        <Link
          to="/contact"
          className="hover:text-gray-300 transition"
        >
          Contact
        </Link>

      </div>

      {/* RIGHT SIDE */}

      <div>

        {!isLoggedIn ? (

          <Link
            to="/login"
            className="bg-white text-black px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition"
          >
            Login
          </Link>

        ) : (

          <ProfileCard />

        )}

      </div>

    </nav>

  );

};

export default Navbar;