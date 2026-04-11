import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import {
    Upload,
    X,
    Home,
    MapPin,
    FileText,
    CheckCircle,
    Loader2,
    Menu,
    PlusCircle,
    LayoutDashboard,
    LogOut,
    User,
    Heart,
} from "lucide-react";

const roomTypes = [
    "Single", "Double", "Family",
    "1BHK", "2BHK", "3BHK",
    "PG", "Hostel", "Custom",
];

const AddRoom = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const fileInputRef = useRef();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        city: "Balaghat",
        location: "",
        room_type: "Single",
        furnished: false,
    });

    const [customType, setCustomType] = useState("");
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* ── TOAST ── */
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    /* ── LOGOUT ── */
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    /* ── FORM CHANGE ── */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    /* ── ROOM TYPE ── */
    const handleRoomType = (type) => {
        if (type === "Custom") {
            setForm({ ...form, room_type: "" });
        } else {
            setForm({ ...form, room_type: type });
            setCustomType("");
        }
    };

    /* ── ADD IMAGES ── */
    const addImages = (files) => {
        const fileArray = Array.from(files);
        if (images.length + fileArray.length > 5) {
            showToast("Maximum 5 images allowed.", "error");
            return;
        }
        setImages((prev) => [...prev, ...fileArray]);
        setPreview((prev) => [
            ...prev,
            ...fileArray.map((f) => URL.createObjectURL(f)),
        ]);
    };

    const handleImages = (e) => addImages(e.target.files);

    /* ── DRAG & DROP ── */
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        addImages(e.dataTransfer.files);
    };

    /* ── REMOVE IMAGE ── */
    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreview((prev) => prev.filter((_, i) => i !== index));
    };

    /* ── SUBMIT ── */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            showToast("Please upload at least 1 image.", "error");
            return;
        }

        const roomTypeFinal = form.room_type || customType;
        if (!roomTypeFinal) {
            showToast("Please enter a custom room type.", "error");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => formData.append(key, form[key]));
            formData.set("room_type", roomTypeFinal);
            formData.append("owner_id", user.id);
            images.forEach((img) => formData.append("images", img));

            await API.post("/rooms", formData);
            showToast("Room added successfully! ✅");
            setTimeout(() => navigate("/my-rooms"), 1500);
        } catch (error) {
            console.error(error);
            showToast(error.response?.data?.message || "Failed to add room.", "error");
        } finally {
            setLoading(false);
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
              ${to === "/add-room"
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
        <div className="flex min-h-screen bg-gray-50">

            {/* ── TOAST ── */}
            {toast && (
                <div className={`fixed top-5 right-5 z-[999] px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all
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
                    <h1 className="font-bold text-gray-800">Add New Room</h1>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={18} className="text-blue-600" />
                    </div>
                </div>

                {/* ── FORM AREA ── */}
                <div className="p-4 sm:p-6 lg:p-8">

                    {/* PAGE HEADER */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Add New Room</h1>
                        <p className="text-gray-400 text-sm mt-1">Fill in the details to list your property</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">

                        {/* ── SECTION 1: BASIC INFO ── */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Home size={16} className="text-blue-600" />
                                </div>
                                <h2 className="font-semibold text-gray-800">Basic Information</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* TITLE */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-600">Room Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g. Spacious 1BHK near Market"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                        className="border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    />
                                </div>

                                {/* PRICE */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-600">Price / Month *</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="5000"
                                            value={form.price}
                                            onChange={handleChange}
                                            required
                                            className="border border-gray-200 p-3 pl-7 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        />
                                    </div>
                                </div>

                                {/* CITY */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-600">City</label>
                                    <div className="relative">
                                        <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="city"
                                            value={form.city}
                                            disabled
                                            className="border border-gray-200 p-3 pl-8 rounded-xl text-sm w-full bg-gray-50 text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* LOCATION */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-600">Location / Area *</label>
                                    <div className="relative">
                                        <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="e.g. Prem Nagar, Moti Nagar"
                                            value={form.location}
                                            onChange={handleChange}
                                            required
                                            className="border border-gray-200 p-3 pl-8 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* ── SECTION 2: ROOM TYPE ── */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                                    <CheckCircle size={16} className="text-purple-600" />
                                </div>
                                <h2 className="font-semibold text-gray-800">Room Type & Features</h2>
                            </div>

                            <label className="text-sm font-medium text-gray-600 mb-3 block">Select Room Type *</label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                                {roomTypes.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => handleRoomType(type)}
                                        className={`py-2.5 px-2 rounded-xl text-sm font-medium border transition-all
                      ${(form.room_type === type || (type === "Custom" && form.room_type === ""))
                                                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            {form.room_type === "" && (
                                <input
                                    type="text"
                                    placeholder="Enter custom room type (e.g. Lodge, Dormitory)"
                                    value={customType}
                                    onChange={(e) => setCustomType(e.target.value)}
                                    required
                                    className="border border-gray-200 p-3 rounded-xl text-sm mt-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            )}

                            {/* FURNISHED TOGGLE */}
                            <div className="mt-5">
                                <label className="flex items-center gap-3 cursor-pointer w-fit">
                                    <div
                                        onClick={() => setForm({ ...form, furnished: !form.furnished })}
                                        className={`w-11 h-6 rounded-full transition-colors relative
                      ${form.furnished ? "bg-blue-600" : "bg-gray-200"}`}
                                    >
                                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all
                      ${form.furnished ? "left-5" : "left-0.5"}`}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        Furnished
                                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full
                      ${form.furnished ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                                            {form.furnished ? "Yes" : "No"}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* ── SECTION 3: DESCRIPTION ── */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                                    <FileText size={16} className="text-green-600" />
                                </div>
                                <h2 className="font-semibold text-gray-800">Description</h2>
                            </div>
                            <textarea
                                name="description"
                                placeholder="Describe your room — amenities, nearby places, rules, etc."
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className="border border-gray-200 p-3 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                            />
                            <p className="text-xs text-gray-400 mt-1.5 text-right">
                                {form.description.length} characters
                            </p>
                        </div>

                        {/* ── SECTION 4: IMAGES ── */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                                        <Upload size={16} className="text-orange-500" />
                                    </div>
                                    <h2 className="font-semibold text-gray-800">Room Images</h2>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                  ${images.length >= 5 ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"}`}>
                                    {images.length} / 5
                                </span>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImages}
                                className="hidden"
                            />

                            {images.length < 5 && (
                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
                    ${dragOver
                                            ? "border-blue-400 bg-blue-50"
                                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                                        }`}
                                >
                                    <Upload size={28} className="mx-auto text-gray-300 mb-2" />
                                    <p className="text-sm font-medium text-gray-500">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — Max 5 images</p>
                                </div>
                            )}

                            {preview.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                                    {preview.map((img, index) => (
                                        <div key={index} className="relative group rounded-xl overflow-hidden">
                                            <img
                                                src={img}
                                                alt={`preview-${index}`}
                                                className="h-28 w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow"
                                            >
                                                <X size={12} />
                                            </button>
                                            {index === 0 && (
                                                <span className="absolute bottom-2 left-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                                    Cover
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── SUBMIT ── */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                disabled:opacity-60 text-white py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Uploading Room...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={18} />
                                    Add Room
                                </>
                            )}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRoom;