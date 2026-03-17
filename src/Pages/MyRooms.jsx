import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { MapPin, Home, BedDouble } from "lucide-react";
import OwnerSidebar from "../Comonentes/OwnerSidebar";

const MyRooms = () => {

    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {

        try {

            const res = await API.get(`/rooms/my-rooms?t=${Date.now()}`);

            setRooms(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteRoom = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this room?");

        if (!confirmDelete) return;

        try {

            await API.delete(`/rooms/${id}`);

            alert("Room Deleted Successfully");

            fetchRooms();

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchRooms();

    }, []);

    return (

        <div className="flex min-h-screen bg-gray-100">

            <OwnerSidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    My Rooms
                </h1>

                {rooms.length === 0 ? (

                    <div className="text-gray-500 text-lg">
                        No Rooms Added Yet
                    </div>

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
                                    alt="room"
                                    className="w-full h-48 object-cover"
                                />

                                {/* CONTENT */}

                                <div className="p-4 flex flex-col flex-grow">

                                    {/* TITLE */}

                                    <h2 className="text-lg font-semibold line-clamp-1">
                                        {room.title}
                                    </h2>

                                    {/* CITY + LOCATION */}

                                    <p className="text-gray-500 flex items-center gap-1 text-sm mt-1">
                                        <MapPin size={14} />
                                        {room.city} • {room.location}
                                    </p>

                                    {/* ROOM TYPE */}

                                    <p className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                                        <Home size={14} />
                                        {room.room_type}
                                    </p>

                                    {/* PRICE */}

                                    <p className="font-bold text-lg mt-2 text-blue-600">
                                        ₹{room.price} / month
                                    </p>

                                    {/* DESCRIPTION */}

                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                        {room.description}
                                    </p>

                                    {/* ACTION BUTTONS */}

                                    <div className="flex gap-2 mt-4">

                                        <Link
                                            to={`/room/${room.id}`}
                                            className="flex-1 text-center bg-black text-white px-3 py-1.5 rounded text-sm hover:bg-gray-800"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            to={`/edit-room/${room.id}`}
                                            className="flex-1 text-center bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => deleteRoom(room.id)}
                                            className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600"
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

export default MyRooms;