// import { Routes, Route, useLocation } from "react-router-dom";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../Pages/Home";
import Rooms from "../Pages/Rooms";
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
import Footer from "../Comonentes/Footer";
import ResetPassword from "../Pages/ResetPassword";
import ForgotPassword from "../Pages/ForgotPassword";
import VerifyEmail from "../Pages/VerifyEmail";

const AppRoutes = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const isLoggedIn = !!(token && user);

  const hideFooterRoutes = [
    "/owner-dashboard",
    "/add-room",
    "/my-rooms",
    "/wishlist",
  ];

  const hideFooter =
    hideFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/edit-room/");

  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/profile" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/profile" replace /> : <Signup />}
        />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* OWNER PROTECTED ROUTES */}
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
      {/* <Footer /> */}
      {!hideFooter && <Footer />}
    </>
  );
};

export default AppRoutes;
