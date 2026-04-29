import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
    MapPin,
    Home,
    PlusCircle,
    LayoutDashboard,
    LogOut,
    User,
    Menu,
    X,
    Trash2,
    Pencil,
    Eye,
    Heart,
} from "lucide-react";

const MyRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    /* ── TOAST ── */
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ── LOGOUT ── */
    const logout = () => {
        localStorage.clear();
        // ✅ NAYA — Navbar ko signal do
        window.dispatchEvent(new Event("loginStateChange"));
        navigate("/");
    };

    /* ── FETCH ROOMS ── */
    const fetchRooms = async () => {
        try {
            const res = await API.get(`/rooms/my-rooms?t=${Date.now()}`);
            setRooms(res.data);
        } catch (error) {
            console.error(error);
            showToast("Failed to load rooms.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    /* ── DELETE ROOM ── */
    const deleteRoom = async (id) => {
        if (!window.confirm("Are you sure you want to delete this room?")) return;
        setDeletingId(id);
        try {
            await API.delete(`/rooms/${id}`);
            setRooms((prev) => prev.filter((r) => r.id !== id));
            showToast("Room deleted successfully.");
        } catch (error) {
            showToast("Failed to delete room.", "error");
        } finally {
            setDeletingId(null);
        }
    };

    /* ── SIDEBAR LINKS ── */
    const navLinks = [
        { to: "/owner-dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/add-room", label: "Add Room", icon: <PlusCircle size={18} /> },
        { to: "/my-rooms", label: "My Rooms", icon: <Home size={18} /> },
        { to: "/wishlist", label: "My Wishlist", icon: <Heart size={18} /> },
    ];

    /* ── SIDEBAR CONTENT ── */
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
                            ${to === "/my-rooms"
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                    >
                        {icon}
                        {label}
                    </Link>
                ))}
            </nav>

            {/* PROFILE + LOGOUT */}
            <div className="px-4 py-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 mb-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
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
        <div className="flex min-h-screen bg-gray-50 pt-16">

            {/* ── TOAST ── */}
            {toast && (
                <div className={`fixed top-5 right-5 z-[999] px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium
                    ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.message}
                </div>
            )}

            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="hidden md:flex flex-col w-64 bg-white shadow-sm border-r border-gray-100 fixed h-full z-30">
                <SidebarContent />
            </aside>

            {/* ── MOBILE OVERLAY ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── MOBILE SIDEBAR DRAWER ── */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 md:hidden
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
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
            <div className="flex-1 md:ml-64">

                {/* ── MOBILE TOPBAR ── */}
                <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-gray-100 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <Menu size={22} />
                    </button>
                    <h1 className="font-bold text-gray-800">My Rooms</h1>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={18} className="text-blue-600" />
                    </div>
                </div>

                {/* ── PAGE CONTENT ── */}
                <div className="p-4 sm:p-6 lg:p-8">

                    {/* PAGE HEADER */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Rooms</h1>
                            <p className="text-gray-400 text-sm mt-1">
                                {rooms.length > 0
                                    ? `${rooms.length} listing${rooms.length > 1 ? "s" : ""} found`
                                    : "Manage your property listings"}
                            </p>
                        </div>
                        <Link
                            to="/add-room"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
                        >
                            <PlusCircle size={16} />
                            <span className="hidden sm:inline">Add Room</span>
                        </Link>
                    </div>

                    {/* ── LOADING ── */}
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>

                    /* ── EMPTY STATE ── */
                    ) : rooms.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                            <p className="text-5xl mb-3">🏠</p>
                            <p className="text-gray-600 font-semibold text-lg">No rooms added yet</p>
                            <p className="text-gray-400 text-sm mt-1 mb-6">Start by listing your first property</p>
                            <Link
                                to="/add-room"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
                            >
                                <PlusCircle size={16} />
                                Add Your First Room
                            </Link>
                        </div>

                    /* ── ROOMS GRID ── */
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {rooms.map((room) => (
                                <div
                                    key={room.id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col border border-gray-100 group"
                                >
                                    {/* IMAGE */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={room.images?.[0] || "https://via.placeholder.com/400x200?text=No+Image"}
                                            alt={room.title}
                                            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                                            {room.room_type}
                                        </span>
                                        {room.furnished && (
                                            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                                                Furnished
                                            </span>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4 flex flex-col flex-grow">

                                        <h2 className="font-semibold text-gray-800 line-clamp-1">{room.title}</h2>

                                        <p className="text-gray-400 flex items-center gap-1 text-xs mt-1.5">
                                            <MapPin size={12} />
                                            {room.city} • {room.location}
                                        </p>

                                        <p className="text-blue-600 font-bold mt-2 text-sm">
                                            ₹{room.price?.toLocaleString()}
                                            <span className="text-gray-400 font-normal"> / month</span>
                                        </p>

                                        <p className="text-xs text-gray-500 mt-2 line-clamp-2 flex-grow">
                                            {room.description}
                                        </p>

                                        {/* ACTION BUTTONS */}
                                        <div className="flex gap-2 mt-4">

                                            {/* ✅ FIX — /rooms/ → /room/ */}
                                            <Link
                                                to={`/room/${room.id}`}
                                                className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-medium transition"
                                            >
                                                <Eye size={13} />
                                                View
                                            </Link>

                                            <Link
                                                to={`/edit-room/${room.id}`}
                                                className="flex-1 flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-xs font-medium transition"
                                            >
                                                <Pencil size={13} />
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => deleteRoom(room.id)}
                                                disabled={deletingId === room.id}
                                                className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-500 py-2 rounded-lg text-xs font-medium transition disabled:opacity-60"
                                            >
                                                {deletingId === room.id ? (
                                                    <span className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 size={13} />
                                                )}
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyRooms;