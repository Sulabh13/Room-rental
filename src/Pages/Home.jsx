import React, { useState } from "react";
import Hero from "../Comonentes/Hero";

const PRODUCTS = {
  Furniture: [
    { id: 1, name: "Arco Lounge Chair", price: "₹42,000", tag: "Bestseller", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", color: "#e8e0d5" },
    { id: 2, name: "Walnut Side Table", price: "₹18,500", tag: "New", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", color: "#ddd5c8" },
    { id: 3, name: "Linen Sofa Duo", price: "₹1,12,000", tag: null, img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80", color: "#e4ddd3" },
    { id: 4, name: "Woven Ottoman", price: "₹9,800", tag: "Limited", img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80", color: "#d8cfc5" },
  ],
  Antique: [
    { id: 5, name: "Brass Cabinet Handle", price: "₹3,200", tag: "Vintage", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80", color: "#e2d9c8" },
    { id: 6, name: "Colonial Writing Desk", price: "₹68,000", tag: "Rare", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80", color: "#dbd2c1" },
    { id: 7, name: "Teak Rocking Chair", price: "₹31,500", tag: null, img: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&q=80", color: "#e0d8cc" },
    { id: 8, name: "Copper Wall Clock", price: "₹7,400", tag: "New", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", color: "#d5ccbf" },
  ],
  Souvenir: [
    { id: 9, name: "Rajasthani Miniature", price: "₹2,100", tag: "Handmade", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80", color: "#e6ddd2" },
    { id: 10, name: "Blue Pottery Vase", price: "₹4,500", tag: "Artisan", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80", color: "#ddd6cc" },
    { id: 11, name: "Marble Elephant Pair", price: "₹6,800", tag: null, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", color: "#e2dbd2" },
    { id: 12, name: "Tribal Wall Mask", price: "₹3,900", tag: "Limited", img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80", color: "#d9d1c7" },
  ],
  Lamps: [
    { id: 13, name: "Rattan Pendant Light", price: "₹8,200", tag: "Trending", img: "https://images.unsplash.com/photo-1513506003901-1e6a35fb3ac0?w=600&q=80", color: "#e5ddd0" },
    { id: 14, name: "Concrete Table Lamp", price: "₹5,600", tag: "New", img: "https://images.unsplash.com/photo-1558618047-f4e73c5d4b74?w=600&q=80", color: "#ddd7ce" },
    { id: 15, name: "Brass Arc Floor Lamp", price: "₹22,000", tag: null, img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80", color: "#e0d9d0" },
    { id: 16, name: "Terracotta Sconce", price: "₹4,100", tag: "Bestseller", img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80", color: "#dbd4ca" },
  ],
  Decorations: [
    { id: 17, name: "Linen Throw Blanket", price: "₹3,400", tag: "Cozy", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", color: "#e4ddd5" },
    { id: 18, name: "Macramé Wall Hanging", price: "₹2,800", tag: "Handmade", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", color: "#dcd6cc" },
    { id: 19, name: "Dried Pampas Bunch", price: "₹1,600", tag: "New", img: "https://images.unsplash.com/photo-1487530811015-780a9e31b19c?w=600&q=80", color: "#e1dcd4" },
    { id: 20, name: "Ceramic Candle Set", price: "₹2,200", tag: null, img: "https://images.unsplash.com/photo-1602178573782-e4a0a5419baa?w=600&q=80", color: "#d8d2ca" },
  ],
  Cupboard: [
    { id: 21, name: "Oak Wardrobe 3-Door", price: "₹88,000", tag: "New", img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80", color: "#e3dcd4" },
    { id: 22, name: "Rattan Bookshelf", price: "₹24,500", tag: null, img: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", color: "#dbd5cc" },
    { id: 23, name: "Floating Wall Unit", price: "₹36,000", tag: "Trending", img: "https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=600&q=80", color: "#e0dad2" },
    { id: 24, name: "Vintage Sideboard", price: "₹52,000", tag: "Rare", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", color: "#d6d0c8" },
  ],
  Crafts: [
    { id: 25, name: "Hand-dyed Ikkat Cushion", price: "₹1,800", tag: "Artisan", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80", color: "#e5dfd8" },
    { id: 26, name: "Papier Mâché Bowl", price: "₹950", tag: "Handmade", img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80", color: "#ddd8d1" },
    { id: 27, name: "Bamboo Fruit Basket", price: "₹1,250", tag: null, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", color: "#e2dcd5" },
    { id: 28, name: "Warli Art Frame", price: "₹3,200", tag: "Limited", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80", color: "#d9d3cc" },
  ],
};

const NAV_ITEMS = ["Furniture", "Antique", "Souvenir", "Lamps", "Decorations", "Cupboard", "Crafts"];

export default function Home() {
  const [active, setActive] = useState("Furniture");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [addedCart, setAddedCart] = useState(null);

  const products = PRODUCTS[active] || [];

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleCart = (id) => {
    setAddedCart(id);
    setTimeout(() => setAddedCart(null), 1500);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#faf8f5", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .display { font-family: 'Cormorant Garamond', serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.15); }
        }
        @keyframes badgePop {
          from { opacity:0; transform: scale(0.7); }
          to   { opacity:1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .a1 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .a2 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.15s both; }
        .a3 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.25s both; }
        .a4 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.35s both; }

        .nav-pill {
          transition: all 0.22s ease;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 7px 18px;
          border-radius: 999px;
          border: 1.5px solid transparent;
          white-space: nowrap;
          user-select: none;
        }
        .nav-pill.active {
          background: #1a1a1a;
          color: #fff;
          border-color: #1a1a1a;
        }
        .nav-pill:not(.active) {
          color: #999;
          border-color: #e8e2dc;
        }
        .nav-pill:not(.active):hover {
          color: #1a1a1a;
          border-color: #c8bfb4;
          background: #f0ece7;
        }

        .product-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          animation: cardIn 0.5s cubic-bezier(.22,1,.36,1) both;
          position: relative;
        }
        .product-card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          transform: translateY(-4px);
        }

        .card-img-wrap {
          overflow: hidden;
          position: relative;
        }
        .card-img-wrap img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.55s cubic-bezier(.22,1,.36,1);
        }
        .product-card:hover .card-img-wrap img {
          transform: scale(1.06);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,26,26,0.35) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .product-card:hover .card-overlay {
          opacity: 1;
        }

        .quick-add {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          opacity: 0;
          transition: all 0.3s ease;
          background: #fff;
          color: #1a1a1a;
          border: none;
          padding: 9px 22px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          letter-spacing: 0.04em;
        }
        .product-card:hover .quick-add {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .quick-add.added {
          background: #1a1a1a;
          color: #fff;
        }

        .wishlist-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.2s ease;
          opacity: 0;
          transform: scale(0.8);
          backdrop-filter: blur(6px);
        }
        .product-card:hover .wishlist-btn {
          opacity: 1;
          transform: scale(1);
        }
        .wishlist-btn.liked {
          opacity: 1;
          transform: scale(1);
          animation: pulse 0.4s ease;
        }

        .tag-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(255,255,255,0.92);
          color: #1a1a1a;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          animation: badgePop 0.4s ease both;
        }

        .explore-btn {
          background: #1a1a1a;
          color: #fff;
          border: none;
          padding: 13px 30px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          transition: all 0.25s ease;
          font-family: inherit;
        }
        .explore-btn:hover {
          background: #333;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(26,26,26,0.25);
        }

        .stats-strip {
          display: flex;
          gap: 0;
          border-top: 1px solid #ece6de;
          border-bottom: 1px solid #ece6de;
        }
        .stat-item {
          flex: 1;
          text-align: center;
          padding: 20px 16px;
          border-right: 1px solid #ece6de;
        }
        .stat-item:last-child { border-right: none; }

        .grid-products {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) {
          .grid-products { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 760px) {
          .grid-products { grid-template-columns: repeat(2, 1fr); }
          .card-img-wrap img { height: 200px; }
        }
        @media (max-width: 480px) {
          .grid-products { grid-template-columns: 1fr; }
        }

        .section-divider {
          width: 40px;
          height: 1px;
          background: #c8b99e;
          margin: 10px 0 18px;
        }

        .nav-scroll-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: flex-start;
        }

        .cart-icon-wrap {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 99;
        }
        .cart-fab {
          width: 52px;
          height: 52px;
          background: #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(0,0,0,0.22);
          font-size: 22px;
          transition: transform 0.2s ease;
          border: none;
        }
        .cart-fab:hover { transform: scale(1.08); }
      `}</style>

      {/* HERO SECTION */}
      <Hero />

      {/* NAV + PRODUCTS */}
      <section style={{ background: "#faf8f5", padding: "52px 0 72px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 28px" }}>

          {/* Section header + nav */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 36,
          }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#b8a485", textTransform: "uppercase", fontWeight: 500, marginBottom: 8 }}>
                ✦ Browse by Category
              </p>
              <h2 className="display" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1 }}>
                {active} <em style={{ color: "#9a8e82" }}>Collection</em>
              </h2>
            </div>

            <div className="nav-scroll-wrap">
              {NAV_ITEMS.map((item, i) => (
                <span
                  key={item}
                  className={`nav-pill ${active === item ? "active" : ""}`}
                  onClick={() => setActive(item)}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid-products">
            {products.map((p, i) => (
              <div
                key={`${active}-${p.id}`}
                className="product-card"
                style={{ animationDelay: `${i * 0.08}s` }}
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div className="card-img-wrap" style={{ background: p.color }}>
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <div className="card-overlay" />

                  {/* Tag */}
                  {p.tag && <span className="tag-badge">{p.tag}</span>}

                  {/* Wishlist */}
                  <button
                    className={`wishlist-btn ${wishlist.includes(p.id) ? "liked" : ""}`}
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                  >
                    {wishlist.includes(p.id) ? "♥" : "♡"}
                  </button>

                  {/* Quick Add */}
                  <button
                    className={`quick-add ${addedCart === p.id ? "added" : ""}`}
                    onClick={(e) => { e.stopPropagation(); handleCart(p.id); }}
                  >
                    {addedCart === p.id ? "✓ Added" : "+ Add to Cart"}
                  </button>
                </div>

                {/* Info */}
                <div style={{ padding: "16px 18px 18px" }}>
                  <p style={{ fontSize: 11, color: "#b8a485", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>
                    {active}
                  </p>
                  <h3 style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", marginBottom: 10, lineHeight: 1.3 }}>
                    {p.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="display" style={{ fontSize: 20, fontWeight: 300, color: "#1a1a1a" }}>{p.price}</span>
                    <div style={{ display: "flex", gap: 3 }}>
                      {[...Array(5)].map((_, ri) => (
                        <span key={ri} style={{ fontSize: 10, color: ri < 4 ? "#c8a96e" : "#ddd" }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <p style={{ fontSize: 13, color: "#aaa", marginBottom: 16 }}>Showing {products.length} of 40+ pieces</p>
            <button style={{
              background: "transparent",
              color: "#6b5c48",
              border: "1.5px solid #c8b99e",
              padding: "13px 38px",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.08em",
              fontFamily: "inherit",
              transition: "all 0.25s ease",
            }}
              onMouseEnter={e => { e.target.style.background = "#1a1a1a"; e.target.style.color = "#fff"; e.target.style.borderColor = "#1a1a1a"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#6b5c48"; e.target.style.borderColor = "#c8b99e"; }}
            >
              Load More
            </button>
          </div>
        </div>
      </section>

      {/* Floating Cart */}
      <div className="cart-icon-wrap">
        <button className="cart-fab" title="View Cart">
          <span style={{ fontSize: 20 }}>🛍</span>
        </button>
        {wishlist.length > 0 && (
          <div style={{
            position: "absolute",
            top: -4,
            right: -4,
            width: 20,
            height: 20,
            background: "#c8a96e",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            color: "#fff",
            fontWeight: 600,
          }}>
            {wishlist.length}
          </div>
        )}
      </div>
    </div>
  );
}