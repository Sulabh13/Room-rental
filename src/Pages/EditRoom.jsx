import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../api/axios";
import {
    Home,
    PlusCircle,
    LayoutDashboard,
    LogOut,
    User,
    Menu,
    X,
    Heart,
    Trash2,
    Upload,
    Image,
    Video,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Save,
} from "lucide-react";

const EditRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    /* ── STATE ── */
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState(null);

    // Existing media from server
    const [existingImages, setExistingImages] = useState([]); // array of URLs
    const [existingVideos, setExistingVideos] = useState([]); // array of URLs
    const [deletedImages, setDeletedImages] = useState([]); // URLs marked for deletion
    const [deletedVideos, setDeletedVideos] = useState([]); // URLs marked for deletion

    // New files to upload
    const [newImages, setNewImages] = useState([]); // File objects
    const [newVideos, setNewVideos] = useState([]); // File objects
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [newVideoPreviews, setNewVideoPreviews] = useState([]);

    const imageInputRef = useRef();
    const videoInputRef = useRef();

    // Form fields
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        city: "",
        location: "",
        room_type: "",
        furnished: false,
        available: true,
        amenities: "",
    });

    /* ── TOAST ── */
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    /* ── LOGOUT ── */
    const logout = () => {
        localStorage.clear();
        window.dispatchEvent(new Event("loginStateChange"));
        navigate("/");
    };

    /* ── FETCH ROOM ── */
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await API.get(`/rooms/${id}`);
                const room = res.data;
                setForm({
                    title: room.title || "",
                    description: room.description || "",
                    price: room.price || "",
                    city: room.city || "",
                    location: room.location || "",
                    room_type: room.room_type || "",
                    furnished: room.furnished || false,
                    available: room.available ?? true,
                    amenities: Array.isArray(room.amenities)
                        ? room.amenities.join(", ")
                        : room.amenities || "",
                });
                setExistingImages(room.images || []);
                setExistingVideos(room.videos || []);
            } catch (err) {
                showToast("Failed to load room data.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [id]);

    /* ── FORM CHANGE ── */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    /* ── TOGGLE DELETE EXISTING IMAGE ── */
    const toggleDeleteImage = (url) => {
        setDeletedImages((prev) =>
            prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
        );
    };

    /* ── TOGGLE DELETE EXISTING VIDEO ── */
    const toggleDeleteVideo = (url) => {
        setDeletedVideos((prev) =>
            prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
        );
    };

    /* ── NEW IMAGE SELECT ── */
    const handleNewImages = (e) => {
        const files = Array.from(e.target.files);
        setNewImages((prev) => [...prev, ...files]);
        const previews = files.map((f) => URL.createObjectURL(f));
        setNewImagePreviews((prev) => [...prev, ...previews]);
    };

    /* ── REMOVE NEW IMAGE PREVIEW ── */
    const removeNewImage = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
        setNewImagePreviews((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    /* ── NEW VIDEO SELECT ── */
    const handleNewVideos = (e) => {
        const files = Array.from(e.target.files);
        setNewVideos((prev) => [...prev, ...files]);
        const previews = files.map((f) => URL.createObjectURL(f));
        setNewVideoPreviews((prev) => [...prev, ...previews]);
    };

    /* ── REMOVE NEW VIDEO PREVIEW ── */
    const removeNewVideo = (index) => {
        setNewVideos((prev) => prev.filter((_, i) => i !== index));
        setNewVideoPreviews((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    /* ── SUBMIT ── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();

            // Append text fields
            Object.entries(form).forEach(([key, val]) => {
                formData.append(key, val);
            });

            // Append URLs to delete
            deletedImages.forEach((url) => formData.append("delete_images[]", url));
            deletedVideos.forEach((url) => formData.append("delete_videos[]", url));

            // Append new files
            newImages.forEach((file) => formData.append("images", file));
            newVideos.forEach((file) => formData.append("videos", file));

            await API.put(`/rooms/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            showToast("Room updated successfully! ✅");
            setTimeout(() => navigate("/my-rooms"), 1500);
        } catch (err) {
            showToast("Failed to update room. Please try again.", "error");
        } finally {
            setSaving(false);
        }
    };

    /* ── SIDEBAR LINKS ── */
    const navLinks = [
        { to: "/owner-dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/add-room", label: "Add Room", icon: <PlusCircle size={18} /> },
        { to: "/my-rooms", label: "My Rooms", icon: <Home size={18} /> },
        { to: "/wishlist", label: "My Wishlist", icon: <Heart size={18} /> },
    ];

    /* ── SIDEBAR ── */
    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">🏠 Owner Panel</h2>
                <p className="text-xs text-gray-400 mt-0.5">Manage your listings</p>
            </div>
            <nav className="flex-1 px-4 py-5 space-y-1">
                {navLinks.map(({ to, label, icon }) => (
                    <Link
                        key={to}
                        to={to}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                        {icon}
                        {label}
                    </Link>
                ))}
            </nav>
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

    /* ── RENDER ── */
    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* TOAST */}
            {toast && (
                <div className={`fixed top-5 right-5 z-[999] flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium
                    ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    {toast.message}
                </div>
            )}

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden md:flex flex-col w-64 bg-white shadow-sm border-r border-gray-100 fixed h-full z-30">
                <SidebarContent />
            </aside>

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* MOBILE SIDEBAR DRAWER */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 md:hidden
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-4 border-b border-gray-100">
                    <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                        <X size={20} />
                    </button>
                </div>
                <SidebarContent />
            </aside>

            {/* MAIN */}
            <div className="flex-1 md:ml-64">

                {/* MOBILE TOPBAR */}
                <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-gray-100 sticky top-0 z-30">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                        <Menu size={22} />
                    </button>
                    <h1 className="font-bold text-gray-800">Edit Room</h1>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={18} className="text-blue-600" />
                    </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">

                    {/* PAGE HEADER */}
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => navigate("/my-rooms")}
                            className="p-2 rounded-xl hover:bg-gray-200 transition text-gray-500"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Room</h1>
                            <p className="text-gray-400 text-sm mt-0.5">Update your listing details & media</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* ─── BASIC INFO ─── */}
                            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
                                <h2 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">1</span>
                                    Basic Information
                                </h2>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Title</label>
                                    <input
                                        type="text" name="title" value={form.title} onChange={handleChange} required
                                        placeholder="e.g. Spacious 2BHK near Metro"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
                                    <textarea
                                        name="description" value={form.description} onChange={handleChange} rows={4} required
                                        placeholder="Describe your room, nearby facilities, rules..."
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Price (₹/month)</label>
                                        <input
                                            type="number" name="price" value={form.price} onChange={handleChange} required
                                            placeholder="e.g. 8000"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Room Type</label>
                                        <select
                                            name="room_type" value={form.room_type} onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                                        >
                                            <option value="">Select type</option>
                                            {["Single", "Double", "Triple", "1BHK", "2BHK", "3BHK", "Studio", "PG"].map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1.5">City</label>
                                        <input
                                            type="text" name="city" value={form.city} onChange={handleChange} required
                                            placeholder="e.g. Bhopal"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Location / Area</label>
                                        <input
                                            type="text" name="location" value={form.location} onChange={handleChange} required
                                            placeholder="e.g. Arera Colony"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Amenities (comma separated)</label>
                                    <input
                                        type="text" name="amenities" value={form.amenities} onChange={handleChange}
                                        placeholder="e.g. WiFi, AC, Parking, Geyser"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" name="furnished" checked={form.furnished} onChange={handleChange}
                                            className="w-4 h-4 rounded accent-blue-600" />
                                        <span className="text-sm text-gray-700">Furnished</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" name="available" checked={form.available} onChange={handleChange}
                                            className="w-4 h-4 rounded accent-blue-600" />
                                        <span className="text-sm text-gray-700">Available</span>
                                    </label>
                                </div>
                            </section>

                            {/* ─── EXISTING IMAGES ─── */}
                            {existingImages.length > 0 && (
                                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
                                    <h2 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">2</span>
                                        Current Images
                                        <span className="ml-auto text-xs text-gray-400 font-normal">Click to mark for deletion</span>
                                    </h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {existingImages.map((url, i) => {
                                            const isMarked = deletedImages.includes(url);
                                            return (
                                                <div key={i} className="relative group rounded-xl overflow-hidden border-2 transition-all duration-200"
                                                    style={{ borderColor: isMarked ? "#ef4444" : "#e5e7eb" }}>
                                                    <img src={url} alt={`img-${i}`}
                                                        className={`w-full h-28 object-cover transition-all duration-200 ${isMarked ? "opacity-40 grayscale" : ""}`}
                                                    />
                                                    {/* Delete overlay badge */}
                                                    {isMarked && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                                                                Will be deleted
                                                            </span>
                                                        </div>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDeleteImage(url)}
                                                        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all
                                                            ${isMarked
                                                                ? "bg-red-500 text-white hover:bg-gray-200 hover:text-gray-700"
                                                                : "bg-white/90 text-red-500 hover:bg-red-500 hover:text-white"}`}
                                                        title={isMarked ? "Undo delete" : "Mark for deletion"}
                                                    >
                                                        {isMarked ? <X size={13} /> : <Trash2 size={13} />}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {deletedImages.length > 0 && (
                                        <p className="text-xs text-red-500 flex items-center gap-1.5">
                                            <AlertCircle size={13} />
                                            {deletedImages.length} image{deletedImages.length > 1 ? "s" : ""} marked for deletion. Save to confirm.
                                        </p>
                                    )}
                                </section>
                            )}

                            {/* ─── EXISTING VIDEOS ─── */}
                            {existingVideos.length > 0 && (
                                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
                                    <h2 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">3</span>
                                        Current Videos
                                        <span className="ml-auto text-xs text-gray-400 font-normal">Click to mark for deletion</span>
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {existingVideos.map((url, i) => {
                                            const isMarked = deletedVideos.includes(url);
                                            return (
                                                <div key={i} className="relative group rounded-xl overflow-hidden border-2 transition-all duration-200"
                                                    style={{ borderColor: isMarked ? "#ef4444" : "#e5e7eb" }}>
                                                    <video src={url} controls
                                                        className={`w-full h-40 object-cover rounded-xl transition-all duration-200 ${isMarked ? "opacity-40 grayscale" : ""}`}
                                                    />
                                                    {isMarked && (
                                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                                                                Will be deleted
                                                            </span>
                                                        </div>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDeleteVideo(url)}
                                                        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all z-10
                                                            ${isMarked
                                                                ? "bg-red-500 text-white hover:bg-gray-200 hover:text-gray-700"
                                                                : "bg-white/90 text-red-500 hover:bg-red-500 hover:text-white"}`}
                                                        title={isMarked ? "Undo delete" : "Mark for deletion"}
                                                    >
                                                        {isMarked ? <X size={13} /> : <Trash2 size={13} />}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {deletedVideos.length > 0 && (
                                        <p className="text-xs text-red-500 flex items-center gap-1.5">
                                            <AlertCircle size={13} />
                                            {deletedVideos.length} video{deletedVideos.length > 1 ? "s" : ""} marked for deletion. Save to confirm.
                                        </p>
                                    )}
                                </section>
                            )}

                            {/* ─── ADD NEW IMAGES ─── */}
                            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
                                <h2 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">
                                        {existingImages.length > 0 ? (existingVideos.length > 0 ? "4" : "3") : "2"}
                                    </span>
                                    Add New Images
                                </h2>

                                {/* Upload Zone */}
                                <button
                                    type="button"
                                    onClick={() => imageInputRef.current.click()}
                                    className="w-full border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:text-blue-500 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center transition">
                                        <Image size={20} />
                                    </div>
                                    <span className="text-sm font-medium">Click to upload images</span>
                                    <span className="text-xs">JPG, PNG, WEBP (multiple allowed)</span>
                                </button>
                                <input ref={imageInputRef} type="file" accept="image/*" multiple hidden onChange={handleNewImages} />

                                {/* New Image Previews */}
                                {newImagePreviews.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {newImagePreviews.map((src, i) => (
                                            <div key={i} className="relative rounded-xl overflow-hidden border border-blue-200 group">
                                                <img src={src} alt={`new-img-${i}`} className="w-full h-28 object-cover" />
                                                <span className="absolute bottom-0 inset-x-0 bg-blue-600/80 text-white text-[10px] text-center py-0.5">New</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(i)}
                                                    className="absolute top-2 right-2 w-6 h-6 bg-white/90 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center shadow transition"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* ─── ADD NEW VIDEOS ─── */}
                            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
                                <h2 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">
                                        {existingImages.length > 0 ? (existingVideos.length > 0 ? "5" : "4") : existingVideos.length > 0 ? "4" : "3"}
                                    </span>
                                    Add New Videos
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => videoInputRef.current.click()}
                                    className="w-full border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:text-blue-500 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center transition">
                                        <Video size={20} />
                                    </div>
                                    <span className="text-sm font-medium">Click to upload videos</span>
                                    <span className="text-xs">MP4, MOV, WEBM (multiple allowed)</span>
                                </button>
                                <input ref={videoInputRef} type="file" accept="video/*" multiple hidden onChange={handleNewVideos} />

                                {/* New Video Previews */}
                                {newVideoPreviews.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {newVideoPreviews.map((src, i) => (
                                            <div key={i} className="relative rounded-xl overflow-hidden border border-blue-200">
                                                <video src={src} controls className="w-full h-40 object-cover" />
                                                <span className="absolute bottom-0 inset-x-0 bg-blue-600/80 text-white text-[10px] text-center py-0.5">New</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewVideo(i)}
                                                    className="absolute top-2 right-2 w-6 h-6 bg-white/90 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center shadow transition z-10"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* ─── SUBMIT ─── */}
                            <div className="flex items-center gap-3 pb-6">
                                <button
                                    type="button"
                                    onClick={() => navigate("/my-rooms")}
                                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-sm font-medium transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-8 py-3 rounded-xl text-sm font-semibold transition shadow-sm"
                                >
                                    {saving ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditRoom;