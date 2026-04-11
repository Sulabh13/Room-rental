import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import Hero from "../Comonentes/Hero";

const locations = [
  "All",
  "Moti Nagar",
  "Prem Nagar",
  "Bhatera",
  "Budi",
  "Narmada Nagar",
  "Garra",
];

const features = [
  {
    id: "01",
    title: "Verified Listings",
    description: "Only genuine and verified properties.",
    emoji: "✅",
  },
  {
    id: "02",
    title: "Direct Chat",
    description: "Connect instantly with landlords or tenants.",
    emoji: "💬",
  },
  {
    id: "03",
    title: "Tenants & Landlords both can advertise",
    description: "Both landlords and tenants can post their ads.",
    emoji: "📣",
  },
  {
    id: "04",
    title: "Unlimited Listings",
    description:
      "Post as many property ads as you like – no limits, no charges.",
    emoji: "🏠",
  },
  {
    id: "05",
    title: "Personalised Support",
    description: "Get help tailored to your needs with personalised support.",
    emoji: "🤝",
  },
  {
    id: "06",
    title: "Unlimited Messaging & Calls",
    description: "Communicate freely, without limits.",
    emoji: "♾️",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Read URL query params

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchInfo, setSearchInfo] = useState(null); // ✅ Show what was searched

  /* ================= FETCH ================= */

  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      const data = res.data.rooms || [];
      setRooms(data);
      return data; // ✅ Return so we can use it immediately
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  /* ================= APPLY SEARCH PARAMS FROM URL ================= */

  useEffect(() => {
    const init = async () => {
      const data = await fetchRooms();

      const params = new URLSearchParams(location.search);
      const city = params.get("city") || "";
      const area = params.get("location") || "";

      if (city || area) {
        // ✅ Filter by city and/or area from Hero search
        const filtered = data.filter((room) => {
          const cityMatch = city
            ? room.city?.toLowerCase().includes(city.toLowerCase())
            : true;
          const areaMatch = area
            ? room.location?.toLowerCase().includes(area.toLowerCase())
            : true;
          return cityMatch && areaMatch;
        });

        setFilteredRooms(filtered);
        setActiveTab("All"); // Reset tab
        setSearchInfo({ city, area }); // ✅ Show search label
      } else {
        setFilteredRooms(data);
        setSearchInfo(null);
      }
    };

    init();
  }, [location.search]); // ✅ Re-runs when URL changes (new search)

  /* ================= FILTER BY LOCATION TAB ================= */

  const handleTab = (loc) => {
    setActiveTab(loc);
    setSearchInfo(null); // ✅ Clear search info when tab is clicked

    // Remove search params from URL
    navigate("/", { replace: true });

    if (loc === "All") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) =>
        room.location?.toLowerCase().includes(loc.toLowerCase()),
      );
      setFilteredRooms(filtered);
    }
  };

  /* ================= CARD ================= */

  const RoomCard = ({ room }) => {
    const price = Number(room.price) || 0;
    return (
      <div
        onClick={() => navigate(`/room/${room.id}`)}
        className="bg-white rounded-2xl overflow-hidden cursor-pointer group border hover:shadow-xl transition"
      >
        <div className="h-48 overflow-hidden">
          <img
            src={room.images?.[0] || "/no-image.jpg"}
            alt="room"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-1">
            📍 {room.location || "Location"}
          </p>
          <h3 className="font-semibold text-lg truncate">
            {room.title || "Room"}
          </h3>
          <p className="text-2xl font-bold mt-2">
            ₹{price}
            <span className="text-sm text-gray-400 font-normal">/month</span>
          </p>
        </div>
      </div>
    );
  };

  /* ================= UI ================= */

  return (
    <div className="bg-[#f8f6f2] min-h-screen">
      <Hero />

      {/* ================= COLLECTION ================= */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* TITLE */}
        <div className="mb-8">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">
            Browse by Location
          </p>
          <h2 className="text-4xl font-light">
            Room <span className="italic text-gray-500">Collection</span>
          </h2>
        </div>

        {/* ✅ SEARCH RESULT BANNER — shown when searched from Hero */}
        {searchInfo && (
          <div className="mb-6 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
            <p className="text-sm text-amber-800 font-medium">
              🔍 Showing results for
              {searchInfo.city && (
                <span className="font-bold"> "{searchInfo.city}"</span>
              )}
              {searchInfo.city && searchInfo.area && " in "}
              {searchInfo.area && (
                <span className="font-bold"> "{searchInfo.area}"</span>
              )}{" "}
              — {filteredRooms.length} room
              {filteredRooms.length !== 1 ? "s" : ""} found
            </p>
            <button
              onClick={() => handleTab("All")}
              className="text-xs text-amber-600 hover:text-amber-900 font-semibold ml-4 underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => handleTab(loc)}
              className={`px-5 py-2 rounded-full text-sm border transition
              ${
                activeTab === loc && !searchInfo
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* GRID */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🏠</p>
            <p className="text-gray-500 text-lg font-medium">No rooms found</p>
            {searchInfo && (
              <p className="text-gray-400 text-sm mt-2">
                Try a different city or area
              </p>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRooms.slice(0, 8).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}

        {/* LOAD MORE */}
        {filteredRooms.length > 8 && (
          <div className="text-center mt-10">
            <button className="px-6 py-3 border rounded-full hover:bg-black hover:text-white transition">
              Load More
            </button>
          </div>
        )}
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section
        className="relative py-20 px-6 overflow-hidden bg-[#c0c0bf]"
        style={{
          background: "linear-gradient(#fff)",
        }}
      >
        <span className="absolute top-10 left-1/2 w-2 h-2 rounded-full bg-blue-400 opacity-70" />
        <span className="absolute top-16 right-16 w-3 h-3 rounded-full bg-purple-400 opacity-60" />
        <span className="absolute bottom-16 left-10 w-3 h-3 rounded-full bg-orange-400 opacity-70" />
        <span className="absolute bottom-10 right-1/3 w-2 h-2 rounded-full bg-blue-300 opacity-60" />
        <span className="absolute top-1/2 right-6 w-2 h-2 rounded-full bg-purple-300 opacity-50" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full text-white mb-5"
              style={{ background: "linear-gradient(90deg, #4f8ef7, #38c5f5)" }}
            >
              Powerful Features
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: "#1a1a4e" }}
            >
              Why Choose Us ?
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              Room Dekhho makes finding accommodation simple, fast, and
              stress-free with these powerful features.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="relative bg-white rounded-2xl overflow-hidden group transition-all duration-300 cursor-pointer"
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(white, white) padding-box, linear-gradient(135deg, #e0e7ff, #c7d2fe) border-box",
                  border: "2px solid transparent",
                  boxShadow: "0 2px 16px 0 rgba(80,120,255,0.06)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px 0 rgba(79,142,247,0.22)";
                  e.currentTarget.style.background =
                    "linear-gradient(white, white) padding-box, linear-gradient(135deg, #4f8ef7, #38c5f5) border-box";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 16px 0 rgba(80,120,255,0.06)";
                  e.currentTarget.style.background =
                    "linear-gradient(white, white) padding-box, linear-gradient(135deg, #e0e7ff, #c7d2fe) border-box";
                }}
              >
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <h3
                      className="font-bold text-base leading-snug pr-3"
                      style={{ color: "#1a1a4e", maxWidth: "72%" }}
                    >
                      {feature.title}
                    </h3>
                    <span className="text-4xl drop-shadow-sm">
                      {feature.emoji}
                    </span>
                  </div>
                  <div
                    className="w-10 h-0.5 rounded-full mb-4"
                    style={{
                      background: "linear-gradient(90deg, #4f8ef7, #38c5f5)",
                    }}
                  />
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div
                  className="absolute bottom-0 right-0 w-11 h-11 flex items-center justify-center rounded-tl-2xl text-white text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #4f8ef7, #38c5f5)",
                  }}
                >
                  {feature.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
