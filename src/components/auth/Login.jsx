import { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/login", formData);

      const role = res.data.user.role;

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", role);

      window.dispatchEvent(new Event("loginStateChange"));

      alert("Login Successful");

      if (role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/wishlist");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google-login", {
        credential: credentialResponse.credential,
        role: formData.role,
      });

      const role = res.data.user.role;

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", role);

      window.dispatchEvent(new Event("loginStateChange"));

      alert("Google Login Successful");

      if (role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/wishlist");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full p-3 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            className="w-full p-3 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="absolute right-3 top-3 text-sm text-blue-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Role Selection */}
        <select
          name="role"
          className="w-full p-3 border rounded"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </select>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google Login */}
        <div>
          <p className="text-center text-sm text-gray-600 mb-3">
            Select role above and continue with Google
          </p>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                alert("Google Login Failed");
              }}
            />
          </div>
        </div>

        {/* Signup */}
        <p className="text-sm text-center">
          Don't have an account?
          <Link to="/signup" className="ml-1 text-blue-600 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
