import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { MapPin, Heart, BedDouble, IndianRupee } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const roomTypes = [
  "single",
  "double",
  "family",
  "1bhk",
  "2bhk",
  "3bhk",
  "pg",
  "hostel",
  "boy",
  "girl",
];

const Rooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);

  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    location: searchParams.get("location") || "",
    room_type: searchParams.get("room_type") || "",
    price: searchParams.get("price") || "",
  });

  // ─── Infinite scroll sentinel ref ───────────────────────────────────────────
  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false); // prevent double-fetch

  const buildParams = (pageNumber) => {
    const params = { page: pageNumber, limit: 20 };
    if (filters.city.trim()) params.city = filters.city.trim();
    if (filters.location.trim()) params.location = filters.location.trim();
    if (filters.room_type) params.room_type = filters.room_type;
    if (filters.price) params.price = filters.price;
    return params;
  };

  const fetchRooms = async (pageNumber = 1, reset = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    try {
      const res = await API.get("/rooms", { params: buildParams(pageNumber) });
      const data = res.data.rooms || [];

      console.log("First Room:", data[0]);

      if (reset || pageNumber === 1) {
        setRooms(data);
      } else {
        setRooms((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 20);
    } catch (error) {
      console.log("Fetch rooms error:", error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  // wishlist
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await API.get("/wishlist");

      const roomIds = res.data.map((item) => item.roomId);

      setWishlistIds(roomIds);
    } catch (error) {
      console.log(error);
    }
  };

  // ─── Sync filters when URL params change (Hero search) ──────────────────────
  useEffect(() => {
    const newFilters = {
      city: searchParams.get("city") || "",
      location: searchParams.get("location") || "",
      room_type: searchParams.get("room_type") || "",
      price: searchParams.get("price") || "",
    };
    setFilters(newFilters);
  }, [searchParams]);

  // ─── Re-fetch on URL param change ───────────────────────────────────────────
  useEffect(() => {
    setPage(1);
    setHasMore(true);

    fetchRooms(1, true);
    fetchWishlist();
  }, [searchParams]);

  // ─── IntersectionObserver — auto-load next page ──────────────────────────────
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, loading],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px", // trigger 200px before sentinel reaches viewport
      threshold: 0,
    });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // ─── Fetch next page when page increments ───────────────────────────────────
  useEffect(() => {
    if (page > 1) fetchRooms(page);
  }, [page]);

  // wishlist
  const toggleWishlist = async (e, roomId) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      if (wishlistIds.includes(roomId)) {
        await API.delete(`/wishlist/${roomId}`);

        setWishlistIds((prev) => prev.filter((id) => id !== roomId));

        toast.success("💔 Removed from Wishlist");
      } else {
        await API.post(`/wishlist/${roomId}`);

        setWishlistIds((prev) => [...prev, roomId]);

        toast.success("❤️ Added to Wishlist");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Wishlist operation failed");
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const searchRooms = () => {
    const params = {};
    if (filters.city) params.city = filters.city;
    if (filters.location) params.location = filters.location;
    if (filters.room_type) params.room_type = filters.room_type;
    if (filters.price) params.price = filters.price;
    setSearchParams(params);
  };

  const resetFilters = () => {
    const empty = { city: "", location: "", room_type: "", price: "" };
    setFilters(empty);
    setSearchParams({});
    setPage(1);
    setHasMore(true);
  };
  // wishlist
  // const [wishlist, setWishlist] = useState(() => {
  //   const saved = localStorage.getItem("roomWishlist");
  //   return saved ? JSON.parse(saved) : [];
  // });

  if (loading && rooms.length === 0) {
    return <div className="p-20 text-center text-lg">Loading Rooms...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-14">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      {/* ── Heading + Filter — ek hi line mein ── */}
      <div className="flex items-center gap-4 mb-4 mt-14 flex-wrap">
        {/* Heading */}
        <h1 className="text-2xl font-bold whitespace-nowrap">
          Available Rooms
        </h1>

        {/* Filter bar — grows to fill remaining space */}
        <div className="flex flex-1 gap-3 flex-wrap">
          <input
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleChange}
            className="border p-2.5 rounded flex-1 min-w-[110px]"
          />

          <input
            name="location"
            placeholder="Location / Area"
            value={filters.location}
            onChange={handleChange}
            className="border p-2.5 rounded flex-1 min-w-[130px]"
          />

          <select
            name="room_type"
            value={filters.room_type}
            onChange={handleChange}
            className="border p-2.5 rounded flex-1 min-w-[120px]"
          >
            <option value="">Room Type</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Max Price"
            value={filters.price}
            onChange={handleChange}
            className="border p-2.5 rounded flex-1 min-w-[110px]"
          />

          <button
            onClick={searchRooms}
            className="h-11 px-5 rounded-md font-semibold bg-black text-gray-300 
              shadow-lg hover:bg-[#2b2a2a] transition-all duration-300 whitespace-nowrap"
          >
            Search
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-200 px-4 py-2.5 rounded hover:bg-gray-300 whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Active filter badges */}
      {(filters.city || filters.location) && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm text-gray-500">Searching for:</span>
          {filters.city && (
            <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
              🏙️ {filters.city}
            </span>
          )}
          {filters.location && (
            <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
              📍 {filters.location}
            </span>
          )}
        </div>
      )}

      {/* ── Room Grid ── */}
      {rooms.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Room Not Available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={`/room/${room.id}`}
              className=" bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 "
            >
              <div className="relative">
                <img
                  src={room.images?.[0] || "/no-image.jpg"}
                  alt={room.title}
                  className="w-full h-36 object-cover"
                />

                <button
                  onClick={(e) => toggleWishlist(e, room.id)}
                  className=" absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition "
                >
                  <Heart
                    size={20}
                    className={
                      wishlistIds.includes(room.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className=" bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {room.room_type}
                  </span>

                  {room.furnished && (
                    <span className=" bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full ">
                      Furnished
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold mt-3">{room.title}</h2>

                <p className=" flex items-center gap-1 text-gray-500 mt-2 text-sm ">
                  <MapPin size={14} />
                  {room.city}, {room.location}
                </p>

                <div className=" flex items-center gap-1 mt-3">
                  <IndianRupee size={18} />
                  <span className="text-2xl font-bold">{room.price}</span>
                </div>

                <button className=" mt-4 w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ── Infinite scroll sentinel ── */}
      <div ref={sentinelRef} className="h-10" />

      {/* Loading indicator while fetching next page */}
      {loading && rooms.length > 0 && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* End of results */}
      {!hasMore && rooms.length > 0 && (
        <p className="text-center text-gray-400 text-sm py-6">
          — Sab rooms dekh liye —
        </p>
      )}
    </div>
  );
};

export default Rooms;
