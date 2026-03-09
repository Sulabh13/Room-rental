import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/",         label: "Home",     icon: "🏠" },
  { to: "/rooms",    label: "Rooms",    icon: "🛏️" },
  { to: "/aboute", label: "Aboute", icon: "➕" },
  { to: "/contact",  label: "Contact",  icon: "✉️" },
];

const Nav = () => {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location              = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 999;
          transition: all 0.35s ease;
        }

        .nav-root.scrolled {
          background: rgba(12, 10, 9, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(245, 158, 11, 0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .nav-root.top {
          background: rgba(12, 10, 9, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-logo .logo-room { color: #f59e0b; }
        .nav-logo .logo-finder { color: #fff; }
        .nav-logo .logo-dot {
          width: 6px; height: 6px;
          background: #f59e0b;
          border-radius: 50%;
          display: inline-block;
          margin-bottom: 2px;
          box-shadow: 0 0 8px rgba(245,158,11,0.8);
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 6px rgba(245,158,11,0.8); }
          50%      { box-shadow: 0 0 14px rgba(245,158,11,1); }
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.03em;
          padding: 6px 2px;
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #f59e0b, #fde68a);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(.22,1,.36,1);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #fbbf24; }

        .btn-login {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.18);
          padding: 8px 20px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.03em;
        }
        .btn-login:hover {
          color: #fff;
          border-color: rgba(245,158,11,0.6);
          background: rgba(245,158,11,0.08);
        }

        .btn-signup {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1c1917;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border: none;
          padding: 9px 22px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.03em;
          box-shadow: 0 4px 14px rgba(245,158,11,0.35);
        }
        .btn-signup:hover {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245,158,11,0.5);
        }

        /* Hamburger */
        .hamburger {
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: all 0.2s ease;
        }
        .hamburger:hover {
          background: rgba(245,158,11,0.15);
          border-color: rgba(245,158,11,0.4);
          color: #f59e0b;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          inset: 0;
          z-index: 998;
          display: flex;
          pointer-events: none;
        }
        .mobile-backdrop {
          flex: 1;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .mobile-panel {
          width: 280px;
          background: #0c0a09;
          border-left: 1px solid rgba(245,158,11,0.15);
          display: flex;
          flex-direction: column;
          padding: 0;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
          pointer-events: none;
          box-shadow: -20px 0 60px rgba(0,0,0,0.5);
        }
        .mobile-drawer.open .mobile-backdrop {
          opacity: 1;
          pointer-events: all;
        }
        .mobile-drawer.open .mobile-panel {
          transform: translateX(0);
          pointer-events: all;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 15px 24px;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all 0.2s ease;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #fbbf24;
          background: rgba(245,158,11,0.07);
          padding-left: 28px;
        }
        .mobile-nav-link .icon {
          font-size: 16px;
          width: 24px;
          text-align: center;
        }

        @keyframes navIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-inner { animation: navIn 0.5s ease both; }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-inner" style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}>

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-dot" />
            <span className="logo-room">Room</span>
            <span className="logo-finder">Finder</span>
          </Link>

          {/* Desktop Links */}
          <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}
            className="hidden md:flex">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link ${location.pathname === to ? "active" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}
            className="hidden md:flex">
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/signup" className="btn-signup">Sign Up →</Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <div className="hamburger" onClick={() => setOpen(true)}>
              <Menu size={20} />
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <div className="mobile-backdrop" onClick={() => setOpen(false)} />
        <div className="mobile-panel">

          {/* Drawer Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(245,158,11,0.15)",
          }}>
            <Link to="/" className="nav-logo" style={{ fontSize: 18 }} onClick={() => setOpen(false)}>
              <span className="logo-dot" />
              <span className="logo-room">Room</span>
              <span className="logo-finder">Finder</span>
            </Link>
            <div className="hamburger" onClick={() => setOpen(false)}>
              <X size={18} />
            </div>
          </div>

          {/* Drawer Links */}
          <div style={{ flex: 1, paddingTop: 8 }}>
            {NAV_LINKS.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`mobile-nav-link ${location.pathname === to ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className="icon">{icon}</span>
                {label}
                {location.pathname === to && (
                  <span style={{ marginLeft: "auto", color: "#f59e0b", fontSize: 12 }}>●</span>
                )}
              </Link>
            ))}
          </div>

          {/* Drawer Auth */}
          <div style={{
            padding: "20px 24px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="btn-login" style={{ width: "100%", justifyContent: "center" }}>
                Login
              </button>
            </Link>
            <Link to="/signup" onClick={() => setOpen(false)}>
              <button className="btn-signup" style={{ width: "100%", justifyContent: "center" }}>
                Sign Up →
              </button>
            </Link>
          </div>

          {/* Drawer Footer */}
          <div style={{ padding: "14px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
              INDIA'S TRUSTED ROOM RENTAL
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Nav;