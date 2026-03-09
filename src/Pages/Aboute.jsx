import React, { useState, useEffect, useRef } from "react";

/* ── Animated counter on scroll ── */
function Counter({ end, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const fps = 60;
        const steps = Math.round((duration / 1000) * fps);
        let step = 0;
        const iv = setInterval(() => {
          step++;
          const eased = 1 - Math.pow(1 - step / steps, 3);
          setCount(Math.round(end * eased));
          if (step >= steps) { clearInterval(iv); setCount(end); }
        }, 1000 / fps);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {count >= 1000 ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "K" : count}{suffix}
    </span>
  );
}

const TEAM = [
  { name: "Arjun Sharma", role: "Founder & CEO", city: "Bhopal", emoji: "👨‍💼",
    bio: "10+ years in real estate. Built RoomFinder to solve the room-hunting nightmare he faced as a student." },
  { name: "Priya Mehra", role: "Head of Operations", city: "Indore", emoji: "👩‍💻",
    bio: "Ex-MakeMyTrip. Obsessed with making tenant-landlord experience smooth and trustworthy." },
  { name: "Rahul Tiwari", role: "Lead Engineer", city: "Jabalpur", emoji: "👨‍🔧",
    bio: "Full-stack dev who turned a weekend project into a platform serving 50K+ users." },
  { name: "Neha Joshi", role: "Community Manager", city: "Nagpur", emoji: "👩‍🤝‍👩",
    bio: "Connects landlords and tenants daily. Your go-to person for any listing support." },
];

const VALUES = [
  { icon: "🔍", title: "Verified Listings", desc: "Every room is personally verified. No fake photos, no false promises." },
  { icon: "🤝", title: "Trust First", desc: "We background-check landlords and verify tenant IDs for mutual safety." },
  { icon: "⚡", title: "Instant Match", desc: "Smart filters connect you to the right room in minutes, not days." },
  { icon: "💬", title: "Real Support", desc: "Humans answer your calls. No bots, no wait time — 9 AM to 9 PM daily." },
  { icon: "📍", title: "Hyperlocal", desc: "Deep coverage across Tier-2 cities where other platforms don't reach." },
  { icon: "₹", title: "Zero Brokerage", desc: "No middlemen. Connect directly with owners and save thousands." },
];

const TIMELINE = [
  { year: "2018", title: "The Idea", desc: "Arjun spends 3 weeks finding a PG in Bhopal. Decides to build something better." },
  { year: "2019", title: "First Launch", desc: "RoomFinder goes live with 120 listings in Bhopal. 500 users in month one." },
  { year: "2021", title: "Going Wider", desc: "Expanded to 12 cities across Madhya Pradesh. Crossed 10,000 listings." },
  { year: "2023", title: "Verification Layer", desc: "Launched owner verification & tenant safety features. Trust score system introduced." },
  { year: "2025", title: "50K+ Happy Tenants", desc: "Now serving 500+ cities, 50K tenants, and growing every day." },
];

