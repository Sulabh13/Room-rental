import { useState } from "react";
import API from "../api/axios";

const ProfileForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: user?.image || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.put("/users/profile", formData);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Profile Updated Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // temp use
  useEffect(() => {
    const testProfile = async () => {
      try {
        const res = await API.get("/users/profile");

        console.log("PROFILE:", res.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    testProfile();
  }, []);

  return (
    <form onSubmit={updateProfile} className="space-y-4">
      <h2 className="text-xl font-bold">Update Profile</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="text"
        name="image"
        placeholder="Profile Image URL"
        value={formData.image}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
