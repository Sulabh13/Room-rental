import { useEffect, useState } from "react";
import ChangePassword from "../Comonentes/ChangePassword";
import ProfileForm from "../Comonentes/ProfileForm";
import ProfileStats from "../Comonentes/ProfileStats";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const role = localStorage.getItem("role");

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("loginStateChange", updateUser);

    return () => {
      window.removeEventListener("loginStateChange", updateUser);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 px-4">
        {/* PROFILE CARD */}

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-center">
            <img
              src={
                user?.profile_image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-gray-200"
            />

            <h2 className="text-xl font-semibold mt-3">{user?.name}</h2>

            <p className="text-gray-500 text-sm">{user?.email}</p>

            <span className="text-xs bg-black text-white px-3 py-1 rounded-full mt-3 inline-block capitalize">
              {role}
            </span>
          </div>
        </div>

        {/* UPDATE PROFILE */}

        <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
          <ProfileForm />
        </div>

        {/* PASSWORD */}

        {/* <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
          <ChangePassword />
        </div> */}

        {/* OWNER STATS */}

        {role === "owner" && (
          <div className="bg-white p-6 rounded-xl shadow md:col-span-3">
            <ProfileStats />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
