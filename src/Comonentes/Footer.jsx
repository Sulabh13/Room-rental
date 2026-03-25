import { Link } from "react-router-dom";

const Footer = () => {

    return (

        <footer className="bg-gray-900 text-gray-300 mt-16">

            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

                {/* BRAND */}

                <div>

                    <h2 className="text-2xl font-bold text-white mb-4">
                        RoomFinder
                    </h2>

                    <p className="text-sm text-gray-400 leading-6">
                        Find verified rooms without brokers.
                        Safe, fast and reliable platform for tenants and owners.
                    </p>

                </div>

                {/* QUICK LINKS */}

                <div>

                    <h3 className="text-white font-semibold mb-4">
                        Quick Links
                    </h3>

                    <ul className="space-y-2 text-sm">

                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/rooms" className="hover:text-white">Browse Rooms</Link></li>
                        <li><Link to="/about" className="hover:text-white">About</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact</Link></li>

                    </ul>

                </div>

                {/* OWNER */}

                <div>

                    <h3 className="text-white font-semibold mb-4">
                        For Owners
                    </h3>

                    <ul className="space-y-2 text-sm">

                        {/* <li><Link to="/add-room" className="hover:text-white">Add Room</Link></li> */}
                        {/* <li><Link to="/owner-dashboard" className="hover:text-white">Dashboard</Link></li> */}
                        <li><Link to="/my-rooms" className="hover:text-white">My Rooms</Link></li>

                    </ul>

                </div>

                {/* CONTACT */}

                <div>

                    <h3 className="text-white font-semibold mb-4">
                        Contact
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-400">

                        <li>📍 Balaghat, India</li>
                        <li>📞 +91 9876543210</li>
                        <li>✉️ support@roomfinder.com</li>

                    </ul>

                </div>

            </div>

            {/* BOTTOM */}

            <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">

                © {new Date().getFullYear()} RoomFinder. All rights reserved.

            </div>

        </footer>

    );

};

export default Footer;