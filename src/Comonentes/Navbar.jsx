import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Home, BedDouble, Phone } from "lucide-react";
import ProfileCard from "./ProfileCard";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Sirf Home page "/" par transparent navbar dikhao
  // Baaki sabhi pages par hamesha solid/scrolled style
  // const isHomePage = location.pathname === "/";
  const isHomePage = location.pathname === "/" || location.pathname === "/contact";

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!(token && user));
  };

  useEffect(() => {
    checkLogin();
    window.addEventListener("storage", checkLogin);
    window.addEventListener("loginStateChange", checkLogin);
    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("loginStateChange", checkLogin);
    };
  }, []);

  useEffect(() => {
    // Route change hone par turant scroll check karo
    setScrolled(window.scrollY > 20);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // location change par bhi re-run

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/rooms", label: "Rooms", icon: BedDouble },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── MAIN NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          // Home page pe sirf scroll hone par solid bano
          // Baaki pages par HAMESHA solid raho
          !isHomePage || scrolled ? styles.navWrapScrolled : styles.navWrapTop
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-[68px] flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 no-underline font-bold text-xl tracking-tight text-white transition-opacity duration-200 hover:opacity-85"
          >
            <span className={`w-2 h-2 rounded-full bg-orange-500 ${styles.logoDot}`} />
            <span className="text-white">Room</span>
            <span className="text-orange-500">Finder</span>
          </Link>

          {/* DESKTOP LINKS — floating glass pill */}
          <ul className={`hidden md:flex items-center gap-1 list-none m-0 ${styles.navPill}`}>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`relative no-underline text-sm font-medium px-[0.85rem] py-[0.45rem] rounded-lg tracking-[0.01em] transition-colors duration-200 ${
                    isActive(to)
                      ? `text-orange-500 bg-orange-500/10 ${styles.navLinkActive}`
                      : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* DESKTOP RIGHT */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/list-room"
                  className="no-underline text-[0.85rem] font-medium text-white/70 px-[0.85rem] py-[0.45rem] rounded-lg border border-white/15 transition-all duration-200 hover:text-white hover:border-white/40 hover:bg-white/[0.05]"
                >
                  List Your Room
                </Link>
                <Link
                  to="/login"
                  className="no-underline text-sm font-semibold text-white bg-orange-500 px-5 py-2 rounded-[9px] transition-all duration-200 shadow-[0_2px_12px_rgba(249,115,22,0.35)] tracking-[0.01em] hover:bg-[#ea6d0e] hover:shadow-[0_4px_20px_rgba(249,115,22,0.5)] hover:-translate-y-px"
                >
                  Login
                </Link>
              </>
            ) : (
              <ProfileCard inDrawer={false} onClose={() => setMenuOpen(false)} />
            )}
          </div>

          {/* HAMBURGER */}
          <button
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-[10px] bg-white/[0.08] border border-white/10 text-white cursor-pointer transition-colors duration-200 hover:bg-white/[0.14]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ── OVERLAY ── */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 49 }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── MOBILE DRAWER ── */}
      <aside
        className={`fixed top-0 right-0 h-full bg-[#11111b] border-l border-white/[0.07] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "min(320px, 90vw)", zIndex: 50 }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 no-underline font-bold text-xl tracking-tight text-white transition-opacity duration-200 hover:opacity-85"
          >
            <span className={`w-2 h-2 rounded-full bg-orange-500 ${styles.logoDot}`} />
            <span className="text-white">Room</span>
            <span className="text-orange-500">Finder</span>
          </Link>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.07] text-white cursor-pointer transition-colors duration-200 hover:bg-white/[0.14]"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 px-4 py-5 flex flex-col gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-[0.875rem] px-4 py-[0.875rem] rounded-xl no-underline text-[0.975rem] font-medium transition-all duration-200 ${
                isActive(to)
                  ? "text-orange-500 bg-orange-500/10"
                  : "text-white/65 hover:text-white hover:bg-white/[0.07]"
              }`}
            >
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-[9px] flex-shrink-0 transition-colors duration-200 ${
                  isActive(to) ? "bg-orange-500/15" : "bg-white/[0.06]"
                }`}
              >
                <Icon size={16} />
              </span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Popular Cities */}
        <div className="px-6 py-4 border-t border-white/[0.05]">
          <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-white/30 mb-[0.625rem]">
            Popular Cities
          </p>
          <div className="flex flex-wrap gap-2">
            {["Mumbai", "Delhi", "Bangalore", "Bhopal", "Pune"].map((city) => (
              <Link
                key={city}
                to={`/rooms?city=${city}`}
                onClick={() => setMenuOpen(false)}
                className="no-underline text-[0.8rem] text-white/50 bg-white/[0.05] border border-white/[0.08] px-[0.7rem] py-[0.3rem] rounded-[6px] transition-all duration-200 hover:text-orange-500 hover:border-orange-500/30 hover:bg-orange-500/[0.05]"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-5 border-t border-white/[0.07] flex flex-col gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block no-underline text-center bg-orange-500 text-white font-semibold text-[0.95rem] py-[0.85rem] rounded-xl shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-colors duration-200 hover:bg-[#ea6d0e]"
              >
                Login / Sign Up
              </Link>
              <Link
                to="/list-room"
                onClick={() => setMenuOpen(false)}
                className="block no-underline text-center bg-white/[0.06] text-white/70 font-medium text-[0.875rem] py-3 rounded-xl border border-white/10 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                List Your Room
              </Link>
            </>
          ) : (
            <ProfileCard inDrawer={true} onClose={() => setMenuOpen(false)} />
          )}
        </div>
      </aside>
    </div>
  );
};

export default Navbar;