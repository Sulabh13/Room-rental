import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoInputRef = useRef();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    location: "",
    room_type: "",
    furnished: false,
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  /* ================= FETCH ROOM ================= */
  const fetchRoom = async () => {
    try {
      const res = await API.get(`/rooms/${id}`);   // ✅ FIXED
      const room = res.data;

      setForm({
        title: room.title || "",
        description: room.description || "",
        price: room.price || "",
        city: room.city || "",
        location: room.location || "",
        room_type: room.room_type || "",
        furnished: room.furnished || false,
      });

      setExistingImages(room.images || []);
      if (room.video_url) setVideoPreview(room.video_url);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const removeVideo = () => {
    setVideo(null);
    setVideoPreview("");
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  /* ================= SUBMIT UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => formData.append("images", img));
      if (video) formData.append("video", video);

      const res = await API.put(`/rooms/${id}`, formData, {   // ✅ FIXED
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Room updated successfully");
      navigate("/my-rooms");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Room update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white w-full max-w-4xl p-6 rounded-2xl shadow">
        <h2 className="text-3xl font-bold mb-6">Update Room</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-3 rounded-xl"/>
          <textarea name="description" rows={4} value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-3 rounded-xl"/>
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-3 rounded-xl"/>
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full border p-3 rounded-xl"/>
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-3 rounded-xl"/>

          <select name="room_type" value={form.room_type} onChange={handleChange} className="w-full border p-3 rounded-xl">
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Family">Family</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
          </select>

          <label className="flex gap-3 items-center">
            <input type="checkbox" name="furnished" checked={form.furnished} onChange={handleChange}/>
            Furnished
          </label>

          <input type="file" multiple accept="image/*" onChange={handleImages}/>
          <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideo}/>

          {videoPreview && <video src={videoPreview} controls className="w-full mt-4 rounded-xl"/>}

          <button disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full">
            {loading ? "Updating..." : "Update Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;