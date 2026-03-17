import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Hero from "../Comonentes/Hero";

const locations = [
  "All",
  "Moti Nagar",
  "Prem Nagar",
  "Bhatera",
  "Budi",
  "Narmada Nagar",
  "Garra"
];

const Home = () => {

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  /* ================= FETCH ================= */

  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      const data = res.data.rooms || [];

      setRooms(data);
      setFilteredRooms(data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  /* ================= FILTER BY LOCATION ================= */

  const handleTab = (location) => {

    setActiveTab(location);

    if (location === "All") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) =>
        room.location?.toLowerCase().includes(location.toLowerCase())
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

        {/* IMAGE */}
        <div className="h-48 overflow-hidden">
          <img
            src={room.images?.[0] || "/no-image.jpg"}
            alt="room"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* CONTENT */}
        <div className="p-4">

          <p className="text-xs text-gray-400 mb-1">
            📍 {room.location || "Location"}
          </p>

          <h3 className="font-semibold text-lg truncate">
            {room.title || "Room"}
          </h3>

          <p className="text-2xl font-bold mt-2">
            ₹{price}
            <span className="text-sm text-gray-400 font-normal">
              /month
            </span>
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

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-10">

          {locations.map((loc) => (

            <button
              key={loc}
              onClick={() => handleTab(loc)}
              className={`px-5 py-2 rounded-full text-sm border transition
              
              ${activeTab === loc
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

          <p className="text-center text-gray-500">
            No rooms found
          </p>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredRooms.slice(0, 8).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}

          </div>

        )}

        {/* LOAD MORE (UI only) */}
        {filteredRooms.length > 8 && (

          <div className="text-center mt-10">

            <button
              className="px-6 py-3 border rounded-full hover:bg-black hover:text-white transition"
            >
              Load More
            </button>

          </div>

        )}

      </section>

    </div>

  );

};

export default Home;