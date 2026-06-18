import { useRef, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const ProfileForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async () => {
    try {
      const res = await API.put("/users/profile", {
        name: form.name,
        email: form.email,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navbar / Header update trigger
      window.dispatchEvent(new Event("loginStateChange"));

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile update failed");
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) {
      return toast.error("Please select an image");
    }

    setUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const formData = new FormData();

      formData.append("profile_image", profileImage);

      const res = await API.put("/users/profile-image", formData);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.dispatchEvent(new Event("loginStateChange"));

      toast.success("Profile image updated", {
        id: toastId,
      });

      setProfileImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Image upload failed", {
        id: toastId,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-5">Update Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Profile Image
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="w-full border p-2 rounded"
          />

          <button
            type="button"
            onClick={uploadProfileImage}
            disabled={uploading}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading Image..." : "Upload Image"}
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={updateProfile}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
