import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { Home, Heart, PlusCircle, User, MapPin } from "lucide-react";

const OwnerDashboard = () => {

    const [rooms, setRooms] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchDashboardData = async () => {

        try {

            const roomRes = await API.get("/rooms/my-rooms");
            setRooms(roomRes.data);

            const wishRes = await API.get("/wishlist");
            setWishlistCount(wishRes.data.length);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteRoom = async (id) => {

        const confirmDelete = window.confirm("Delete this room?");

        if (!confirmDelete) return;

        try {

            await API.delete(`/rooms/${id}`);
            fetchDashboardData();

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchDashboardData();

    }, []);

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}

            <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">

                <div>

                    <h2 className="text-2xl font-bold mb-6">
                        Owner Panel
                    </h2>

                    <nav className="space-y-4">

                        <Link
                            to="/owner-dashboard"
                            className="flex items-center gap-2 text-blue-600 font-semibold"
                        >
                            <Home size={18} />
                            Dashboard
                        </Link>

                        <Link
                            to="/add-room"
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                        >
                            <PlusCircle size={18} />
                            Add Room
                        </Link>

                        <Link
                            to="/my-rooms"
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                        >
                            <Home size={18} />
                            My Rooms
                        </Link>

                    </nav>

                </div>

                {/* PROFILE */}

                <div className="border-t pt-4 flex items-center gap-3">

                    <div className="bg-gray-200 p-3 rounded-full">
                        <User size={20} />
                    </div>

                    <div>

                        <p className="font-semibold text-sm">
                            {user?.name}
                        </p>

                        <p className="text-xs text-gray-500">
                            {user?.email}
                        </p>

                    </div>

                </div>

            </div>

            {/* MAIN */}

            <div className="flex-1 p-8">

                {/* HERO */}

                <div className="relative rounded-xl overflow-hidden shadow mb-8">

                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                        className="w-full h-56 object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-between p-8 text-white">

                        <div>

                            <h1 className="text-3xl font-bold">
                                Owner Dashboard
                            </h1>

                            <p className="text-sm opacity-80">
                                Manage your property listings
                            </p>

                        </div>

                        <Link
                            to="/add-room"
                            className="flex items-center gap-2 bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            <PlusCircle size={18} />
                            Add Room
                        </Link>

                    </div>

                </div>

                {/* STATS */}

                <div className="grid md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Rooms
                            </p>

                            <h2 className="text-3xl font-bold">
                                {rooms.length}
                            </h2>

                        </div>

                        <Home size={40} className="text-blue-500" />

                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Wishlist
                            </p>

                            <h2 className="text-3xl font-bold">
                                {wishlistCount}
                            </h2>

                        </div>

                        <Heart size={40} className="text-red-500" />

                    </div>

                </div>

                {/* ROOMS */}

                <h2 className="text-2xl font-semibold mb-5">
                    Recent Rooms
                </h2>

                {rooms.length === 0 ? (

                    <p className="text-gray-500">
                        No rooms added yet
                    </p>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {rooms.map((room) => (

                            <div
                                key={room.id}
                                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
                            >

                                {/* IMAGE */}

                                <img
                                    src={room.images?.[0] || "/no-image.jpg"}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-4 flex flex-col flex-grow">

                                    {/* TITLE */}

                                    <h3 className="font-semibold text-lg line-clamp-1">
                                        {room.title}
                                    </h3>

                                    {/* CITY + LOCATION */}

                                    <p className="text-gray-500 flex items-center gap-1 text-sm mt-1">
                                        <MapPin size={14} />
                                        {room.city} • {room.location}
                                    </p>

                                    {/* ROOM TYPE */}

                                    <p className="text-sm text-gray-600 mt-1">
                                        Type: {room.room_type}
                                    </p>

                                    {/* PRICE */}

                                    <p className="text-blue-600 font-bold mt-2">
                                        ₹ {room.price} / month
                                    </p>

                                    {/* DESCRIPTION */}

                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                        {room.description}
                                    </p>

                                    {/* ACTIONS */}

                                    <div className="flex gap-2 mt-4">

                                        <Link
                                            to={`/room/${room.id}`}
                                            className="flex-1 text-center bg-gray-800 text-white px-3 py-1.5 rounded hover:bg-black text-sm"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            to={`/edit-room/${room.id}`}
                                            className="flex-1 text-center bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => deleteRoom(room.id)}
                                            className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

};

export default OwnerDashboard;