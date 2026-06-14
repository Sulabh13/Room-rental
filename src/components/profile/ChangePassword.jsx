import { useState } from "react";
import API from "../api/axios";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await API.put("/users/change-password", {
        currentPassword: formData.currentPassword,

        newPassword: formData.newPassword,
      });

      alert(res.data.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={changePassword} className="space-y-4">
      <h2 className="text-xl font-bold">Change Password</h2>

      <input
        type="password"
        name="currentPassword"
        placeholder="Current Password"
        value={formData.currentPassword}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePassword;
