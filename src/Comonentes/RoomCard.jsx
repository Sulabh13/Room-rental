import { Link } from "react-router-dom";
import API from "../api/axios";

const RoomCard = ({ room }) => {

    const addWishlist = async () => {

        await API.post(`/wishlist/${room.id}`);

        alert("Added to wishlist");

    };

    return (

        <div className="border p-4 rounded shadow">

            <img
                src={room.images?.[0]}
                className="w-full h-40 object-cover"
            />

            <h2 className="text-lg font-bold mt-2">
                {room.title}
            </h2>

            <p>{room.city}</p>

            <p>₹ {room.price}</p>

            <div className="flex gap-4 mt-2">

                <Link
                    to={`/room/${room.id}`}
                    className="text-blue-500"
                >
                    View Details
                </Link>

                <button
                    onClick={addWishlist}
                >
                    ❤️
                </button>

            </div>

        </div>

    );

};

export default RoomCard;