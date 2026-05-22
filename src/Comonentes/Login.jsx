import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ChevronRight, Loader2 } from "lucide-react";
import styles from "./Login.module.css";

// ── Reviews data (rotate automatically) ──────────────────────────────────────
const REVIEWS = [
  {
    text: '"Found my perfect room in Bhopal within 2 days. The process was so smooth!"',
    initials: "AK",
    name: "Ankit Kumar",
    role: "Tenant · Bhopal",
  },
  {
    text: '"Best rental platform I have used. Very transparent listings and fast responses."',
    initials: "PS",
    name: "Priya Sharma",
    role: "Tenant · Indore",
  },
  {
    text: '"Listed my property and got a verified tenant within a week. Highly recommended!"',
    initials: "RV",
    name: "Rahul Verma",
    role: "Owner · Bhopal",
  },
  {
    text: '"The owner dashboard is super easy to use. Managing rooms has never been simpler."',
    initials: "NJ",
    name: "Neha Joshi",
    role: "Owner · Jabalpur",
  },
];

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [formData, setFormData]         = useState({ email: "", password: "", role: "user" });

  // Review carousel state
  const [reviewIdx, setReviewIdx]   = useState(0);
  const [fading, setFading]         = useState(false);

  // Auto-rotate reviews every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setReviewIdx((prev) => (prev + 1) % REVIEWS.length);
        setFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToReview = (idx) => {
    if (idx === reviewIdx) return;
    setFading(true);
    setTimeout(() => {
      setReviewIdx(idx);
      setFading(false);
    }, 400);
  };

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", formData);
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      window.dispatchEvent(new Event("loginStateChange"));
      const redirectTo = location.state?.redirect;
      if (redirectTo) {
        navigate(redirectTo);
      } else if (user.role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/wishlist");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const review = REVIEWS[reviewIdx];

  return (
    <div className={styles.root}>
      <div className={styles.inner}>

      {/* ── LEFT PANEL ── */}
      <div className={styles.left}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />

        {/* Top logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className={styles.logoDot} />
          <span className={styles.logoText}>Room<em>Finder</em></span>
        </div>

        {/* Centre illustration */}
        <div className={styles.illustration}>
          <svg width="200" height="200" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="260" height="260" rx="24" fill="#fff8f3"/>
            <circle cx="210" cy="48" r="22" fill="#fef3c7"/>
            <circle cx="210" cy="48" r="14" fill="#fbbf24"/>
            <ellipse cx="60" cy="55" rx="28" ry="14" fill="#fff" opacity="0.8"/>
            <ellipse cx="80" cy="50" rx="20" ry="12" fill="#fff" opacity="0.9"/>
            <ellipse cx="160" cy="72" rx="22" ry="11" fill="#fff" opacity="0.7"/>
            <rect x="0" y="195" width="260" height="65" rx="0" fill="#fef9f4"/>
            <rect x="0" y="195" width="260" height="4" fill="#fde8d4"/>
            <rect x="60" y="130" width="140" height="80" rx="4" fill="#fff" stroke="#fbd5b5" strokeWidth="1.5"/>
            <polygon points="50,132 130,72 210,132" fill="#f97316"/>
            <polygon points="50,132 130,72 210,132" fill="none" stroke="#ea6d0e" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="130" y1="72" x2="130" y2="80" stroke="#ea6d0e" strokeWidth="2" strokeLinecap="round"/>
            <rect x="108" y="162" width="44" height="48" rx="6" fill="#fbd5b5" stroke="#f97316" strokeWidth="1.5"/>
            <circle cx="146" cy="188" r="3" fill="#f97316"/>
            <rect x="72" y="148" width="30" height="26" rx="4" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1.5"/>
            <line x1="87" y1="148" x2="87" y2="174" stroke="#bae6fd" strokeWidth="1"/>
            <line x1="72" y1="161" x2="102" y2="161" stroke="#bae6fd" strokeWidth="1"/>
            <rect x="158" y="148" width="30" height="26" rx="4" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="1.5"/>
            <line x1="173" y1="148" x2="173" y2="174" stroke="#bae6fd" strokeWidth="1"/>
            <line x1="158" y1="161" x2="188" y2="161" stroke="#bae6fd" strokeWidth="1"/>
            <path d="M108 210 Q90 220 80 240" stroke="#fbd5b5" strokeWidth="8" strokeLinecap="round" fill="none"/>
            <path d="M152 210 Q170 220 180 240" stroke="#fbd5b5" strokeWidth="8" strokeLinecap="round" fill="none"/>
            <rect x="28" y="178" width="6" height="20" rx="2" fill="#d6b896"/>
            <ellipse cx="31" cy="172" rx="16" ry="18" fill="#86efac"/>
            <ellipse cx="31" cy="168" rx="11" ry="14" fill="#4ade80"/>
            <rect x="224" y="182" width="6" height="16" rx="2" fill="#d6b896"/>
            <ellipse cx="227" cy="177" rx="14" ry="15" fill="#86efac"/>
            <ellipse cx="227" cy="173" rx="9" ry="12" fill="#4ade80"/>
            <circle cx="95" cy="197" r="4" fill="#fb923c" opacity="0.7"/>
            <circle cx="165" cy="197" r="3" fill="#fb923c" opacity="0.6"/>
            <circle cx="85" cy="203" r="2.5" fill="#fbbf24" opacity="0.8"/>
          </svg>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNum}>2K+</div>
            <div className={styles.statLabel}>Listings</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>500+</div>
            <div className={styles.statLabel}>Happy tenants</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>5★</div>
            <div className={styles.statLabel}>Avg rating</div>
          </div>
        </div>

        {/* Auto-rotating Testimonial */}
        <div className={`${styles.testimonial} ${fading ? styles.testimonialFading : styles.testimonialVisible}`}>
          <div className={styles.stars}>★★★★★</div>
          <p className={styles.testText}>{review.text}</p>
          <div className={styles.testAuthor}>
            <div className={styles.avatar}>{review.initials}</div>
            <div>
              <div className={styles.authorName}>{review.name}</div>
              <div className={styles.authorRole}>{review.role}</div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className={styles.reviewDots}>
          {REVIEWS.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === reviewIdx ? styles.dotActive : ""}`}
              onClick={() => goToReview(i)}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className={styles.right}>
        <div className={styles.dotgrid} />

        <div className={styles.formWrap}>

          {/* Logo */}
          <div className={styles.logo}>
            <span className={styles.logoDot} />
            <span className={styles.logoText}>Room<em>Finder</em></span>
          </div>

          <h1 className={styles.h1}>
            Sign in to your<br /><em>account</em>
          </h1>
          <p className={styles.sub}>Welcome back! Enter your details below.</p>

          {/* Role toggle */}
          <div className={styles.roleWrap}>
            <button
              type="button"
              className={`${styles.roleBtn} ${formData.role === "user" ? styles.active : ""}`}
              onClick={() => setFormData({ ...formData, role: "user" })}
            >
              <User size={14} />
              User
            </button>
            <button
              type="button"
              className={`${styles.roleBtn} ${formData.role === "owner" ? styles.active : ""}`}
              onClick={() => setFormData({ ...formData, role: "owner" })}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Owner
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.fields}>
              {/* Email */}
              <div className={styles.field} style={{ "--d": "0.5s" }}>
                <Mail className={styles.fieldIcon} size={16} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={styles.input}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className={styles.field} style={{ "--d": "0.56s" }}>
                <Lock className={styles.fieldIcon} size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                  style={{ paddingRight: "44px" }}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eye}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.error}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? (
                <><Loader2 size={16} className={styles.spin} /> Signing in...</>
              ) : (
                <>Sign In <ChevronRight size={16} /></>
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <div className={styles.divLine} />
            <span className={styles.divTxt}>New here?</span>
            <div className={styles.divLine} />
          </div>

          <div className={styles.signup}>
            Don't have an account?
            <Link to="/signup">Create one →</Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Login;