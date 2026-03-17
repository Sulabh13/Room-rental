import { Link } from "react-router-dom";
import { Home, PlusSquare, User } from "lucide-react";

const OwnerSidebar = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">

            <div>

                <h2 className="text-2xl font-bold mb-6">
                    Owner Panel
                </h2>

                <nav className="space-y-4">

                    <Link
                        to="/owner-dashboard"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                    >
                        <Home size={18} />
                        Dashboard
                    </Link>

                    <Link
                        to="/add-room"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                    >
                        <PlusSquare size={18} />
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

            <div className="border-t pt-4 flex items-center gap-3">

                <div className="bg-gray-200 p-2 rounded-full">
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
    );
};

export default OwnerSidebar;