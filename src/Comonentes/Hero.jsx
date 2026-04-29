import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";
import { MdLocationCity } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import styles from "./Hero.module.css";

// const STATS = [
//   { end: 10000, suffix: "+", label: "Rooms Listed" },
//   { end: 500, suffix: "+", label: "Cities Covered" },
//   { end: 50000, suffix: "+", label: "Happy Tenants" },
//   { end: 98, suffix: "%", label: "Satisfaction Rate" },
// ];

function formatNum(n) {
  if (n >= 1000)
    return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "") + "K";
  return n.toString();
}

// function AnimatedStat({ end, suffix, label, delay = 0 }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const started = useRef(false);
//
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !started.current) {
//           started.current = true;
//           const duration = 1800;
//           const fps = 60;
//           const steps = Math.round((duration / 1000) * fps);
//           let step = 0;
//           setTimeout(() => {
//             const interval = setInterval(() => {
//               step++;
//               const progress = step / steps;
//               const eased = 1 - Math.pow(1 - progress, 3);
//               setCount(Math.round(end * eased));
//               if (step >= steps) {
//                 clearInterval(interval);
//                 setCount(end);
//               }
//             }, 1000 / fps);
//           }, delay);
//         }
//       },
//       { threshold: 0.3 },
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [end, delay]);
//
//   return (
//     <div ref={ref} className={`${styles.statCard} rounded-xl px-4 py-4 text-center`}>
//       <p className={`display text-2xl font-bold text-white ${styles.tabularNums}`}>
//         {formatNum(count)}{suffix}
//       </p>
//       <p className="text-white/50 text-xs mt-0.5 font-medium">{label}</p>
//     </div>
//   );
// }

const Hero = () => {
  const navigate = useNavigate();

  const [cityInput, setCityInput] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [stateCode, setStateCode] = useState("MP");
  const [showCity, setShowCity] = useState(false);
  const [activeField, setActiveField] = useState("");

  const states = State.getStatesOfCountry("IN");
  const cities = stateCode ? City.getCitiesOfState("IN", stateCode) : [];
  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().includes(cityInput.toLowerCase()),
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (cityInput.trim()) params.set("city", cityInput.trim());
    if (areaInput.trim()) params.set("location", areaInput.trim());
    navigate(`/rooms?${params.toString()}`);
  };

  const handlePopularCity = (city) => {
    setCityInput(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section
      className={`${styles.heroRoot} ${styles.heroBg} relative min-h-screen flex flex-col justify-center overflow-hidden`}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950/85 via-stone-900/75 to-stone-800/70"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-950/60 to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/[0.08] rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 py-20 w-full">
        {/* Badge */}
        <div className={`${styles.animBadge} flex justify-center mb-6`}>
          <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/35 text-amber-300 text-xs font-semibold uppercase tracking-[0.25em] px-5 py-2 rounded-full">
            <span
              className={`${styles.pulseDot} w-1.5 h-1.5 bg-amber-400 inline-block`}
            ></span>
            India's Trusted Room Rental Platform
          </span>
        </div>

        {/* Heading */}
        <div className={`${styles.animTitle} text-center mb-4 `}>
          <h1 className="display text-5xl md:text-7xl font-extrabold font-normal text-white leading-tight tracking-tight">
            Find Your
            <br />
            <span className={`${styles.shimmerText} font-normal`}>
              Perfect Room
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p
          className={`${styles.animSub} text-center text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed`}
        >
          Search from thousands of verified rooms across every city in India
          instantly.
        </p>

        {/* Search Card */}
        <div
          className={`${styles.animSearch} ${styles.searchCard} rounded-2xl p-5 md:p-6 mb-10`}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <p className="text-stone-500 text-xs font-semibold uppercase tracking-widest">
              Search Rooms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* City Field */}
            <div className="relative">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 px-1">
                <span>
                  <img
                    src="/src/assets/Images/citygif.gif"
                    alt=""
                    className="h-6"
                  />
                </span>{" "}
                City
              </label>
              <input
                type="text"
                placeholder="Enter City"
                value={cityInput}
                onFocus={() => {
                  setShowCity(true);
                  setActiveField("city");
                }}
                onBlur={() =>
                  setTimeout(() => {
                    setShowCity(false);
                    setActiveField("");
                  }, 180)
                }
                onChange={(e) => {
                  setCityInput(e.target.value);
                  setShowCity(true);
                }}
                onKeyDown={handleKeyDown}
                className={`${styles.searchField} ${activeField === "city" ? styles.searchFieldActive : ""} w-full px-4 py-3 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none`}
              />
              {showCity && cityInput && filteredCities.length > 0 && (
                <ul
                  className={`${styles.dropdownList} absolute w-full mt-1.5 rounded-xl max-h-44 overflow-y-auto z-30`}
                >
                  {filteredCities.slice(0, 8).map((c) => (
                    <li
                      key={c.name}
                      onMouseDown={() => {
                        setCityInput(c.name);
                        setShowCity(false);
                      }}
                      className="px-4 py-2.5 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-700 cursor-pointer flex items-center gap-2 transition-colors"
                    >
                      <span className="text-xs">
                        <MdLocationCity />
                      </span>{" "}
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Area / Location Field */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 px-1">
                <span>
                  <FaLocationDot className="text-zinc-950 text-[24px]" />
                </span>{" "}
                Area / Location
              </label>
              <input
                type="text"
                placeholder="Area / Locality"
                value={areaInput}
                onFocus={() => setActiveField("area")}
                onBlur={() => setActiveField("")}
                onChange={(e) => setAreaInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`${styles.searchField} ${activeField === "area" ? styles.searchFieldActive : ""} w-full px-4 py-3 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none`}
              />
            </div>

            {/* Search Button */}
            <div className="flex flex-col justify-end">
              <label className="text-[10px] font-bold text-transparent uppercase tracking-wider mb-1.5 px-1 select-none">
                .
              </label>
              <button
                onClick={handleSearch}
                className={`${styles.searchBtn} text-white rounded-xl px-6 py-3 font-semibold text-sm flex items-center justify-center gap-2 w-full`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search Rooms
              </button>
            </div>
          </div>

          {/* Popular Cities */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-stone-400 text-xs font-medium">Popular:</span>
            {["Mumbai", "Delhi", "Bangalore", "Bhopal", "Pune", "Balaghat"].map(
              (city) => (
                <button
                  key={city}
                  onClick={() => handlePopularCity(city)}
                  className="text-xs text-stone-500 bg-stone-100 hover:bg-amber-50 hover:text-amber-700 px-3 py-1 rounded-full transition-colors font-medium border border-transparent hover:border-amber-200"
                >
                  {city}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Stats — commented out, preserved */}
        {/* <div className={`${styles.animStats} grid grid-cols-2 md:grid-cols-4 gap-3`}>
          {STATS.map((s, i) => (
            <AnimatedStat key={i} end={s.end} suffix={s.suffix} label={s.label} delay={i * 120} />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
