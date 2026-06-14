import { useEffect, useState } from "react";
import API from "../api/axios";
import { Home, Heart, MessageSquare, IndianRupee } from "lucide-react";

const ProfileStats = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalWishlist: 0,
    totalReviews: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [roomsRes, wishlistRes] = await Promise.all([
        API.get("/rooms/my-rooms"),
        API.get("/wishlist"),
      ]);

      const rooms = roomsRes.data || [];
      const wishlist = wishlistRes.data || [];

      setStats({
        totalRooms: rooms.length,
        totalWishlist: wishlist.length,
        totalReviews: rooms.reduce(
          (total, room) => total + (room.reviewCount || 0),
          0,
        ),
        totalRevenue: rooms.reduce(
          (total, room) => total + Number(room.price || 0),
          0,
        ),
      });
    } catch (error) {
      console.log("Stats Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Owner Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-4">
        {/* TOTAL ROOMS */}

        <div className="bg-blue-50 p-5 rounded-xl border">
          <Home size={30} className="text-blue-600 mb-3" />

          <h3 className="text-3xl font-bold">{stats.totalRooms}</h3>

          <p className="text-gray-500 text-sm">Total Rooms</p>
        </div>

        {/* TOTAL WISHLIST */}

        <div className="bg-red-50 p-5 rounded-xl border">
          <Heart size={30} className="text-red-500 mb-3" />

          <h3 className="text-3xl font-bold">{stats.totalWishlist}</h3>

          <p className="text-gray-500 text-sm">Wishlist Count</p>
        </div>

        {/* REVIEWS */}

        <div className="bg-yellow-50 p-5 rounded-xl border">
          <MessageSquare size={30} className="text-yellow-600 mb-3" />

          <h3 className="text-3xl font-bold">{stats.totalReviews}</h3>

          <p className="text-gray-500 text-sm">Reviews</p>
        </div>

        {/* REVENUE */}

        <div className="bg-green-50 p-5 rounded-xl border">
          <IndianRupee size={30} className="text-green-600 mb-3" />

          <h3 className="text-3xl font-bold">₹{stats.totalRevenue}</h3>

          <p className="text-gray-500 text-sm">Potential Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
