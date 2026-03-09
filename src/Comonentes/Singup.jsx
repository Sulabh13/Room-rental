import React, { useState } from "react";

const CloudSVG = () => (
  <svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full opacity-60">
    <defs>
      <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#c8e8f8" />
        <stop offset="100%" stopColor="#a8d4f0" />
      </radialGradient>
    </defs>
    <rect width="800" height="300" fill="url(#skyGrad)" />
    <ellipse cx="120" cy="230" rx="90" ry="40" fill="white" opacity="0.85" />
    <ellipse cx="180" cy="210" rx="70" ry="50" fill="white" opacity="0.9" />
    <ellipse cx="60" cy="240" rx="60" ry="30" fill="white" opacity="0.8" />
  </svg>
);

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #d0eaf8 0%, #b8d9f0 40%, #c5e2f5 100%)",
      }}
    >
      <CloudSVG />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div
          className="rounded-3xl px-8 py-9 shadow-xl"
          style={{
            background: "rgba(240, 250, 255, 0.72)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.7)",
          }}
        >
          <h1 className="text-center text-xl font-bold text-gray-900 mb-2">
            Create your account
          </h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            Join us today and start finding the perfect room for you.
          </p>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-2.5 text-sm text-gray-500"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Signup Button */}
          <button className="w-full py-3 rounded-xl text-white font-semibold bg-black hover:opacity-90">
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-black font-semibold">
              Login
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or sign up with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="flex justify-center gap-5">
            <button className="w-11 h-11 bg-white rounded-xl shadow border flex items-center justify-center">
              G
            </button>

            <button className="w-11 h-11 bg-white rounded-xl shadow border flex items-center justify-center">
              F
            </button>

            <button className="w-11 h-11 bg-white rounded-xl shadow border flex items-center justify-center">
              A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;