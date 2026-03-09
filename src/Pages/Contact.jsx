import { useState } from "react";

const ROOM_TYPES = ["Single Room", "Double Room", "Studio Apartment", "Shared Room", "PG Accommodation"];
const BUDGETS = ["₹3,000 - ₹5,000", "₹5,000 - ₹8,000", "₹8,000 - ₹12,000", "₹12,000 - ₹18,000", "₹18,000+"];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", roomType: "", budget: "", moveIn: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.roomType) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
        * { font-family: 'Jost', sans-serif; }
        .serif { font-family: 'Playfair Display', serif; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.93); }
          to { opacity: 1; transform: scale(1); }
        }
        .slide-up { animation: slideUp 0.65s ease forwards; }
        .d1 { animation-delay: 0.05s; opacity: 0; }
        .d2 { animation-delay: 0.18s; opacity: 0; }
        .d3 { animation-delay: 0.3s; opacity: 0; }
        .d4 { animation-delay: 0.42s; opacity: 0; }
        .scale-in { animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        input, select, textarea { outline: none; transition: all 0.2s ease; }
        input:focus, select:focus, textarea:focus { box-shadow: 0 0 0 2px #C9A96E; }
        .hero-bg {
          background-image: url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600&q=80');
          background-size: cover;
          background-position: center;
        }
        .info-icon { transition: transform 0.3s ease; }
        .info-card:hover .info-icon { transform: scale(1.13) rotate(-5deg); }
      `}</style>

      {/* HERO with BG IMAGE */}
      <div className="hero-bg relative text-white overflow-hidden" style={{minHeight: "340px"}}>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/65 to-stone-900/90"></div>
        <div className="absolute top-8 right-16 w-40 h-40 rounded-full bg-amber-500/20 blur-3xl"></div>
        <div className="absolute bottom-4 left-10 w-32 h-32 rounded-full bg-amber-400/15 blur-2xl"></div>

        <div className="relative z-10 px-6 py-16 text-center max-w-3xl mx-auto">
          <span className="inline-block bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-5 slide-up d1">
            🏠 Room Rentals · Bhopal
          </span>
          <h1 className="serif text-5xl md:text-7xl leading-tight mb-5 slide-up d2">
            Find Your<br /><em className="text-amber-400">Perfect Room</em>
          </h1>
          <p className="text-stone-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed slide-up d3">
            Tell us what you need — we'll match you with the best rooms in your budget and preferred location.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8 slide-up d4">
            {["200+ Rooms Listed", "Bhopal's #1 Rental", "Verified Owners"].map((s) => (
              <span key={s} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs px-4 py-2 rounded-full font-medium">
                ✦ {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* LEFT — CONTACT INFO */}
        <aside className="lg:col-span-2 flex flex-col gap-4">
          <div className="mb-1">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Reach Us</p>
            <h2 className="serif text-2xl text-stone-800">We're always<br /><em>here for you.</em></h2>
          </div>

          {/* Location */}
          <div className="info-card bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="flex items-stretch">
              <div className="bg-amber-500 w-1.5 shrink-0 rounded-l-2xl"></div>
              <div className="flex items-center gap-4 px-5 py-4 w-full">
                <div className="info-icon w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl shrink-0">📍</div>
                <div>
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-0.5">Location</p>
                  <p className="text-stone-900 font-semibold text-sm">Bhopal, Madhya Pradesh</p>
                  <p className="text-stone-400 text-xs mt-0.5">MP Nagar · Arera Colony · Kolar Road</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="info-card bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="flex items-stretch">
              <div className="bg-green-500 w-1.5 shrink-0 rounded-l-2xl"></div>
              <div className="flex items-center gap-4 px-5 py-4 w-full">
                <div className="info-icon w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl shrink-0">📞</div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-0.5">Phone</p>
                  <p className="text-stone-900 font-semibold text-sm">+91 98765 43210</p>
                  <p className="text-stone-400 text-xs mt-0.5">Mon–Sat · 9 AM – 7 PM</p>
                </div>
                <a href="tel:+919876543210" className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-green-600 transition-colors shrink-0">
                  Call
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="info-card bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="flex items-stretch">
              <div className="bg-blue-500 w-1.5 shrink-0 rounded-l-2xl"></div>
              <div className="flex items-center gap-4 px-5 py-4 w-full">
                <div className="info-icon w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shrink-0">✉️</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-stone-900 font-semibold text-sm truncate">rooms@nestaway.in</p>
                  <p className="text-stone-400 text-xs mt-0.5">Reply within 24 hours</p>
                </div>
                <a href="mailto:rooms@nestaway.in" className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors shrink-0">
                  Mail
                </a>
              </div>
            </div>
          </div>

          {/* Visit Hours */}
          <div className="info-card bg-stone-900 rounded-2xl border border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="flex items-stretch">
              <div className="bg-amber-400 w-1.5 shrink-0 rounded-l-2xl"></div>
              <div className="flex items-center gap-4 px-5 py-4 w-full">
                <div className="info-icon w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center text-2xl shrink-0">🕐</div>
                <div>
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-0.5">Visit Hours</p>
                  <p className="text-white font-semibold text-sm">10 AM – 6 PM</p>
                  <p className="text-stone-400 text-xs mt-0.5">Monday to Saturday · Walk-ins welcome</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Amenities Included</p>
            <div className="flex flex-wrap gap-2">
              {["WiFi", "AC", "Parking", "Laundry", "CCTV", "Power Backup", "Kitchen", "24/7 Water"].map((a) => (
                <span key={a} className="bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-full font-medium border border-amber-100 hover:bg-amber-100 transition-colors cursor-default">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm h-36 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-100 to-stone-200 flex flex-col items-center justify-center gap-2">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🗺️</span>
              <p className="text-stone-600 text-xs font-semibold">MP Nagar, Bhopal</p>
              <button className="bg-stone-900 text-white text-xs px-4 py-2 rounded-full hover:bg-amber-600 transition-colors font-medium">
                Open in Maps →
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT — FORM */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="bg-white rounded-3xl border border-stone-100 shadow-lg p-12 text-center scale-in">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">✅</div>
              <h2 className="serif text-3xl text-stone-900 mb-3">Request Sent!</h2>
              <p className="text-stone-500 text-sm max-w-sm mx-auto mb-6">
                Thanks <strong>{form.name}</strong>! We've received your inquiry. Our team will call you at <strong>{form.phone}</strong> within a few hours.
              </p>
              <div className="bg-stone-50 rounded-2xl p-5 text-left mb-6 space-y-2.5">
                {[["Room Type", form.roomType], ["Budget", form.budget || "Not specified"], ["Move-in Date", form.moveIn || "Flexible"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm border-b border-stone-100 pb-2 last:border-0 last:pb-0">
                    <span className="text-stone-400">{k}</span>
                    <span className="text-stone-800 font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", roomType: "", budget: "", moveIn: "", message: "" }); }}
                className="bg-stone-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-amber-600 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-100 shadow-lg p-7 md:p-10">
              <h2 className="serif text-3xl text-stone-900 mb-1">Book a Room Inquiry</h2>
              <p className="text-stone-400 text-sm mb-8">Fill in the details — we'll get back to you shortly.</p>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Full Name *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                      placeholder="Rahul Sharma"
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-800 bg-stone-50 placeholder-stone-300 ${focused === "name" ? "border-amber-400 bg-white" : "border-stone-200"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange}
                      onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                      placeholder="+91 XXXXX XXXXX"
                      className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-800 bg-stone-50 placeholder-stone-300 ${focused === "phone" ? "border-amber-400 bg-white" : "border-stone-200"}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    name="email" value={form.email} onChange={handleChange}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                    placeholder="rahul@email.com"
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-800 bg-stone-50 placeholder-stone-300 ${focused === "email" ? "border-amber-400 bg-white" : "border-stone-200"}`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Room Type *</label>
                    <select
                      name="roomType" value={form.roomType} onChange={handleChange}
                      onFocus={() => setFocused("roomType")} onBlur={() => setFocused("")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm bg-stone-50 ${form.roomType ? "text-stone-800" : "text-stone-400"} ${focused === "roomType" ? "border-amber-400 bg-white" : "border-stone-200"}`}
                    >
                      <option value="" disabled>Select room type</option>
                      {ROOM_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Monthly Budget</label>
                    <select
                      name="budget" value={form.budget} onChange={handleChange}
                      onFocus={() => setFocused("budget")} onBlur={() => setFocused("")}
                      className={`w-full border rounded-xl px-4 py-3 text-sm bg-stone-50 ${form.budget ? "text-stone-800" : "text-stone-400"} ${focused === "budget" ? "border-amber-400 bg-white" : "border-stone-200"}`}
                    >
                      <option value="" disabled>Select budget range</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Preferred Move-in Date</label>
                  <input
                    type="date" name="moveIn" value={form.moveIn} onChange={handleChange}
                    onFocus={() => setFocused("moveIn")} onBlur={() => setFocused("")}
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-800 bg-stone-50 ${focused === "moveIn" ? "border-amber-400 bg-white" : "border-stone-200"}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Additional Requirements</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                    rows={4}
                    placeholder="E.g., attached bathroom, vegetarian kitchen, near bus stand..."
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-stone-800 bg-stone-50 placeholder-stone-300 resize-none ${focused === "message" ? "border-amber-400 bg-white" : "border-stone-200"}`}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.phone || !form.roomType}
                  className="w-full bg-stone-900 text-white py-4 rounded-xl text-sm font-semibold hover:bg-amber-600 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send Room Inquiry →
                </button>

                <p className="text-center text-xs text-stone-400">
                  🔒 Your details are safe. We never share your information.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}