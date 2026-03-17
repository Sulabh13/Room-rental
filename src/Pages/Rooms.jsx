import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

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
  "girl"
];

const Rooms = () => {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    city: "",
    location: "",
    room_type: "",
    price: ""
  });

  /* ===================== */
  /* BUILD QUERY PARAMS */
  /* ===================== */

  const buildParams = (pageNumber) => {

    const params = {
      page: pageNumber,
      limit: 20
    };

    if (filters.city.trim())
      params.city = filters.city.trim();

    if (filters.location.trim())
      params.location = filters.location.trim();

    if (filters.room_type)
      params.room_type = filters.room_type;

    if (filters.price)
      params.price = filters.price;   // important

    return params;
  };

  /* ===================== */
  /* FETCH ROOMS */
  /* ===================== */

  const fetchRooms = async (pageNumber = 1, reset = false) => {

    setLoading(true);

    try {

      const res = await API.get("/rooms", {
        params: buildParams(pageNumber)
      });

      const data = res.data.rooms || [];

      if (reset) {
        setRooms(data);
      } else if (pageNumber === 1) {
        setRooms(data);
      } else {
        setRooms((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === 20);

    } catch (error) {

      console.log("Fetch rooms error:", error);

    } finally {

      setLoading(false);

    }

  };

  /* ===================== */
  /* INITIAL LOAD */
  /* ===================== */

  useEffect(() => {

    fetchRooms(page);

  }, [page]);

  /* ===================== */
  /* INPUT CHANGE */
  /* ===================== */

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  /* ===================== */
  /* SEARCH */
  /* ===================== */

  const searchRooms = () => {

    setPage(1);
    setHasMore(true);

    fetchRooms(1, true);

  };

  /* ===================== */
  /* RESET */
  /* ===================== */

  const resetFilters = () => {

    const empty = {
      city: "",
      location: "",
      room_type: "",
      price: ""
    };

    setFilters(empty);
    setPage(1);
    setHasMore(true);

    fetchRooms(1, true);

  };

  /* ===================== */

  if (loading && rooms.length === 0) {

    return (
      <div className="p-20 text-center text-lg">
        Loading Rooms...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-6">
        Available Rooms
      </h1>

      {/* FILTER */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <div className="grid md:grid-cols-5 gap-4">

          <input
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="room_type"
            value={filters.room_type}
            onChange={handleChange}
            className="border p-3 rounded"
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
            className="border p-3 rounded"
          />

          <div className="flex gap-2">

            <button
              onClick={searchRooms}
              className="bg-blue-600 text-white px-4 py-3 rounded w-full hover:bg-blue-700"
            >
              Search
            </button>

            <button
              onClick={resetFilters}
              className="bg-gray-200 px-4 py-3 rounded hover:bg-gray-300"
            >
              Reset
            </button>

          </div>

        </div>

      </div>

      {/* ROOMS */}

      {rooms.length === 0 ? (

        <div className="text-center text-gray-500 text-lg">
          Room Not Available
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {rooms.map((room) => (

            <Link
              key={room.id}
              to={`/room/${room.id}`}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >

              <img
                src={room.images?.[0] || "/no-image.jpg"}
                alt="room"
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                  {room.room_type}
                </span>

                <h2 className="text-lg font-semibold mt-2">
                  {room.title}
                </h2>

                <p className="text-gray-500 flex items-center gap-1 text-sm mt-1">
                  <MapPin size={14} />
                  {room.city} • {room.location}
                </p>

                <p className="font-bold text-lg mt-2">
                  ₹{room.price} / month
                </p>

                <span className="mt-3 inline-block text-blue-600 text-sm font-medium">
                  View Details →
                </span>

              </div>

            </Link>

          ))}

        </div>

      )}

      {/* LOAD MORE */}

      {hasMore && rooms.length > 0 && (

        <div className="flex justify-center mt-10">

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Load More Rooms
          </button>

        </div>

      )}

    </div>

  );

};

export default Rooms;