import React, { useEffect, useState } from "react";

/* ========================= */
/* COUNTER HOOK */
/* ========================= */

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

/* ========================= */

const team = [
  { name: "Arjun Sharma", role: "Founder & CEO", city: "Bhopal" },
  { name: "Priya Mehra", role: "Head of Operations", city: "Indore" },
  { name: "Rahul Tiwari", role: "Lead Engineer", city: "Jabalpur" },
  { name: "Neha Joshi", role: "Community Manager", city: "Nagpur" },
];

const values = [
  { icon: "🔍", title: "Verified Listings", desc: "Every room listing is verified." },
  { icon: "🤝", title: "Trust First", desc: "Safe connection between tenant and owner." },
  { icon: "⚡", title: "Instant Match", desc: "Find the right room quickly." },
  { icon: "₹", title: "Zero Brokerage", desc: "Direct connect with owners." },
];

const stats = [
  { value: 10000, label: "Rooms Listed", suffix: "+" },
  { value: 500, label: "Cities Covered", suffix: "+" },
  { value: 50000, label: "Happy Tenants", suffix: "+" },
  { value: 98, label: "Satisfaction", suffix: "%" },
];

export default function About() {

  return (

    <div className="bg-[#f8f6f2] min-h-screen">

      {/* HERO */}

      <section className="py-20 relative overflow-hidden">

        {/* BG IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1600&q=80')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center px-6 text-white">

          {/* LEFT */}
          <div className="animate-fadeLeft">

            <p className="uppercase text-xs tracking-widest text-amber-400 mb-3">
              Our Story
            </p>

            <h1 className="text-5xl font-bold mb-6">
              Finding a Room <br />
              Should Be
              <span className="ml-2 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-[length:300%] bg-clip-text text-transparent animate-shimmer">
                Simple
              </span>
            </h1>

            <p className="text-gray-300 mb-6">
              RoomFinder helps tenants find verified rooms without brokers or fake listings.
            </p>

            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full">
              Browse Rooms
            </button>

          </div>

          {/* RIGHT */}
          <div className="relative animate-fadeRight">

            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
              alt="team"
              className="rounded-2xl shadow-xl"
            />

            <div className="absolute -top-6 -left-6 bg-white text-black p-4 rounded-xl shadow animate-float">
              🏆 Top Rated
            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="py-16 bg-white">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center px-6">

          {stats.map((s, i) => {

            const count = useCounter(s.value);

            return (

              <div key={i} className="p-6 rounded-xl border hover:shadow">

                <h2 className="text-3xl font-bold text-amber-500">
                  {count}{s.suffix}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {s.label}
                </p>

              </div>

            );

          })}

        </div>

      </section>

      {/* VALUES */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {values.map((v, i) => (

              <div key={i} className="bg-white border rounded-xl p-6 text-center hover:shadow transition">

                <div className="text-3xl mb-3">
                  {v.icon}
                </div>

                <h3 className="font-semibold mb-2">
                  {v.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {v.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* TEAM */}

      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Meet The Team
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {team.map((t, i) => (

              <div key={i} className="border rounded-xl p-6 text-center hover:shadow">

                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />

                <h3 className="font-semibold">
                  {t.name}
                </h3>

                <p className="text-amber-500 text-sm">
                  {t.role}
                </p>

                <p className="text-gray-500 text-xs">
                  {t.city}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-20 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Ready to Find Your Room?
        </h2>

        <p className="text-gray-600 mb-6">
          Browse thousands of verified rooms across India.
        </p>

        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full">
          Browse Rooms
        </button>

      </section>

    </div>

  );

}