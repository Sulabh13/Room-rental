import { useEffect, useState } from "react";
import API from "../api/axios";

const Wishlist = () => {

    const [rooms, setRooms] = useState([]);

    const fetchWishlist = async () => {

        try {

            // const res = await API.get("/wishlist");
            const user = JSON.parse(localStorage.getItem("user"));

            const wishRes = await API.get(`/wishlist/${user.id}`);

            setRooms(wishRes.data);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        fetchWishlist();

    }, []);

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                My Wishlist
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {rooms.map((room) => (

                    <div
                        key={room.id}
                        className="border rounded-lg shadow hover:shadow-lg transition"
                    >

                        <img
                            src={room.images?.[0]}
                            alt="room"
                            className="w-full h-40 object-cover rounded-t-lg"
                        />

                        <div className="p-4">

                            <h2 className="font-semibold text-lg">
                                {room.title}
                            </h2>

                            <p className="text-gray-600">
                                {room.city}
                            </p>

                            <p className="font-bold mt-2">
                                ₹ {room.price}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Wishlist;