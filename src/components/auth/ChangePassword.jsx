import { useState } from "react";

const ChangePassword = () => {

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    };

    const changePassword = () => {

        alert("Password changed (demo)");

    };

    return (

        <div>

            <h2 className="text-lg font-semibold mb-4">
                Change Password
            </h2>

            <div className="space-y-3">

                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <button
                    onClick={changePassword}
                    className="bg-black text-white px-5 py-2 rounded"
                >
                    Update Password
                </button>

            </div>

        </div>

    );

};

export default ChangePassword;