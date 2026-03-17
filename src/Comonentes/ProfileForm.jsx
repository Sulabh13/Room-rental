import { useState } from "react";

const ProfileForm = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    };

    const updateProfile = () => {

        const updatedUser = {
            ...user,
            name: form.name,
            email: form.email
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("Profile updated");

    };

    return (

        <div>

            <h2 className="text-lg font-semibold mb-4">
                Update Profile
            </h2>

            <div className="space-y-3">

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                    placeholder="Name"
                />

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                    placeholder="Email"
                />

                <button
                    onClick={updateProfile}
                    className="bg-black text-white px-5 py-2 rounded"
                >
                    Update Profile
                </button>

            </div>

        </div>

    );

};

export default ProfileForm;