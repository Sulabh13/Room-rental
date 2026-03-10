import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      alert(error.response?.data?.message || "Login failed");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-300">

      <div className="w-[420px] bg-white/60 backdrop-blur-md shadow-xl rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-600 text-sm mb-6">
          Login to continue and explore available rooms.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-gray-100 outline-none"
            onChange={handleChange}
          />

          {/* Password */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-gray-100 outline-none"
              onChange={handleChange}
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-sm text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {/* Role */}
          <select
            name="role"
            className="w-full p-3 rounded-xl bg-gray-100 outline-none"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>

          {/* Button */}
          <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition">
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-center text-sm mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold">
            Sign Up
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Login;