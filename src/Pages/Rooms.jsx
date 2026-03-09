import React, { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════
   SLIDESHOW COMPONENT
══════════════════════════════════════ */
function RoomSlider({ images, isHovered, height = 230, radius = "20px 20px 0 0" }) {
  const [cur, setCur] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    clearInterval(timer.current);
    if (isHovered && images.length > 1) {
      timer.current = setInterval(() => setCur(p => (p + 1) % images.length), 2500);
    } else {
      setCur(0);
    }
    return () => clearInterval(timer.current);
  }, [isHovered, images.length]);

  const prev = e => { e.stopPropagation(); clearInterval(timer.current); setCur(p => (p - 1 + images.length) % images.length); };
  const next = e => { e.stopPropagation(); clearInterval(timer.current); setCur(p => (p + 1) % images.length); };
  const goTo = (i, e) => { e.stopPropagation(); clearInterval(timer.current); setCur(i); };

  return (
    <div style={{ position: "relative", height, overflow: "hidden", borderRadius: radius }}>
      {images.map((src, i) => (
        <img key={i} src={src} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          opacity: i === cur ? 1 : 0,
          transform: i === cur ? "scale(1.05)" : "scale(1)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }} />
      ))}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />

      {isHovered && images.length > 1 && (<>
        <button onClick={prev} className="slider-arrow" style={{ left: 10 }}>‹</button>
        <button onClick={next} className="slider-arrow" style={{ right: 10 }}>›</button>
      </>)}

      {images.length > 1 && (
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 3 }}>
          {images.map((_, i) => (
            <button key={i} onClick={e => goTo(i, e)} style={{
              height: 5, width: i === cur ? 18 : 5, borderRadius: 999, border: "none", padding: 0, cursor: "pointer",
              background: i === cur ? "#f59e0b" : "rgba(255,255,255,0.5)",
              boxShadow: i === cur ? "0 0 7px rgba(245,158,11,0.8)" : "none",
              transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
            }} />
          ))}
        </div>
      )}
      <div style={{ position: "absolute", bottom: 11, right: 12, zIndex: 3, fontSize: 10, fontWeight: 500,
        color: "rgba(255,255,255,0.85)", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)",
        padding: "3px 8px", borderRadius: 999 }}>
        {cur + 1} / {images.length}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ROOM DETAIL MODAL
