import { useState } from "react";
import emailjs from "@emailjs/browser";
import { MdLocationPin } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import styles from "./Contact.module.css";

const SERVICE_ID = "service_q4h1fwd";
const TEMPLATE_ID = "template_pyqexko";
const PUBLIC_KEY = "e2m9r4Gb8s8U3p-LM";

const ROOM_TYPES = [
  "single", "double", "family", "1bhk", "2bhk", "3bhk", "pg", "hostel", "boy", "girl",
];

const BUDGETS = [
  "₹1000 - ₹3000",
  "₹3000 - ₹5000",
  "₹5000 - ₹8000",
  "₹8000 - ₹12000",
  "₹12000+",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    roomType: "",
    budget: "",
    moveIn: "",
    location: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.roomType) {
      setError("Name, Phone, and Room Type are required!");
      return;
    }
    setLoading(true);
    setError("");
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      .then(() => {
        setSubmitted(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("❌ The email was not sent. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className={`min-h-screen bg-[#F7F4EF] font-sans ${styles.contactRoot}`}>

      {/* ── HERO ── */}
      <div
        className={`${styles.heroBg} relative text-white overflow-hidden`}
        style={{ minHeight: "540px", paddingTop: "60px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/65 to-stone-900/90" />

        <div className="relative z-10 px-6 py-16 text-center max-w-3xl mx-auto">

          {/* Badge */}
          <div className={`${styles.animBadge} flex justify-center mb-5`}>
            <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">
              <span className={styles.pulseDot} />
              Room Rentals · Balaghat
            </span>
          </div>

          {/* Title */}
          <div className={`${styles.animTitle} text-center mb-4`}>
            <h1 className="display text-5xl md:text-7xl font-extrabold font-normal text-white leading-tight tracking-tight">
              Find Your
              <br />
              <span className={`${styles.shimmerText} font-normal`}>
                Perfect Room
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className={`${styles.animSub} text-stone-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed`}>
            Verified rooms in Prem Nagar, Moti Nagar, Garra, Bhatera and more.
          </p>

        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* LEFT SIDE */}
        <aside className="lg:col-span-2 flex flex-col gap-4">
          <div>
            <h2 className={`${styles.serif} text-2xl text-stone-800`}>
              We're always here for you.
            </h2>
          </div>

          {/* Location Card */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex items-center gap-2 font-semibold">
              <MdLocationPin className="text-red-500 text-xl" />
              <p>Location</p>
            </div>
            <p className="text-stone-600 mt-2">Balaghat, Madhya Pradesh</p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Excellup, Gondia - Balaghat Rd, Sindhi Mohalla, Azad Chowk,
              Balaghat, Madhya Pradesh 481001
            </p>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex items-center gap-2 font-semibold">
              <IoCallSharp className="text-green-600 text-lg" />
              <p>Phone</p>
            </div>
            <p className="text-stone-600 mt-2">+91 9302771235</p>
          </div>

          {/* ── MAP CARD ── */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex items-center gap-2 font-semibold mb-3">
              <MdLocationPin className="text-red-500 text-xl" />
              <p>Find Us on Map</p>
            </div>
            <div className="rounded-lg overflow-hidden border border-stone-200">
              <iframe
                title="RoomFinder Balaghat Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.847!2d80.18173!3d21.83105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a27b3b3b3b3b3b3%3A0x0!2sAzad+Chowk%2C+Balaghat%2C+Madhya+Pradesh+481001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Azad+Chowk,Balaghat,Madhya+Pradesh+481001"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1 text-sm text-amber-600 font-medium hover:text-amber-700 transition-colors"
            >
              <MdLocationPin className="text-base" />
              Open in Google Maps ↗
            </a>
          </div>

        </aside>

        {/* RIGHT FORM */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-3">Request Sent ✅</h2>
              <p className="text-stone-600">
                Thanks <strong>{form.name}</strong>, we will contact you soon on{" "}
                <strong>{form.phone}</strong>.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Book Room Inquiry</h2>

              <div className="space-y-5">
                <input
                  name="name"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                />

                <input
                  name="phone"
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                />

                <input
                  name="location"
                  placeholder="Preferred Location (e.g. Garra)"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                />

                <select
                  name="roomType"
                  value={form.roomType}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                >
                  <option value="">Room Type *</option>
                  {ROOM_TYPES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>

                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                >
                  <option value="">Budget</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>

                <input
                  type="date"
                  name="moveIn"
                  value={form.moveIn}
                  onChange={handleChange}
                  className="w-full border p-3 rounded text-stone-500"
                />

                <textarea
                  name="message"
                  placeholder="Requirements..."
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded disabled:opacity-50 hover:bg-amber-500 transition-colors duration-300"
                >
                  {loading ? "⏳ Sending..." : "Send Inquiry"}
                </button>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}