// import ProfileForm from "../Components/ProfileForm";
// import ChangePassword from "../Components/ChangePassword";
// import ProfileStats from "../Components/ProfileStats";

import ChangePassword from "../Comonentes/ChangePassword";
import ProfileForm from "../Comonentes/ProfileForm";
import ProfileStats from "../Comonentes/ProfileStats";

const Profile = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");

    return (

        <div className="min-h-screen bg-gray-100 pt-32">

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

                {/* PROFILE CARD */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <div className="text-center">

                        <img
                            src={
                                user?.image ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            className="w-24 h-24 mx-auto rounded-full"
                        />

                        <h2 className="text-xl font-semibold mt-3">
                            {user?.name}
                        </h2>

                        <p className="text-gray-500 text-sm">
                            {user?.email}
                        </p>

                        <span className="text-xs bg-gray-200 px-3 py-1 rounded mt-2 inline-block">
                            {role}
                        </span>

                    </div>

                </div>

                {/* UPDATE PROFILE */}

                <div className="bg-white p-6 rounded-xl shadow md:col-span-2">

                    <ProfileForm />

                </div>

                {/* PASSWORD */}

                <div className="bg-white p-6 rounded-xl shadow md:col-span-2">

                    <ChangePassword />

                </div>

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