══════════════════════════════════════ */
function RoomModal({ room, onClose }) {
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!room) return null;

  const AMENITY_ICONS = { WiFi:"📶", AC:"❄️", Furnished:"🛋️", Parking:"🚗", Balcony:"🌅", Meals:"🍽️", Kitchen:"🍳", Gym:"💪", Laundry:"👕" };
  const rules  = ["No smoking inside", "No loud music after 10 PM", "Guests allowed till 9 PM", "Maintain common area cleanliness"];
  const nearby = ["🏥 City Hospital — 0.8 km", "🚌 Bus Stand — 0.4 km", "🛒 Big Bazaar — 1.2 km", "🏫 College — 1.5 km"];
  const reviews = [
    { name:"Rahul M.", stars:5, text:"Great place, very clean and owner is very cooperative.", date:"Jan 2025" },
    { name:"Priya S.", stars:4, text:"Good location and well furnished. WiFi speed could be better.", date:"Dec 2024" },
    { name:"Aman K.", stars:5, text:"Highly recommend! Peaceful neighborhood and great amenities.", date:"Nov 2024" },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
      animation: "bfadeIn 0.3s ease both",
    }} onClick={e => e.target === e.currentTarget && onClose()}>

      <div style={{
        width: "100%", maxWidth: 860,
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "24px 24px 0 0",
        maxHeight: "92vh",
        overflowY: "auto",
        animation: "slideUp 0.45s cubic-bezier(.22,1,.36,1) both",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.15)",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(245,158,11,0.4) transparent",
      }}>

        {/* Image slider */}
        <div style={{ position: "relative" }}>
          <RoomSlider images={room.images} isHovered={true} height={320} radius="24px 24px 0 0" />

          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16, zIndex: 10,
            width: 38, height: 38, borderRadius: "50%", border: "none",
            background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
            color: "#374151", fontSize: 16, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="#ef4444"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.9)"; e.currentTarget.style.color="#374151"; }}
          >✕</button>

          <span style={{
            position: "absolute", top: 16, left: 16, zIndex: 10,
            fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
            padding: "5px 12px", borderRadius: 999, backdropFilter: "blur(8px)",
            background: room.available ? "rgba(16,185,129,0.85)" : "rgba(239,68,68,0.85)",
            color: "#fff",
          }}>
            {room.available ? "● Available Now" : "● Currently Occupied"}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 40px" }}>

          {/* Title row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16, marginBottom:20 }}>
            <div>
              <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.14em", color:"#f59e0b", textTransform:"uppercase" }}>{room.type}</span>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(22px,3vw,30px)", fontWeight:800, color:"#111827", margin:"6px 0 6px", lineHeight:1.2 }}>
                {room.title}
              </h2>
              <p style={{ fontSize:14, color:"#6b7280" }}>📍 {room.location}, India</p>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:34, fontWeight:800, color:"#f59e0b", lineHeight:1 }}>
                ₹{room.price.toLocaleString()}
              </div>
              <div style={{ fontSize:12, color:"#9ca3af", marginTop:3 }}>per month</div>
            </div>
          </div>

          {/* Rating bar */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24, padding:"12px 16px", borderRadius:12, background:"#fffbeb", border:"1px solid #fde68a" }}>
            <span style={{ fontSize:20 }}>⭐</span>
            <span style={{ fontSize:20, fontWeight:700, color:"#d97706" }}>{room.rating}</span>
            <span style={{ fontSize:13, color:"#6b7280" }}>({room.reviews} verified reviews)</span>
            <span style={{ marginLeft:"auto", fontSize:12, color:"#059669", background:"#d1fae5", padding:"3px 10px", borderRadius:999 }}>Verified ✓</span>
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:4, marginBottom:24, borderBottom:"1px solid #f3f4f6" }}>
            {["overview","amenities","nearby","reviews"].map(t => (
              <button key={t} onClick={()=>setTab(t)} style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500,
                padding:"9px 18px", border:"none", background:"transparent", cursor:"pointer",
                color: tab===t ? "#f59e0b" : "#9ca3af",
                borderBottom: tab===t ? "2px solid #f59e0b" : "2px solid transparent",
                textTransform:"capitalize", transition:"all 0.2s ease", letterSpacing:"0.03em",
              }}>{t}</button>
            ))}
          </div>

          {/* Overview */}
          {tab==="overview" && (
            <div style={{ animation:"tabIn 0.3s ease both" }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:12, marginBottom:24 }}>
                {[
                  { icon:"🏠", label:"Room Type", val:room.type },
                  { icon:"📐", label:"Area", val:"180 sq ft" },
                  { icon:"🪟", label:"Furnishing", val:room.amenities.includes("Furnished")?"Fully Furnished":"Semi-Furnished" },
                  { icon:"👫", label:"Suitable For", val:"Students / Working" },
                  { icon:"🔐", label:"Deposit", val:`₹${(room.price*2).toLocaleString()}` },
                  { icon:"📅", label:"Available From", val:"Immediately" },
                ].map(item => (
                  <div key={item.label} style={{ background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ fontSize:20, marginBottom:6 }}>{item.icon}</div>
                    <div style={{ fontSize:10, color:"#9ca3af", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>{item.label}</div>
                    <div style={{ fontSize:14, fontWeight:600, color:"#111827" }}>{item.val}</div>
                  </div>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize:13, fontWeight:600, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>House Rules</h4>
                {rules.map((r,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#374151", marginBottom:8 }}>
                    <span style={{ color:"#f59e0b", fontSize:10 }}>▸</span> {r}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {tab==="amenities" && (
            <div style={{ animation:"tabIn 0.3s ease both" }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:12 }}>
                {Object.entries(AMENITY_ICONS).map(([name, icon]) => {
                  const has = room.amenities.includes(name);
                  return (
                    <div key={name} style={{
                      padding:"16px 12px", borderRadius:14, textAlign:"center",
                      background: has ? "#fffbeb" : "#f9fafb",
                      border: `1px solid ${has ? "#fde68a" : "#e5e7eb"}`,
                      opacity: has ? 1 : 0.5,
                    }}>
                      <div style={{ fontSize:26, marginBottom:8 }}>{icon}</div>
                      <div style={{ fontSize:12, fontWeight:500, color: has ? "#92400e" : "#9ca3af" }}>{name}</div>
                      {has && <div style={{ fontSize:10, color:"#059669", marginTop:4 }}>✓ Available</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Nearby */}
          {tab==="nearby" && (
            <div style={{ animation:"tabIn 0.3s ease both" }}>
              {nearby.map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", borderRadius:12,
                  background:"#f9fafb", border:"1px solid #e5e7eb", marginBottom:10 }}>
                  <span style={{ fontSize:22 }}>{item.split(" ")[0]}</span>
                  <div>
                    <div style={{ fontSize:14, fontWeight:500, color:"#111827" }}>{item.slice(item.indexOf(" ")+1).split(" — ")[0]}</div>
                    <div style={{ fontSize:12, color:"#f59e0b", fontWeight:600 }}>{item.split(" — ")[1]}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {tab==="reviews" && (
            <div style={{ animation:"tabIn 0.3s ease both" }}>
              {reviews.map((rv,i) => (
                <div key={i} style={{ padding:"16px 18px", borderRadius:14, background:"#f9fafb", border:"1px solid #e5e7eb", marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#f59e0b,#d97706)",
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff" }}>
                        {rv.name[0]}
                      </div>
                      <span style={{ fontSize:14, fontWeight:600, color:"#111827" }}>{rv.name}</span>
                    </div>
                    <span style={{ fontSize:11, color:"#9ca3af" }}>{rv.date}</span>
                  </div>
                  <div style={{ display:"flex", gap:2, marginBottom:8 }}>
                    {[1,2,3,4,5].map(s=><span key={s} style={{ fontSize:12, color:s<=rv.stars?"#f59e0b":"#d1d5db" }}>★</span>)}
                  </div>
                  <p style={{ fontSize:13, color:"#4b5563", lineHeight:1.6 }}>{rv.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div style={{ display:"flex", gap:12, marginTop:32, flexWrap:"wrap" }}>
            <button style={{
              flex:1, minWidth:140, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14,
              padding:"14px 24px", borderRadius:14, border:"none", cursor:"pointer",
              background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"#fff",
              boxShadow:"0 6px 20px rgba(245,158,11,0.3)", transition:"all 0.25s ease",
              opacity:room.available?1:0.4,
            }} disabled={!room.available}
              onMouseEnter={e=>{if(room.available)e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
            >📞 Contact Owner</button>

            <button style={{
              flex:1, minWidth:140, fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14,
              padding:"14px 24px", borderRadius:14, cursor:"pointer",
              background:"transparent", color:"#374151",
              border:"1.5px solid #d1d5db", transition:"all 0.25s ease",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#f59e0b";e.currentTarget.style.color="#d97706";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#d1d5db";e.currentTarget.style.color="#374151";}}
            >🗓️ Schedule Visit</button>

            <button style={{
              width:52, height:52, borderRadius:14, border:"1.5px solid #e5e7eb",
              background:"transparent", color:"#9ca3af", fontSize:20, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s ease",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#fca5a5";e.currentTarget.style.color="#ef4444";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.color="#9ca3af";}}
            >♡</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const ALL_ROOMS = [
  { id:1, title:"Modern Single Room", price:4000, location:"Balaghat", type:"Single", amenities:["WiFi","AC","Furnished"], rating:4.5, reviews:28, available:true,
    images:["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=700&q=80","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&q=80"] },
  { id:2, title:"Luxury Room with Balcony", price:6500, location:"Nagpur", type:"Luxury", amenities:["WiFi","AC","Balcony","Parking"], rating:4.8, reviews:54, available:true,
    images:["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=700&q=80","https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80"] },
  { id:3, title:"Budget PG Room", price:3000, location:"Jabalpur", type:"PG", amenities:["WiFi","Meals"], rating:4.1, reviews:19, available:false,
    images:["https://images.unsplash.com/photo-1586105251261-72a756497a11?w=700&q=80","https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&q=80","https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=700&q=80"] },
  { id:4, title:"2BHK Apartment Room", price:8000, location:"Bhopal", type:"Apartment", amenities:["WiFi","AC","Furnished","Parking","Gym"], rating:4.7, reviews:41, available:true,
    images:["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=80","https://images.unsplash.com/photo-1617806118233-18e1de247200?w=700&q=80","https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=700&q=80"] },
  { id:5, title:"Cozy Studio Flat", price:5500, location:"Indore", type:"Studio", amenities:["WiFi","AC","Kitchen"], rating:4.4, reviews:33, available:true,
    images:["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80","https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&q=80","https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=700&q=80"] },
  { id:6, title:"Sharing PG for Boys", price:2500, location:"Bhopal", type:"PG", amenities:["WiFi","Meals","Laundry"], rating:4.0, reviews:12, available:true,
    images:["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&q=80","https://images.unsplash.com/photo-1586105251261-72a756497a11?w=700&q=80","https://images.unsplash.com/photo-1531685250784-7569952593d2?w=700&q=80"] },
];

const TYPES = ["All","Single","PG","Luxury","Apartment","Studio"];
const ICONS = { WiFi:"📶", AC:"❄️", Furnished:"🛋️", Parking:"🚗", Balcony:"🌅", Meals:"🍽️", Kitchen:"🍳", Gym:"💪", Laundry:"👕" };

function Stars({ rating }) {
  return <span style={{ display:"inline-flex", gap:2 }}>
    {[1,2,3,4,5].map(i=><span key={i} style={{ fontSize:11, color:i<=Math.round(rating)?"#f59e0b":"#e5e7eb" }}>★</span>)}
  </span>;
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
const Rooms = () => {
  const [activeType, setActiveType] = useState("All");
  const [sortBy, setSortBy]         = useState("default");
  const [wishlist, setWishlist]     = useState([]);
  const [hoveredId, setHoveredId]   = useState(null);
  const [selected, setSelected]     = useState(null);

  const toggle = id => setWishlist(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  let list = ALL_ROOMS.filter(r => activeType==="All" || r.type===activeType);
  if (sortBy==="low")    list = [...list].sort((a,b)=>a.price-b.price);
  if (sortBy==="high")   list = [...list].sort((a,b)=>b.price-a.price);
  if (sortBy==="rating") list = [...list].sort((a,b)=>b.rating-a.rating);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .rr { font-family:'DM Sans',sans-serif; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn  { from{opacity:0;transform:translateY(18px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes bfadeIn { from{opacity:0} to{opacity:1} }
        @keyframes tabIn   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        .sh { background:linear-gradient(90deg,#f59e0b,#d97706,#f59e0b,#fbbf24,#f59e0b); background-size:300% auto;
              -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }

        .ha { animation:fadeUp .7s cubic-bezier(.22,1,.36,1) .1s both; }
        .fa { animation:fadeUp .7s cubic-bezier(.22,1,.36,1) .25s both; }

        .tp { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500; padding:7px 18px; border-radius:999px;
              letter-spacing:.04em; white-space:nowrap; border:1.5px solid #e5e7eb;
              color:#6b7280; background:#fff; cursor:pointer; transition:all .22s ease; }
        .tp:hover { color:#d97706; border-color:#fde68a; background:#fffbeb; }
        .tp.on { background:linear-gradient(135deg,#f59e0b,#d97706); border-color:transparent; color:#fff; font-weight:600; box-shadow:0 4px 14px rgba(245,158,11,.3); }

        .ss { font-family:'DM Sans',sans-serif; font-size:12.5px; color:#6b7280; background:#fff;
              border:1.5px solid #e5e7eb; border-radius:10px; padding:8px 28px 8px 14px;
              cursor:pointer; outline:none; transition:all .2s ease; appearance:none; }
        .ss:hover { border-color:#fde68a; color:#374151; }

        .rc { background:#fff; border:1px solid #e5e7eb; border-radius:20px; overflow:hidden; position:relative; cursor:pointer;
              transition:all .35s cubic-bezier(.22,1,.36,1); animation:cardIn .5s cubic-bezier(.22,1,.36,1) both;
              box-shadow:0 1px 4px rgba(0,0,0,0.06); }
        .rc:hover { border-color:#fde68a; transform:translateY(-6px);
                    box-shadow:0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(245,158,11,0.2); }

        .slider-arrow {
          position:absolute; top:50%; transform:translateY(-50%); z-index:4;
          width:32px; height:32px; border-radius:50%; border:none;
          background:rgba(255,255,255,0.9); color:#374151; font-size:17px; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 8px rgba(0,0,0,0.15); transition:all .2s;
        }
        .slider-arrow:hover { background:#f59e0b !important; color:#fff; }

        .ab { position:absolute; top:14px; left:14px; z-index:5; font-size:10px; font-weight:600;
              letter-spacing:.1em; padding:4px 10px; border-radius:999px; }
        .ay { background:rgba(16,185,129,0.85); color:#fff; }
        .an { background:rgba(239,68,68,0.8);  color:#fff; }

        .wb { position:absolute; top:14px; right:14px; z-index:5; width:34px; height:34px; border-radius:50%;
              border:none; background:rgba(255,255,255,0.92); color:#9ca3af; font-size:16px;
              cursor:pointer; display:flex; align-items:center; justify-content:center;
              box-shadow:0 2px 8px rgba(0,0,0,0.12); transition:all .2s ease; }
        .wb:hover { color:#ef4444; transform:scale(1.1); }
        .wb.lk { color:#ef4444; }

        .ac2 { font-size:10px; font-weight:500; padding:3px 9px; border-radius:6px;
               background:#f3f4f6; border:1px solid #e5e7eb; color:#6b7280; white-space:nowrap; }

        .vb { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; padding:10px 22px; border-radius:12px;
              border:none; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; cursor:pointer;
              letter-spacing:.04em; transition:all .25s ease; box-shadow:0 4px 12px rgba(245,158,11,.25); }
        .vb:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(245,158,11,.4); }
        .vb:disabled { background:#e5e7eb; color:#9ca3af; cursor:not-allowed; transform:none; box-shadow:none; }

        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(245,158,11,0.35); border-radius:99px; }
      `}</style>

      <section className="rr" style={{ background:"#f8f6f2", minHeight:"100vh", padding:"60px 0 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>

          {/* Header */}
          <div className="ha" style={{ textAlign:"center", marginBottom:48 }}>
            <p style={{ fontSize:10, letterSpacing:"0.25em", color:"#d97706", textTransform:"uppercase", fontWeight:600, marginBottom:14 }}>
              ✦ &nbsp;Verified Listings
            </p>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(36px,5vw,58px)", fontWeight:800, lineHeight:1.1, color:"#111827", letterSpacing:"-0.02em" }}>
              Available <span className="sh">Rooms</span>
            </h1>
            <p style={{ marginTop:14, fontSize:14, color:"#6b7280", maxWidth:400, margin:"14px auto 0" }}>
              {list.length} rooms found across India — pick your perfect space.
            </p>
          </div>

          {/* Filters */}
          <div className="fa" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:36 }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {TYPES.map(t=><button key={t} className={`tp ${activeType===t?"on":""}`} onClick={()=>setActiveType(t)}>{t}</button>)}
            </div>
            <div style={{ position:"relative" }}>
              <select className="ss" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="default">Sort: Default</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", color:"#9ca3af", fontSize:11, pointerEvents:"none" }}>▾</span>
            </div>
          </div>

          {/* Grid */}
          {list.length===0 ? (
            <div style={{ textAlign:"center", padding:"80px 20px", color:"#9ca3af" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🏚️</div>
              <p style={{ fontSize:16 }}>No rooms found.</p>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(330px,1fr))", gap:24 }}>
              {list.map((room,i)=>(
                <div key={room.id} className="rc" style={{ animationDelay:`${i*0.09}s` }}
                  onMouseEnter={()=>setHoveredId(room.id)}
                  onMouseLeave={()=>setHoveredId(null)}
                >
                  <div style={{ position:"relative" }}>
                    <RoomSlider images={room.images} isHovered={hoveredId===room.id} />
                    <span className={`ab ${room.available?"ay":"an"}`}>{room.available?"● Available":"● Occupied"}</span>
                    <button className={`wb ${wishlist.includes(room.id)?"lk":""}`} onClick={e=>{e.stopPropagation();toggle(room.id);}}>
                      {wishlist.includes(room.id)?"♥":"♡"}
                    </button>
                  </div>

                  <div style={{ padding:"20px 20px 22px" }}>
                    <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", color:"#f59e0b", textTransform:"uppercase" }}>{room.type}</span>
                    <h2 style={{ fontSize:17, fontWeight:600, color:"#111827", margin:"6px 0 4px", lineHeight:1.3 }}>{room.title}</h2>
                    <p style={{ fontSize:13, color:"#6b7280", marginBottom:12 }}>📍 {room.location}</p>

                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                      <Stars rating={room.rating}/>
                      <span style={{ fontSize:12, color:"#d97706", fontWeight:600 }}>{room.rating}</span>
                      <span style={{ fontSize:11, color:"#9ca3af" }}>({room.reviews} reviews)</span>
                    </div>

                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>
                      {room.amenities.map(a=><span key={a} className="ac2">{ICONS[a]||"•"} {a}</span>)}
                    </div>

                    <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:12 }}>
                      <div>
                        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:700, color:"#d97706", lineHeight:1 }}>
                          ₹{room.price.toLocaleString()}
                        </span>
                        <span style={{ fontSize:11, color:"#9ca3af", marginLeft:4 }}>/month</span>
                      </div>
                      <button className="vb" disabled={!room.available} onClick={()=>room.available && setSelected(room)}>
                        {room.available?"View Details →":"Occupied"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          <div style={{ textAlign:"center", marginTop:56 }}>
            <p style={{ fontSize:13, color:"#9ca3af", marginBottom:16 }}>Showing {list.length} of {ALL_ROOMS.length} listings</p>
            <button style={{ fontFamily:"'DM Sans',sans-serif", background:"#fff", color:"#6b7280",
              border:"1.5px solid #e5e7eb", padding:"12px 36px", borderRadius:999,
              cursor:"pointer", fontSize:13, fontWeight:500, letterSpacing:"0.06em",
              transition:"all .25s ease", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}
              onMouseEnter={e=>{e.target.style.borderColor="#fde68a";e.target.style.color="#d97706";}}
              onMouseLeave={e=>{e.target.style.borderColor="#e5e7eb";e.target.style.color="#6b7280";}}>
              Load More Rooms
            </button>
          </div>
        </div>
      </section>

      {selected && <RoomModal room={selected} onClose={()=>setSelected(null)} />}
    </>
  );
};

export default Rooms;