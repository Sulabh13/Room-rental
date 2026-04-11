import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import {
    Home,
    Heart,
    PlusCircle,
    User,
    Menu,
    X,
    LogOut,
    LayoutDashboard,
} from "lucide-react";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    /* ── TOAST ── */
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ── FETCH WISHLIST ── */
    const fetchWishlist = async () => {
        try {
            const res = await API.get("/wishlist");
            setWishlist(res.data);
            setWishlistCount(res.data.length);
        } catch (error) {
            console.error("Fetch wishlist error:", error);
            if (error.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchWishlist();
    }, []);

    /* ── REMOVE FROM WISHLIST ── */
    const removeWishlist = async (roomId) => {
        setRemovingId(roomId);
        try {
            await API.delete(`/wishlist/${roomId}`);
            setWishlist((prev) => prev.filter((item) => item.id !== roomId));
            setWishlistCount((prev) => prev - 1);
            showToast("Removed from wishlist.");
        } catch (error) {
            showToast("Failed to remove.", "error");
        } finally {
            setRemovingId(null);
        }
    };

    /* ── LOGOUT ── */
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const navLinks = [
        { to: "/owner-dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/add-room", label: "Add Room", icon: <PlusCircle size={18} /> },
        { to: "/my-rooms", label: "My Rooms", icon: <Home size={18} /> },
        { to: "/wishlist", label: "My Wishlist", icon: <Heart size={18} /> },
    ];

    /* ── SHARED SIDEBAR CONTENT ── */
    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* LOGO */}
            <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">🏠 Owner Panel</h2>
                <p className="text-xs text-gray-400 mt-0.5">Manage your listings</p>
            </div>

            {/* NAV LINKS */}
            <nav className="flex-1 px-4 py-5 space-y-1">
                {navLinks.map(({ to, label, icon }) => (
                    <Link
                        key={to}
                        to={to}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all
                            ${label === "My Wishlist"
                                ? "bg-red-50 text-red-500"
                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                    >
                        {icon}
                        {label}
                        {/* badge on wishlist link */}
                        {label === "My Wishlist" && wishlistCount > 0 && (
                            <span className="ml-auto bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-full font-semibold">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* PROFILE + LOGOUT */}
            <div className="px-4 py-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 mb-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 text-sm font-medium transition"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* ── TOAST ── */}
            {toast && (
                <div className={`fixed top-5 right-5 z-[999] px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all
                    ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.message}
                </div>
            )}

            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="hidden md:flex flex-col w-64 bg-white shadow-sm border-r border-gray-100 fixed h-full">
                <SidebarContent />
            </aside>

            {/* ── MOBILE SIDEBAR OVERLAY ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── MOBILE SIDEBAR DRAWER ── */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 md:hidden
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-4 border-b border-gray-100">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                    >
                        <X size={20} />
                    </button>
                </div>
                <SidebarContent />
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 md:ml-64">

                {/* ── MOBILE TOPBAR ── */}
                <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-gray-100 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <Menu size={22} />
                    </button>
                    <h1 className="font-bold text-gray-800">My Wishlist</h1>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={18} className="text-blue-600" />
                    </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">

                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Wishlist</h1>
                        {wishlistCount > 0 && (
                            <span className="bg-red-100 text-red-500 text-sm px-3 py-1 rounded-full font-medium">
                                {wishlistCount} saved
                            </span>
                        )}
                    </div>

                    {/* LOADING */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-10 h-10 border-4 border-red-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                <p className="text-gray-500 text-sm">Loading wishlist...</p>
                            </div>
                        </div>
                    ) : wishlist.length === 0 ? (

                        /* EMPTY STATE */
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                            <p className="text-5xl mb-4">❤️</p>
                            <p className="text-gray-500 text-lg font-medium">No rooms saved yet</p>
                            <p className="text-gray-400 text-sm mt-1 mb-5">
                                Browse rooms and click "Add to Wishlist" to save them here
                            </p>
                            <Link
                                to="/rooms"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
                            >
                                Browse Rooms
                            </Link>
                        </div>

                    ) : (

                        /* WISHLIST GRID */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {wishlist.map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all group"
                                >
                                    {/* ROOM IMAGE */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.images?.[0] || "https://via.placeholder.com/400x200?text=No+Image"}
                                            alt={item.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* REMOVE BUTTON */}
                                        <button
                                            onClick={() => removeWishlist(item.id)}
                                            disabled={removingId === item.id}
                                            className="absolute top-3 right-3 bg-white/90 hover:bg-red-500 hover:text-white
                                                text-red-500 p-2 rounded-full shadow transition-all disabled:opacity-60"
                                            title="Remove from wishlist"
                                        >
                                            {removingId === item.id ? (
                                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin block" />
                                            ) : (
                                                <Heart size={16} fill="currentColor" />
                                            )}
                                        </button>
                                    </div>

                                    {/* ROOM INFO */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-base truncate text-gray-800">{item.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            📍 {item.city} • {item.location}
                                        </p>
                                        <p className="text-blue-600 font-bold mt-2">
                                            ₹{item.price?.toLocaleString()}
                                            <span className="text-gray-400 font-normal text-xs"> / month</span>
                                        </p>

                                        <Link
                                            to={`/rooms/${item.id}`}
                                            className="mt-3 block w-full text-center bg-gray-900 hover:bg-gray-700
                                                text-white text-sm py-2 rounded-xl transition"
                                        >
                                            View Room
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Wishlist;