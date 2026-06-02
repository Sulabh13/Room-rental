import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, LayoutDashboard, Heart } from "lucide-react";

const ProfileCard = ({ inDrawer = false, onClose = () => { } }) => {
    const navigate = useNavigate();
    const dropdownRef = useRef();
    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        // ✅ YEH LINE ADD KI — Navbar turant Login button dikhayega
        window.dispatchEvent(new Event("loginStateChange"));

        setOpen(false);
        onClose();
        navigate("/");
    };

    const handleLinkClick = () => {
        setOpen(false);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">

            {/* PROFILE IMAGE */}
            <img
                src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-gray-500 cursor-pointer hover:border-white transition-all"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
            />

            {/* DROPDOWN */}
            {open && (
                <div
                    className={`
                        ${inDrawer ? "relative mt-3 w-full" : "absolute right-0 mt-3 w-56"}
                        bg-white text-black rounded-xl shadow-2xl z-[999]
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* USER INFO */}
                    <div className="p-4 border-b">
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt="profile"
                                className="w-10 h-10 rounded-full border"
                            />
                            <div>
                                <p className="font-semibold text-sm">{user?.name}</p>
                                <p className="text-xs text-gray-500 truncate max-w-[140px]">{user?.email}</p>
                            </div>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mt-2 inline-block capitalize">
                            {role}
                        </span>
                    </div>

                    {/* MENU ITEMS */}
                    <div className="p-2 space-y-1">

                        <Link
                            to="/profile"
                            onClick={handleLinkClick}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm transition"
                        >
                            <User size={16} className="text-gray-500" />
                            Profile
                        </Link>

                        <Link
                            to="/wishlist"
                            onClick={handleLinkClick}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm transition"
                        >
                            <Heart size={16} className="text-red-400" />
                            My Wishlist
                        </Link>

                        {role === "owner" && (
                            <Link
                                to="/owner-dashboard"
                                onClick={handleLinkClick}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm transition"
                            >
                                <LayoutDashboard size={16} className="text-gray-500" />
                                Owner Dashboard
                            </Link>
                        )}

                        <hr className="my-1 border-gray-100" />

                        {/* LOGOUT */}
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-lg w-full text-left text-sm text-red-500 transition"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;