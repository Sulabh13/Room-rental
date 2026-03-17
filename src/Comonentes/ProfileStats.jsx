import { useEffect, useState } from "react";
import API from "../api/axios";

const ProfileStats = () => {

    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {

        const res = await API.get("/rooms/my-rooms");

        setRooms(res.data);

    };

    useEffect(() => {

        fetchRooms();

    }, []);

    return (

        <div>

            <h2 className="text-lg font-semibold mb-4">
                Owner Statistics
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-gray-100 p-6 rounded">

                    <p className="text-gray-500">
                        Total Rooms
                    </p>

                    <h3 className="text-2xl font-bold">
                        {rooms.length}
                    </h3>

                </div>

                <div className="bg-gray-100 p-6 rounded">

                    <p className="text-gray-500">
                        Active Listings
                    </p>

                    <h3 className="text-2xl font-bold">
                        {rooms.length}
                    </h3>

                </div>

                <div className="bg-gray-100 p-6 rounded">

                    <p className="text-gray-500">
                        Reviews
                    </p>

                    <h3 className="text-2xl font-bold">
                        0
                    </h3>

                </div>

            </div>

        </div>

    );

};

export default ProfileStats;