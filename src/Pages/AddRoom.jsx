import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Upload, X } from "lucide-react";
import OwnerSidebar from "../Comonentes/OwnerSidebar";

const roomTypes = [
    "Single",
    "Double",
    "Family",
    "1BHK",
    "2BHK",
    "3BHK",
    "PG",
    "Hostel",
    "Custom"
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
        furnished: false
    });

    const [customType, setCustomType] = useState("");

    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });

    };

    /* =========================
       ROOM TYPE SELECT
    ========================== */

    const handleRoomType = (type) => {

        if (type === "Custom") {
            setForm({
                ...form,
                room_type: ""
            });
        } else {
            setForm({
                ...form,
                room_type: type
            });
        }

    };

    /* =========================
       IMAGE UPLOAD
    ========================== */

    const handleImages = (e) => {

        const files = Array.from(e.target.files);

        if (images.length + files.length > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        const newImages = [...images, ...files];

        const newPreview = [
            ...preview,
            ...files.map((file) => URL.createObjectURL(file))
        ];

        setImages(newImages);
        setPreview(newPreview);

    };

    const removeImage = (index) => {

        const img = [...images];
        const prev = [...preview];

        img.splice(index, 1);
        prev.splice(index, 1);

        setImages(img);
        setPreview(prev);

    };

    /* =========================
       SUBMIT
    ========================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (images.length === 0) {
            alert("Please upload at least 1 image");
            return;
        }

        let roomTypeFinal = form.room_type;

        if (!roomTypeFinal && customType) {
            roomTypeFinal = customType;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });

            formData.set("room_type", roomTypeFinal);

            formData.append("owner_id", user.id);

            images.forEach((img) => {
                formData.append("images", img);
            });

            await API.post("/rooms", formData);

            alert("Room Added Successfully");

            navigate("/my-rooms");

        } catch (error) {

            console.log(error);
            alert("Room add failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex min-h-screen bg-gray-100">

            <OwnerSidebar />

            <div className="flex-1 p-8">

                <div className="bg-white p-8 rounded-xl shadow max-w-5xl">

                    <h2 className="text-2xl font-bold mb-6">
                        Add New Room
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        <input
                            type="text"
                            name="title"
                            placeholder="Room Title"
                            value={form.title}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            disabled
                            className="border p-3 rounded-lg bg-gray-100"
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Location (Prem Nagar, Moti Nagar...)"
                            value={form.location}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        {/* ROOM TYPE UI */}

                        <div className="col-span-2">

                            <label className="font-semibold mb-2 block">
                                Select Room Type
                            </label>

                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">

                                {roomTypes.map((type) => (

                                    <div
                                        key={type}
                                        onClick={() => handleRoomType(type)}
                                        className={`cursor-pointer text-center border rounded-lg p-3 font-medium transition 
                                        
                                        ${form.room_type === type
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white hover:bg-gray-100"
                                            }`}
                                    >

                                        {type}

                                    </div>

                                ))}

                            </div>

                            {/* CUSTOM TYPE INPUT */}

                            {form.room_type === "" && (

                                <input
                                    type="text"
                                    placeholder="Enter custom room type (Example: Lodge, Dormitory)"
                                    value={customType}
                                    onChange={(e) => setCustomType(e.target.value)}
                                    className="border p-3 rounded-lg mt-3 w-full"
                                    required
                                />

                            )}

                        </div>

                        <label className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                name="furnished"
                                checked={form.furnished}
                                onChange={handleChange}
                            />

                            Furnished

                        </label>

                        <textarea
                            name="description"
                            placeholder="Room Description"
                            value={form.description}
                            onChange={handleChange}
                            className="border p-3 rounded-lg col-span-2"
                        />

                        {/* IMAGE UPLOAD */}

                        <div className="col-span-2">

                            <label className="font-medium mb-2 block">
                                Room Images (Max 5)
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImages}
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                            >

                                <Upload size={18} />
                                Add Images

                            </button>

                        </div>

                        {/* IMAGE PREVIEW */}

                        {preview.length > 0 && (

                            <div className="col-span-2 grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">

                                {preview.map((img, index) => (

                                    <div
                                        key={index}
                                        className="relative"
                                    >

                                        <img
                                            src={img}
                                            alt="preview"
                                            className="h-32 w-full object-cover rounded-lg"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-black text-white rounded-full p-1"
                                        >

                                            <X size={16} />

                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}

                        <button
                            type="submit"
                            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
                        >

                            {loading ? "Uploading..." : "Add Room"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default AddRoom;