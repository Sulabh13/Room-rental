import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ── FETCH WISHLIST ── */
    const fetchWishlist = async () => {
        try {
            const res = await API.get("/wishlist");
            setWishlist(res.data);
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
            showToast("Removed from wishlist.");
        } catch (error) {
            showToast("Failed to remove.", "error");
        } finally {
            setRemovingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-red-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Loading wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6">

            {/* TOAST */}
            {toast && (
                <div className={`fixed top-5 right-5 z-[999] px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.message}
                </div>
            )}

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">My Wishlist</h1>
                {wishlist.length > 0 && (
                    <span className="bg-red-100 text-red-500 text-sm px-3 py-1 rounded-full font-medium">
                        {wishlist.length} saved
                    </span>
                )}
            </div>

            {/* EMPTY STATE */}
            {wishlist.length === 0 ? (
                <div className="text-center py-20 border rounded-xl bg-gray-50">
                    <p className="text-5xl mb-4">❤️</p>
                    <p className="text-gray-500 text-lg font-medium">No rooms saved yet</p>
                    <p className="text-gray-400 text-sm mt-1 mb-5">
                        Browse rooms and click "Add to Wishlist" to save them here
                    </p>
                    <Link
                        to="/rooms"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
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
                            className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition group"
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
                                        <span className="text-base leading-none">♥</span>
                                    )}
                                </button>
                            </div>

                            {/* ROOM INFO */}
                            <div className="p-4">
                                <h3 className="font-semibold text-base truncate">{item.title}</h3>
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
                    text-white text-sm py-2 rounded-lg transition"
                                >
                                    View Room
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;