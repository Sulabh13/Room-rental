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
      console.log(res.data);

      const token = res.data.token;
      const user = res.data.user;

      const role = user.role;   // ✔ correct role

      // const res = await API.post("/auth/login", formData);


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      // localStorage.setItem("token", res.data.accessToken);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      // localStorage.setItem("role", res.data.user.role);
      // localStorage.setItem("refreshToken", res.data.refreshToken);

      alert("Login successful");

      if (role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/wishlist");
      }

    } catch (error) {

      alert(error.response?.data?.message || "Login failed");

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow w-96 space-y-4">

        <h2 className="text-xl font-bold text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          onChange={handleChange}
        />

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />

          <button
            type="button"
            className="absolute right-3 top-3 text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        <select
          name="role"
          className="w-full p-3 border rounded"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </select>

        <button className="w-full bg-black text-white p-3 rounded">
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account?
          <Link to="/signup" className="ml-1 text-blue-600">
            Sign up
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;