export default function About() {
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [hoveredVal, setHoveredVal]   = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .ab-root { font-family:'DM Sans',sans-serif; background:#f8f6f2; }
        .disp { font-family:'Syne',sans-serif; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeRight{ from{opacity:0;transform:translateX(28px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .sh { background:linear-gradient(90deg,#f59e0b,#d97706,#f59e0b,#fbbf24,#f59e0b);
              background-size:300% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
              background-clip:text; animation:shimmer 4s linear infinite; }

        .a1{animation:fadeUp .7s cubic-bezier(.22,1,.36,1) .1s both}
        .a2{animation:fadeUp .7s cubic-bezier(.22,1,.36,1) .2s both}
        .a3{animation:fadeUp .7s cubic-bezier(.22,1,.36,1) .3s both}
        .a4{animation:fadeLeft .7s cubic-bezier(.22,1,.36,1) .15s both}
        .a5{animation:fadeRight .7s cubic-bezier(.22,1,.36,1) .15s both}

        .float-badge { animation:float 4s ease-in-out infinite; }
        .float-badge2 { animation:float 4s ease-in-out 1.8s infinite; }

        .stat-card {
          background:#fff; border:1px solid #e5e7eb; border-radius:20px;
          padding:28px 24px; text-align:center;
          transition:all .3s ease;
          box-shadow:0 1px 4px rgba(0,0,0,0.05);
        }
        .stat-card:hover {
          border-color:#fde68a; transform:translateY(-4px);
          box-shadow:0 16px 40px rgba(245,158,11,0.12);
        }

        .val-card {
          background:#fff; border:1.5px solid #e5e7eb; border-radius:18px;
          padding:24px 22px; transition:all .3s cubic-bezier(.22,1,.36,1);
          box-shadow:0 1px 4px rgba(0,0,0,0.05); cursor:default;
        }
        .val-card:hover {
          border-color:#fbbf24; transform:translateY(-5px);
          box-shadow:0 20px 48px rgba(245,158,11,0.13);
          background:#fffdf7;
        }

        .team-card {
          background:#fff; border:1.5px solid #e5e7eb; border-radius:20px;
          padding:28px 22px; transition:all .35s cubic-bezier(.22,1,.36,1);
          box-shadow:0 1px 4px rgba(0,0,0,0.05);
          position:relative; overflow:hidden;
        }
        .team-card::before {
          content:''; position:absolute; inset:0; border-radius:20px;
          background:linear-gradient(135deg,rgba(245,158,11,0.06),transparent);
          opacity:0; transition:opacity .3s ease;
        }
        .team-card:hover { border-color:#fde68a; transform:translateY(-5px); box-shadow:0 20px 48px rgba(245,158,11,0.12); }
        .team-card:hover::before { opacity:1; }

        .tl-dot {
          width:14px; height:14px; border-radius:50%;
          background:#fff; border:2.5px solid #f59e0b;
          flex-shrink:0; margin-top:4px;
          transition:all .3s ease;
          box-shadow:0 0 0 4px rgba(245,158,11,0.1);
        }
        .tl-item:hover .tl-dot {
          background:#f59e0b;
          box-shadow:0 0 0 6px rgba(245,158,11,0.15);
        }
        .tl-item { transition:all .2s ease; }
        .tl-item:hover .tl-content { transform:translateX(4px); }
        .tl-content { transition:transform .25s ease; }

        .hero-img-wrap {
          border-radius:24px; overflow:hidden; position:relative;
          box-shadow:0 24px 60px rgba(0,0,0,0.15);
        }
        .hero-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }

        .section-label {
          font-size:10px; letter-spacing:0.25em; color:#d97706;
          text-transform:uppercase; font-weight:600; margin-bottom:12px;
        }

        .divider { width:40px; height:3px; background:linear-gradient(90deg,#f59e0b,#fde68a); border-radius:2px; margin:14px 0 20px; }

        .mission-bg {
          background:linear-gradient(135deg,#1c1917 0%,#292524 50%,#1c1917 100%);
          border-radius:28px; position:relative; overflow:hidden;
        }
        .mission-bg::before {
          content:''; position:absolute; top:-40%; right:-10%;
          width:500px; height:500px; border-radius:50%;
          background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);
          pointer-events:none;
        }
      `}</style>

      <div className="ab-root">

        {/* ══ HERO ══ */}
        <section style={{ padding:"80px 0 70px", overflow:"hidden" }}>
          <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 28px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>

              {/* Left */}
              <div className="a4">
                <p className="section-label">✦ Our Story</p>
                <div className="divider" />
                <h1 className="disp" style={{ fontSize:"clamp(38px,4.5vw,58px)", fontWeight:800, lineHeight:1.1, color:"#111827", letterSpacing:"-0.02em", marginBottom:20 }}>
                  Finding a Room<br />
                  Should Be <span className="sh">Simple.</span>
                </h1>
                <p style={{ fontSize:15, color:"#4b5563", lineHeight:1.8, marginBottom:28, maxWidth:440 }}>
                  We started RoomFinder because we lived the frustration — endless calls, fake listings, and broker fees eating into savings. We built the platform we wished existed.
                </p>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                  <div style={{ padding:"10px 22px", background:"linear-gradient(135deg,#f59e0b,#d97706)", borderRadius:999, color:"#fff", fontSize:13, fontWeight:600, boxShadow:"0 4px 14px rgba(245,158,11,0.3)" }}>
                    🏠 &nbsp;Browse Rooms
                  </div>
                  <div style={{ padding:"10px 22px", background:"#fff", borderRadius:999, color:"#374151", fontSize:13, fontWeight:500, border:"1.5px solid #e5e7eb", cursor:"pointer" }}>
                    Meet the Team ↓
                  </div>
                </div>
              </div>

              {/* Right: image + floating badges */}
              <div className="a5" style={{ position:"relative" }}>
                <div className="hero-img-wrap" style={{ height:420 }}>
                  <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=85" alt="Team" />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)", pointerEvents:"none" }} />
                </div>

                {/* Floating badge 1 */}
                <div className="float-badge" style={{ position:"absolute", top:28, left:-28, background:"#fff", borderRadius:16, padding:"12px 18px", boxShadow:"0 8px 28px rgba(0,0,0,0.12)", border:"1px solid #f3f4f6", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:24 }}>🏆</span>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:"#111827" }}>Top Rated</div>
                    <div style={{ fontSize:11, color:"#6b7280" }}>2024 Startup Award</div>
                  </div>
                </div>

                {/* Floating badge 2 */}
                <div className="float-badge2" style={{ position:"absolute", bottom:36, right:-24, background:"#fff", borderRadius:16, padding:"12px 18px", boxShadow:"0 8px 28px rgba(0,0,0,0.12)", border:"1px solid #f3f4f6", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:24 }}>😊</span>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:"#111827" }}>50K+</div>
                    <div style={{ fontSize:11, color:"#6b7280" }}>Happy Tenants</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section style={{ padding:"0 0 72px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 28px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
              {[
                { end:10000, suffix:"+", label:"Rooms Listed", icon:"🏠" },
                { end:500,   suffix:"+", label:"Cities Covered", icon:"🌆" },
                { end:50000, suffix:"+", label:"Happy Tenants", icon:"😊" },
                { end:98,    suffix:"%", label:"Satisfaction Rate", icon:"⭐" },
              ].map((s,i) => (
                <div key={i} className="stat-card">
                  <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
                  <div className="disp" style={{ fontSize:32, fontWeight:800, color:"#d97706", lineHeight:1 }}>
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize:12, color:"#6b7280", marginTop:6, letterSpacing:"0.04em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MISSION ══ */}
        <section style={{ padding:"0 0 80px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 28px" }}>
            <div className="mission-bg" style={{ padding:"60px 56px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
                <div>
                  <p style={{ fontSize:10, letterSpacing:"0.25em", color:"#f59e0b", textTransform:"uppercase", fontWeight:600, marginBottom:14 }}>✦ Our Mission</p>
                  <h2 className="disp" style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:800, color:"#fff", lineHeight:1.15, marginBottom:20 }}>
                    A Home for Every <br/><span style={{ color:"#fbbf24" }}>Budget & City</span>
                  </h2>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", lineHeight:1.85 }}>
                    India has millions of students, workers, and families moving cities every year. We want every single one of them to find safe, affordable, verified housing — without brokers, without scams, without stress.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {["Eliminate fake listings from the market", "Make zero-brokerage the new normal", "Build trust between tenants and landlords", "Reach every Tier-2 and Tier-3 city in India"].map((point, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", background:"rgba(255,255,255,0.07)", borderRadius:12, border:"1px solid rgba(255,255,255,0.08)" }}>
                      <span style={{ width:22, height:22, borderRadius:"50%", background:"#f59e0b", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#1c1917", flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:13, color:"rgba(255,255,255,0.75)", fontWeight:400 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section style={{ padding:"0 0 80px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 28px" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <p className="section-label">✦ What We Stand For</p>
              <h2 className="disp" style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:800, color:"#111827", lineHeight:1.15 }}>
                Our Core <span className="sh">Values</span>
              </h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {VALUES.map((v,i) => (
                <div key={i} className="val-card"
                  onMouseEnter={()=>setHoveredVal(i)}
                  onMouseLeave={()=>setHoveredVal(null)}
                >
                  <div style={{
                    width:50, height:50, borderRadius:14, marginBottom:16,
                    background: hoveredVal===i ? "linear-gradient(135deg,#f59e0b,#d97706)" : "#fff7ed",
                    border: `1.5px solid ${hoveredVal===i ? "transparent" : "#fde68a"}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:22, transition:"all .3s ease",
                    boxShadow: hoveredVal===i ? "0 6px 18px rgba(245,158,11,0.3)" : "none",
                  }}>{v.icon}</div>
                  <h3 className="disp" style={{ fontSize:18, fontWeight:700, color:"#111827", marginBottom:8 }}>{v.title}</h3>
                  <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ══ */}
        <section style={{ padding:"0 0 80px", background:"#fff" }}>
          <div style={{ maxWidth:760, margin:"0 auto", padding:"72px 28px 0" }}>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <p className="section-label">✦ Our Journey</p>
              <h2 className="disp" style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:800, color:"#111827" }}>
                How We Got <span className="sh">Here</span>
              </h2>
            </div>

            <div style={{ position:"relative" }}>
              {/* Vertical line */}
              <div style={{ position:"absolute", left:6, top:8, bottom:8, width:2, background:"linear-gradient(to bottom,#f59e0b,#fde68a,#f59e0b)", borderRadius:2 }} />

              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {TIMELINE.map((item, i) => (
                  <div key={i} className="tl-item" style={{ display:"flex", gap:24, paddingBottom: i < TIMELINE.length-1 ? 40 : 0 }}>
                    <div className="tl-dot" />
                    <div className="tl-content">
                      <span style={{ fontSize:11, fontWeight:700, color:"#f59e0b", letterSpacing:"0.1em", textTransform:"uppercase" }}>{item.year}</span>
                      <h3 className="disp" style={{ fontSize:20, fontWeight:700, color:"#111827", margin:"4px 0 8px" }}>{item.title}</h3>
                      <p style={{ fontSize:14, color:"#6b7280", lineHeight:1.7 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section style={{ padding:"72px 0 80px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 28px" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <p className="section-label">✦ The People Behind It</p>
              <h2 className="disp" style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:800, color:"#111827" }}>
                Meet the <span className="sh">Team</span>
              </h2>
              <p style={{ fontSize:14, color:"#6b7280", marginTop:12, maxWidth:440, margin:"12px auto 0" }}>
                A small, passionate team that genuinely cares about making housing easier for everyone.
              </p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
              {TEAM.map((person, i) => (
                <div key={i} className="team-card"
                  onMouseEnter={()=>setHoveredTeam(i)}
                  onMouseLeave={()=>setHoveredTeam(null)}
                >
                  {/* Avatar */}
                  <div style={{ width:64, height:64, borderRadius:"50%", marginBottom:16,
                    background: hoveredTeam===i ? "linear-gradient(135deg,#f59e0b,#d97706)" : "#fff7ed",
                    border:`2px solid ${hoveredTeam===i?"transparent":"#fde68a"}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:28, transition:"all .3s ease",
                    boxShadow: hoveredTeam===i ? "0 8px 24px rgba(245,158,11,0.35)" : "none",
                  }}>{person.emoji}</div>

                  <h3 className="disp" style={{ fontSize:17, fontWeight:700, color:"#111827", marginBottom:4 }}>{person.name}</h3>
                  <p style={{ fontSize:11, fontWeight:600, color:"#f59e0b", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>{person.role}</p>
                  <p style={{ fontSize:11, color:"#9ca3af", marginBottom:12 }}>📍 {person.city}</p>
                  <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.65 }}>{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ padding:"0 0 80px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 28px" }}>
            <div style={{
              background:"linear-gradient(135deg,#fffbeb 0%,#fef3c7 50%,#fffbeb 100%)",
              border:"1.5px solid #fde68a", borderRadius:28,
              padding:"60px 48px", textAlign:"center",
              position:"relative", overflow:"hidden",
            }}>
              {/* Decorative circles */}
              <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(245,158,11,0.08)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-40, left:-40, width:150, height:150, borderRadius:"50%", background:"rgba(245,158,11,0.06)", pointerEvents:"none" }} />

              <p style={{ fontSize:10, letterSpacing:"0.25em", color:"#d97706", textTransform:"uppercase", fontWeight:600, marginBottom:14 }}>✦ Join Us</p>
              <h2 className="disp" style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:800, color:"#111827", marginBottom:16, lineHeight:1.2 }}>
                Ready to Find Your<br/> Perfect Room?
              </h2>
              <p style={{ fontSize:14, color:"#78350f", maxWidth:420, margin:"0 auto 32px", lineHeight:1.7 }}>
                Thousands of verified rooms across India. Start your search today — it's free.
              </p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <button style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, padding:"14px 34px", borderRadius:999, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"#fff", boxShadow:"0 6px 20px rgba(245,158,11,0.35)", transition:"all .25s ease" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(245,158,11,0.45)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 20px rgba(245,158,11,0.35)";}}>
                  🔍 &nbsp;Browse Rooms
                </button>
                <button style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14, padding:"14px 34px", borderRadius:999, cursor:"pointer", background:"#fff", color:"#374151", border:"1.5px solid #e5e7eb", transition:"all .25s ease" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#fde68a";e.currentTarget.style.color="#d97706";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.color="#374151";}}>
                  ➕ &nbsp;List Your Room
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}