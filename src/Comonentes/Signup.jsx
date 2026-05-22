import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye, EyeOff, Mail, Lock, User, Phone, ChevronRight,
  Loader2, CheckCircle2,
} from "lucide-react";
import styles from "./Signup.module.css";

/* ── Password strength helpers ── */
const STRENGTH_LABEL = ["", "Weak", "Good", "Strong"];
const STRENGTH_COLOR = ["", "#ef4444", "#f97316", "#22c55e"];

function getStrength(pwd) {
  if (pwd.length === 0) return 0;
  if (pwd.length < 6)  return 1;
  if (pwd.length < 10) return 2;
  return 3;
}

/* ── Step data ── */
const STEPS = [
  { n: "1", title: "Create your account",    desc: "Fill in your basic details — takes less than 2 minutes." },
  { n: "2", title: "Browse listings",         desc: "Explore verified rooms across your city with photos and pricing." },
  { n: "3", title: "Connect with owners",     desc: "Chat directly and schedule visits at your convenience." },
  { n: "4", title: "Move in!",               desc: "Confirm your room and settle into your new home." },
];

/* ── Home icon (inline SVG) ── */
function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

/* ── Alert icon (inline SVG) ── */
function AlertIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8"  x2="12"    y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [success, setSuccess]           = useState(false);
  const [formData, setFormData]         = useState({
    name: "", email: "", password: "", phone: "", role: "user",
  });

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/register", formData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength      = getStrength(formData.password);
  const strengthLabel = STRENGTH_LABEL[strength];
  const strengthColor = STRENGTH_COLOR[strength];

  return (
    <div className={styles.root}>

      {/* ══ LEFT PANEL ══ */}
      <div className={styles.left}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />

        {/* Logo */}
        <div className={styles.leftLogo}>
          <span className={styles.logoDot} />
          <span className={styles.logoText}>Room<em>Finder</em></span>
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          {STEPS.map((s) => (
            <div className={styles.step} key={s.n}>
              <div className={styles.stepLine} />
              <div className={styles.stepNum}>{s.n}</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>{s.title}</div>
                <div className={styles.stepDesc}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote + stats */}
        <div>
          <div className={styles.leftQuote}>
            Find your <em>perfect</em><br />room today
          </div>
          <div className={styles.leftQuoteSub}>
            Join thousands of happy tenants who found their home on RoomFinder.
          </div>
          <div className={styles.miniStats}>
            {[["2K+", "Listings"], ["500+", "Tenants"], ["50+", "Cities"]].map(([n, l]) => (
              <div className={styles.miniStat} key={l}>
                <div className={styles.miniStatN}>{n}</div>
                <div className={styles.miniStatL}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div className={styles.right}>
        <div className={styles.dotGrid} />

        <div className={styles.wrap}>

          {/* Logo */}
          <div className={styles.logo}>
            <span className={styles.logoDot} />
            <span className={styles.logoText}>Room<em>Finder</em></span>
          </div>

          <h1 className={styles.h1}>
            Create your<br /><em>account</em>
          </h1>
          <p className={styles.sub}>Join us and find the perfect room for you.</p>

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
              <HomeIcon />
              Owner
            </button>
          </div>

          {/* Success state */}
          {success && (
            <div className={styles.success}>
              <CheckCircle2 size={28} className={styles.successIcon} />
              <span>Account created successfully!<br />Redirecting to login…</span>
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleSubmit}>
              <div className={styles.fields}>

                {/* Name + Phone */}
                <div className={styles.grid2}>
                  <div className={styles.field} style={{ "--d": "0.45s" }}>
                    <User className={styles.fieldIcon} size={15} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      className={styles.input}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className={styles.field} style={{ "--d": "0.5s" }}>
                    <Phone className={styles.fieldIcon} size={15} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      className={styles.input}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className={styles.field} style={{ "--d": "0.55s" }}>
                  <Mail className={styles.fieldIcon} size={15} />
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
                <div>
                  <div className={styles.field} style={{ "--d": "0.6s" }}>
                    <Lock className={styles.fieldIcon} size={15} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className={`${styles.input} ${styles.inputPwdPad}`}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className={styles.eye}
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {formData.password.length > 0 && (
                    <div className={styles.strength}>
                      <div className={styles.strengthBars}>
                        {[1, 2, 3].map((lvl) => (
                          <div
                            key={lvl}
                            className={styles.bar}
                            style={{ background: strength >= lvl ? strengthColor : "#ede8e2" }}
                          />
                        ))}
                      </div>
                      <span
                        className={styles.strengthLabel}
                        style={{ color: strengthColor }}
                      >
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className={styles.error}>
                  <AlertIcon />
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className={styles.submit}
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 size={16} className={styles.spin} /> Creating account…</>
                ) : (
                  <>Create Account <ChevronRight size={16} /></>
                )}
              </button>

              <p className={styles.terms}>
                By signing up you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            </form>
          )}

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.divLine} />
            <span className={styles.divTxt}>Already have an account?</span>
            <div className={styles.divLine} />
          </div>

          <div className={styles.loginLink}>
            Already a member?
            <Link to="/login">Sign in →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;