import { Navigate } from "react-router-dom";

const OwnerRoute = ({ children }) => {

    const role = localStorage.getItem("role");

    if (role !== "owner") {
        return <Navigate to="/wishlist" />;
    }

    return children;

};

export default OwnerRoute;