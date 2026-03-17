import React, { useState, useEffect, useRef } from "react";
import { State, City } from "country-state-city";

const STATS = [
  { end: 10000, suffix: "+", label: "Rooms Listed" },
  { end: 500, suffix: "+", label: "Cities Covered" },
  { end: 50000, suffix: "+", label: "Happy Tenants" },
  { end: 98, suffix: "%", label: "Satisfaction Rate" },
];

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "") + "K";
  return n.toString();
}

function AnimatedStat({ end, suffix, label, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const fps = 60;
          const steps = Math.round((duration / 1000) * fps);
          let step = 0;
          setTimeout(() => {
            const interval = setInterval(() => {
              step++;
              const progress = step / steps;
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(end * eased));
              if (step >= steps) {
                clearInterval(interval);
                setCount(end);
              }
            }, 1000 / fps);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, delay]);

  return (
    <div ref={ref} className="stat-card rounded-xl px-4 py-4 text-center">
      <p className="display text-2xl font-bold text-white tabular-nums">
        {formatNum(count)}{suffix}
      </p>
      <p className="text-white/50 text-xs mt-0.5 font-medium">{label}</p>
    </div>
  );
}

const Hero = () => {
  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [showState, setShowState] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [activeField, setActiveField] = useState("");

  const states = State.getStatesOfCountry("IN");
  const filteredStates = states.filter((s) =>
    s.name.toLowerCase().includes(stateInput.toLowerCase())
  );
  const cities = stateCode ? City.getCitiesOfState("IN", stateCode) : [];
  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().includes(cityInput.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        .hero-root * { font-family: 'Inter', sans-serif; }
        .hero-root .display { font-family: 'Syne', sans-serif; }

        .hero-bg {
          background-image: url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1800&q=85');
          background-size: cover;
          background-position: center 40%;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.94) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(251,191,36,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(251,191,36,0); }
          100% { box-shadow: 0 0 0 0 rgba(251,191,36,0); }
        }

        .anim-badge  { animation: fadeDown 0.6s ease 0.1s  both; }
        .anim-title  { animation: fadeDown 0.7s ease 0.25s both; }
        .anim-sub    { animation: fadeUp  0.7s ease 0.4s   both; }
        .anim-search { animation: scaleUp 0.7s ease 0.55s  both; }
        .anim-stats  { animation: fadeUp  0.7s ease 0.75s  both; }

        .shimmer-text {
          background: linear-gradient(90deg, #fbbf24, #f97316, #fbbf24, #fde68a, #fbbf24);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .search-card {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12);
        }

        .search-field {
          border: 1.5px solid #e5e7eb;
          transition: all 0.25s ease;
          background: #fafafa;
        }
        .search-field:hover  { border-color: #d1d5db; background: #fff; }
        .search-field.active { border-color: #f59e0b; background: #fff; box-shadow: 0 0 0 3px rgba(245,158,11,0.15); }

        .search-btn {
          background: linear-gradient(135deg, #1c1917, #292524);
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .search-btn:hover {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(245,158,11,0.4);
        }

        .stat-card {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }
        .stat-card:hover { background: rgba(255,255,255,0.2); transform: translateY(-3px); }

        .dropdown-list {
          background: white;
          border: 1px solid #f3f4f6;
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          animation: fadeUp 0.2s ease;
        }

        .floating-badge   { animation: float 3s ease-in-out infinite; }
        .floating-badge-2 { animation: float 3s ease-in-out 1.5s infinite; }

        .pulse-dot { animation: pulse-ring 2s infinite; border-radius: 50%; }

        .tabular-nums { font-variant-numeric: tabular-nums; }
      `}</style>

      <section className="hero-root hero-bg relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/85 via-stone-900/75 to-stone-800/70"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-950/60 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating badges */}
        <div className="floating-badge absolute top-28 right-8 hidden lg:flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3">
          <span className="text-xl">🏠</span>
          <div>
            <p className="text-white text-xs font-semibold">New Listing</p>
            <p className="text-white/60 text-[10px]">Balaghat , M.P.</p>
          </div>
        </div>
        <div className="floating-badge-2 absolute bottom-36 left-8 hidden lg:flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3">
          <span className="text-xl">✅</span>
          <div>
            <p className="text-white text-xs font-semibold">Verified Owner</p>
            <p className="text-white/60 text-[10px]">100% Safe & Secure</p>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 py-20 w-full">

          {/* Badge */}
          <div className="anim-badge flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/35 text-amber-300 text-xs font-semibold uppercase tracking-[0.25em] px-5 py-2 rounded-full">
              <span className="pulse-dot w-1.5 h-1.5 bg-amber-400 inline-block"></span>
              India's Trusted Room Rental Platform
            </span>
          </div>

          {/* Heading */}
          <div className="anim-title text-center mb-4">
            <h1 className="display text-5xl md:text-7xl font-800 text-white leading-tight tracking-tight">
              Find Your<br />
              <span className="shimmer-text">Perfect Room</span>
            </h1>
          </div>

          {/* Subtext */}
          <p className="anim-sub text-center text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Search from thousands of verified rooms across every city in India — instantly.
          </p>

          {/* Search Card */}
          <div className="anim-search search-card rounded-2xl p-5 md:p-6 mb-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <p className="text-stone-500 text-xs font-semibold uppercase tracking-widest">Search Rooms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

              {/* State */}
              <div className="relative">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 px-1">
                  <span>📍</span> State
                </label>
                <input
                  type="text" placeholder="Select State" value={stateInput}
                  onFocus={() => { setShowState(true); setActiveField("state"); }}
                  onBlur={() => setTimeout(() => { setShowState(false); setActiveField(""); }, 180)}
                  onChange={(e) => { setStateInput(e.target.value); setShowState(true); }}
                  className={`search-field w-full px-4 py-3 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none ${activeField === "state" ? "active" : ""}`}
                />
                {showState && stateInput && filteredStates.length > 0 && (
                  <ul className="dropdown-list absolute w-full mt-1.5 rounded-xl max-h-44 overflow-y-auto z-30">
                    {filteredStates.slice(0, 8).map((s) => (
                      <li key={s.isoCode} onMouseDown={() => { setStateInput(s.name); setStateCode(s.isoCode); setShowState(false); setCityInput(""); }}
                        className="px-4 py-2.5 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-700 cursor-pointer flex items-center gap-2 transition-colors">
                        <span className="text-xs">📍</span> {s.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* City */}
              <div className="relative">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 px-1">
                  <span>🏙️</span> City
                </label>
                <input
                  type="text" placeholder="Select City" value={cityInput}
                  onFocus={() => { setShowCity(true); setActiveField("city"); }}
                  onBlur={() => setTimeout(() => { setShowCity(false); setActiveField(""); }, 180)}
                  onChange={(e) => { setCityInput(e.target.value); setShowCity(true); }}
                  className={`search-field w-full px-4 py-3 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none ${activeField === "city" ? "active" : ""}`}
                />
                {showCity && cityInput && filteredCities.length > 0 && (
                  <ul className="dropdown-list absolute w-full mt-1.5 rounded-xl max-h-44 overflow-y-auto z-30">
                    {filteredCities.slice(0, 8).map((c) => (
                      <li key={c.name} onMouseDown={() => { setCityInput(c.name); setShowCity(false); }}
                        className="px-4 py-2.5 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-700 cursor-pointer flex items-center gap-2 transition-colors">
                        <span className="text-xs">🏙️</span> {c.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Area */}
              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 px-1">
                  <span>🔍</span> Area
                </label>
                <input
                  type="text" placeholder="Area / Locality" value={areaInput}
                  onFocus={() => setActiveField("area")} onBlur={() => setActiveField("")}
                  onChange={(e) => setAreaInput(e.target.value)}
                  className={`search-field w-full px-4 py-3 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none ${activeField === "area" ? "active" : ""}`}
                />
              </div>

              {/* Button */}
              <div className="flex flex-col justify-end">
                <label className="text-[10px] font-bold text-transparent uppercase tracking-wider mb-1.5 px-1 select-none">.</label>
                <button className="search-btn text-white rounded-xl px-6 py-3 font-semibold text-sm flex items-center justify-center gap-2 w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Rooms
                </button>
              </div>
            </div>

            {/* Popular Cities */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-stone-400 text-xs font-medium">Popular:</span>
              {["Mumbai", "Delhi", "Bangalore", "Bhopal", "Pune", "Hyderabad"].map((city) => (
                <button key={city} onClick={() => setCityInput(city)}
                  className="text-xs text-stone-500 bg-stone-100 hover:bg-amber-50 hover:text-amber-700 px-3 py-1 rounded-full transition-colors font-medium border border-transparent hover:border-amber-200">
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Stats — animated counters */}
          <div className="anim-stats grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s, i) => (
              <AnimatedStat key={i} end={s.end} suffix={s.suffix} label={s.label} delay={i * 120} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;