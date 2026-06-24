import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";

const RoomCard = ({ room }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      checkWishlist();
    }
  }, []);

  const checkWishlist = async () => {
    try {
      const res = await API.get("/wishlist");

      const exists = res.data.some(
        (item) => item.roomId === room.id || item.id === room.id,
      );

      setIsWishlisted(exists);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isWishlisted) {
        await API.delete(`/wishlist/${room.id}`);

        setIsWishlisted(false);

        toast.success("💔 Removed from Wishlist");
      } else {
        await API.post(`/wishlist/${room.id}`);

        setIsWishlisted(true);

        toast.success("❤️ Added to Wishlist");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Wishlist Error");
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      overflow-hidden
      shadow-sm
      border
      border-gray-200
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
    "
    >
      {/* IMAGE */}

      <div className="relative">
        <img
          src={room.images?.[0] || "/no-image.jpg"}
          alt={room.title}
          className="w-full h-36 object-cover"
        />

        {/* WISHLIST */}

        <button
          onClick={toggleWishlist}
          className="
          absolute
          top-3
          right-3
          bg-white
          p-2
          rounded-full
          shadow-lg
          hover:scale-110
          transition
        "
        >
          <Heart
            size={20}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
            }
          />
        </button>
      </div>

      {/* CONTENT */}

      <div className="p-2">
        <span
          className="
          bg-blue-100
          text-blue-700
          text-xs
          px-2
          py-1  
          rounded-full
        "
        >
          {room.room_type}
        </span>

        <h2 className="text-lg font-bold mt-3">{room.title}</h2>

        <p
          className="
          flex
          items-center
          gap-1
          text-sm
          text-gray-500
          mt-2
        "
        >
          <MapPin size={14} />
          {room.city}
        </p>

        <p className="text-2xl font-bold mt-3">₹{room.price}</p>

        <Link
          to={`/room/${room.id}`}
          className="
          block
          text-center
          mt-4
          bg-black
          text-white
          py-2.5
          rounded-xl
          hover:bg-gray-800
          transition
        "
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
