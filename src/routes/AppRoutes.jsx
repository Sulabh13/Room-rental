import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Rooms from "../Pages/Rooms";
// import About from "../Pages/About";
import Contact from "../Pages/Contact";

import Login from "../Comonentes/Login";
import Signup from "../Comonentes/Signup";

import RoomDetails from "../Pages/RoomDetails";
import AddRoom from "../Pages/AddRoom";
import MyRooms from "../Pages/MyRooms";
import Wishlist from "../Pages/Wishlist";
import OwnerDashboard from "../Pages/OwnerDashboard";

import OwnerRoute from "./OwnerRoute";
import EditRoom from "../Pages/EditRoom";
import Profile from "../Pages/Profile";

const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/rooms" element={<Rooms />} />

            {/* <Route path="/about" element={<About />} /> */}

            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/room/:id" element={<RoomDetails />} />

            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />

            {/* OWNER ROUTES */}

            <Route
                path="/owner-dashboard"
                element={
                    <OwnerRoute>
                        <OwnerDashboard />
                    </OwnerRoute>
                }
            />

            <Route
                path="/add-room"
                element={
                    <OwnerRoute>
                        <AddRoom />
                    </OwnerRoute>
                }
            />

            <Route
                path="/my-rooms"
                element={
                    <OwnerRoute>
                        <MyRooms />
                    </OwnerRoute>
                }
            />


            <Route
                path="/edit-room/:id"
                element={
                    <OwnerRoute>
                        <EditRoom />
                    </OwnerRoute>
                }
            />

        </Routes>

    );

};

export default AppRoutes;