import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, LayoutDashboard } from "lucide-react";

const ProfileCard = () => {

    const navigate = useNavigate();
    const dropdownRef = useRef();

    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        navigate("/");
        setOpen(false);

    };

    /* Close dropdown when clicking outside */

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (

        <div ref={dropdownRef} className="relative">

            {/* USER IMAGE */}

            <img
                src={
                    user?.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="w-10 h-10 rounded-full border cursor-pointer"
                onClick={() => setOpen(!open)}
            />

            {/* DROPDOWN */}

            {open && (

                <div className="absolute right-0 mt-4 w-56 bg-white text-black rounded-xl shadow-lg z-50">

                    {/* USER INFO */}

                    <div className="p-4 border-b">

                        <p className="font-semibold text-sm">
                            {user?.name}
                        </p>

                        <p className="text-xs text-gray-500">
                            {user?.email}
                        </p>

                        <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-1 inline-block">
                            {role}
                        </span>

                    </div>

                    {/* MENU */}

                    <div className="p-2 space-y-1">

                        <Link
                            to="/profile"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                        >
                            <User size={16} />
                            Profile
                        </Link>

                        {role === "owner" && (

                            <Link
                                to="/owner-dashboard"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
                            >
                                <LayoutDashboard size={16} />
                                Owner Dashboard
                            </Link>

                        )}

                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded w-full text-left"
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