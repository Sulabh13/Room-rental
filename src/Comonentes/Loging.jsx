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

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#000">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83"/>
  </svg>
);

const Loging = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #d0eaf8 0%, #b8d9f0 40%, #c5e2f5 100%)" }}>

      <CloudSVG />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="rounded-3xl px-8 py-9 shadow-xl"
          style={{
            background: "rgba(240, 250, 255, 0.72)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.7)"
          }}>

          <h1 className="text-center text-xl font-bold text-gray-900 mb-2">
            Sign in to your account
          </h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            Welcome back! Please enter your email and password to continue.
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          {/* Password */}
          <div className="relative mb-2">
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

          <div className="flex justify-end mb-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 rounded-xl text-white font-semibold bg-black hover:opacity-90">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="flex justify-center gap-5">
            <button className="w-11 h-11 bg-white rounded-xl shadow border flex items-center justify-center">
              <GoogleIcon />
            </button>

            <button className="w-11 h-11 bg-white rounded-xl shadow border flex items-center justify-center">
              <FacebookIcon />
            </button>

            <button className="w-11 h-11 bg-white rounded-xl shadow border flex items-center justify-center">
              <AppleIcon />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Loging;