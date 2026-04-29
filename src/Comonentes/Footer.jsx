import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


const Footer = () => {
  return (
    <footer style={{ fontFamily: "'DM Sans', sans-serif" }} className="relative border-t border-[#e2e0d8] overflow-hidden">
      
      {/* BLURRED BACKGROUND */}
      <div className="absolute inset-0 bg-[#f9f8f4]/80 backdrop-blur-xl z-0" />

      {/* BACKGROUND DECORATION for blur effect */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl z-0" />
      <div className="absolute top-10 right-1/3 w-60 h-60 bg-pink-100/30 rounded-full blur-2xl z-0" />

      {/* CONTENT */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-10 pt-14 pb-10 grid grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="col-span-2">
            <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-[22px] text-[#1a1a18] mb-3 tracking-tight">
              RoomFinder
            </h2>
            <p className="text-[13px] text-[#888882] leading-relaxed max-w-[200px]">
              Find verified rooms without brokers. Safe, fast and reliable platform for tenants and owners.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[11px] font-medium tracking-widest uppercase text-[#9e9c95] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-[11px]">
              {["Home", "Browse Rooms", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-[13.5px] text-[#4a4a45] hover:text-[#1a1a18] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FOR OWNERS */}
          <div>
            <h3 className="text-[11px] font-medium tracking-widest uppercase text-[#9e9c95] mb-4">
              For Owners
            </h3>
            <ul className="space-y-[11px]">
              {["My Rooms", "Add Room", "Dashboard"].map((item) => (
                <li key={item}>
                  <Link to="/my-rooms" className="text-[13.5px] text-[#4a4a45] hover:text-[#1a1a18] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-[11px] font-medium tracking-widest uppercase text-[#9e9c95] mb-4">
              Contact
            </h3>
            <ul className="space-y-[11px]">
              <li className="flex items-center gap-2 text-[13px] text-[#6a6a64]">
                <span><FaLocationDot /></span> Balaghat, India
              </li>
              <li className="flex items-center gap-2 text-[13px] text-[#6a6a64]">
                <span><IoCallSharp />
</span> +91 9876543210
              </li>
              <li className="flex items-center gap-2 text-[13px] text-[#6a6a64]">
                <span><MdEmail />
</span> support@roomfinder.com
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#e2e0d8]/60 max-w-6xl mx-auto px-10 py-5 flex justify-between items-center">
          <p className="text-[12px] text-[#a8a8a0]">
            © {new Date().getFullYear()} RoomFinder. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "FAQ"].map((item) => (
              <a key={item} href="#" className="text-[12px] text-[#a8a8a0] hover:text-[#1a1a18] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;