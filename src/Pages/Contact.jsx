import { useState } from "react";

const ROOM_TYPES = [
  "single",
  "double",
  "family",
  "1bhk",
  "2bhk",
  "3bhk",
  "pg",
  "hostel",
  "boy",
  "girl"
];

const BUDGETS = [
  "₹1000 - ₹3000",
  "₹3000 - ₹5000",
  "₹5000 - ₹8000",
  "₹8000 - ₹12000",
  "₹12000+"
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
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.roomType) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] font-sans">

      {/* SAME STYLE (NO CHANGE) */}
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

  * { font-family: 'Jost', sans-serif; }
  .serif { font-family: 'Playfair Display', serif; }

  .hero-bg {
    background-image: url('https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1600&q=80');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`}</style>

      {/* HERO (ONLY TEXT UPDATED) */}
      <div className="hero-bg relative text-white overflow-hidden" style={{ minHeight: "340px" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/65 to-stone-900/90"></div>

        <div className="relative z-10 px-6 py-16 text-center max-w-3xl mx-auto">
          <span className="inline-block bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-5">
            🏠 Room Rentals · Balaghat
          </span>

          <h1 className="serif text-5xl md:text-7xl leading-tight mb-5">
            Find Your<br />
            <em className="text-amber-400">Perfect Room</em>
          </h1>

          <p className="text-stone-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Verified rooms in Prem Nagar, Moti Nagar, Garra, Bhatera and more.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* LEFT SIDE UPDATED CONTENT */}
        <aside className="lg:col-span-2 flex flex-col gap-4">

          <div>
            <h2 className="serif text-2xl text-stone-800">
              We're always here for you.
            </h2>
          </div>

          {/* LOCATION */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="font-semibold">📍 Location</p>
            <p className="text-stone-600">Balaghat, Madhya Pradesh</p>
            <p className="text-xs text-gray-400">
              Excellup, Gondia - Balaghat Rd, Sindhi Mohalla, Azad Chowk, Balaghat, Madhya Pradesh 481001
            </p>
          </div>

          {/* PHONE */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="font-semibold">📞 Phone</p>
            <p className="text-stone-600">+91 9876543210</p>
          </div>

          {/* EMAIL */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="font-semibold">✉️ Email</p>
            <p className="text-stone-600">support@roomfinder.com</p>
          </div>

        </aside>

        {/* RIGHT FORM (UI SAME, FIELD UPDATED) */}

        <div className="lg:col-span-3">

          {submitted ? (

            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-bold mb-3">
                Request Sent ✅
              </h2>

              <p>
                Thanks {form.name}, we will contact you soon.
              </p>

            </div>

          ) : (

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Book Room Inquiry
              </h2>

              <div className="space-y-5">

                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                />

                <input
                  name="phone"
                  placeholder="Phone"
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

                {/* NEW LOCATION FIELD */}
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
                  <option value="">Room Type</option>
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

                <textarea
                  name="message"
                  placeholder="Requirements..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-3 rounded"
                >
                  Send Inquiry
                </button>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}