import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const EditRoom = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        city: "",
        location: "",
        room_type: "",
        furnished: false
    });

    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    /* Fetch Room */

    const fetchRoom = async () => {

        try {

            const res = await API.get(`/rooms/${id}`);

            setForm(res.data);

            setExistingImages(res.data.images || []);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchRoom();

    }, []);

    /* Handle Form */

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });

    };

    /* Handle Image Upload */

    const handleImages = (e) => {

        setImages(e.target.files);

    };

    /* Submit Update */

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("city", form.city);
            formData.append("location", form.location);
            formData.append("room_type", form.room_type);
            formData.append("furnished", form.furnished);

            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }

            await API.put(`/rooms/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Room Updated Successfully");

            navigate("/my-rooms");

        } catch (error) {

            console.log(error);

            alert("Room update failed");

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-8">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">

                <h2 className="text-2xl font-bold mb-6">
                    Update Room
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full border p-3 rounded"
                    />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="w-full border p-3 rounded"
                    />

                    {/* Room Type */}

                    <select
                        name="room_type"
                        value={form.room_type}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    >

                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="family">Family</option>

                    </select>

                    {/* Furnished */}

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            name="furnished"
                            checked={form.furnished}
                            onChange={handleChange}
                        />

                        Furnished

                    </label>

                    {/* Existing Images */}

                    <div>

                        <p className="font-semibold mb-2">
                            Existing Images
                        </p>

                        <div className="grid grid-cols-3 gap-2">

                            {existingImages.map((img, index) => (

                                <img
                                    key={index}
                                    src={img}
                                    className="h-24 w-full object-cover rounded"
                                />

                            ))}

                        </div>

                    </div>

                    {/* Upload New Images */}

                    <input
                        type="file"
                        multiple
                        onChange={handleImages}
                        className="w-full border p-2 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded"
                    >
                        Update Room
                    </button>

                </form>

            </div>

        </div>

    );

};

export default EditRoom;