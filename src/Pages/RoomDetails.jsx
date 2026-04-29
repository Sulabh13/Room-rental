import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

/* ── SVG ICONS ── */
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconHeart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconVideo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconStar = ({ filled, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconSpinner = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" opacity="0.4"/>
    <path d="M12 2v4" className="animate-spin" style={{transformOrigin:"center"}}/>
  </svg>
);

const IconZoomIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);

const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

/* ── LIGHTBOX COMPONENT ── */
const Lightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const goPrev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [goPrev, goNext, onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white border border-white/30 hover:bg-white/10 rounded-full w-10 h-10 flex items-center justify-center text-lg transition z-10"
      >
        ✕
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-xs border border-white/20 px-3 py-1 rounded-full tracking-wide">
        {current + 1} / {images.length}
      </div>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 sm:left-6 text-white border border-white/30 hover:bg-white/10 rounded-full w-11 h-11 flex items-center justify-center text-2xl transition z-10"
        >
          ‹
        </button>
      )}

      <img
        src={images[current]}
        alt={`fullscreen-${current}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg select-none"
      />

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 sm:right-6 text-white border border-white/30 hover:bg-white/10 rounded-full w-11 h-11 flex items-center justify-center text-2xl transition z-10"
        >
          ›
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-lb-${i}`}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`h-14 w-20 object-cover rounded cursor-pointer flex-shrink-0 border-2 transition ${
                i === current ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── BUTTON VARIANTS ── */
const BtnPrimary = ({ onClick, disabled, children, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 bg-gray-900 hover:bg-black disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${className}`}
  >
    {children}
  </button>
);

const BtnOutline = ({ onClick, disabled, children, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 bg-white hover:bg-gray-50 disabled:opacity-50 text-gray-900 border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${className}`}
  >
    {children}
  </button>
);

/* ── MAIN COMPONENT ── */
const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchRoom = async () => {
    try {
      const res = await API.get(`/rooms/${id}`);
      setRoom(res.data);
    } catch (error) {
      console.error("Fetch room error:", error);
      showToast("Failed to load room details.", "error");
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const handleCall = () => {
    if (!room?.owner?.phone) {
      showToast("Owner ka phone number available nahi hai.", "error");
      return;
    }
    window.location.href = `tel:${room.owner.phone}`;
  };

  const handleLocation = () => {
    const address = `${room?.location}, ${room?.city}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank");
  };

  const submitReview = async () => {
    if (!token) {
      showToast("Please login to submit a review.", "error");
      navigate("/login");
      return;
    }
    if (!comment.trim()) {
      showToast("Please write a comment before submitting.", "error");
      return;
    }
    setReviewLoading(true);
    try {
      await API.post(`/reviews/${id}`, {
        rating: Number(rating),
        comment: comment.trim(),
      });
      setComment("");
      setRating(5);
      showToast("Review submitted successfully!");
    } catch (error) {
      const msg = error.response?.data?.message;
      if (error.response?.status === 400 && msg === "You have already reviewed this room") {
        showToast("You have already reviewed this room.", "error");
      } else if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        navigate("/login");
      } else {
        showToast(msg || "Failed to submit review.", "error");
      }
    } finally {
      setReviewLoading(false);
    }
  };

  const addWishlist = async () => {
    if (!token) {
      showToast("Please login to add to wishlist.", "error");
      navigate("/login");
      return;
    }
    setWishlistLoading(true);
    try {
      await API.post(`/wishlist/${id}`);
      showToast("Added to wishlist!");
    } catch (error) {
      const msg = error.response?.data?.message;
      if (error.response?.status === 400 && msg === "Room already in wishlist") {
        showToast("Room is already in your wishlist.", "error");
      } else if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        navigate("/login");
      } else {
        showToast(msg || "Failed to add to wishlist.", "error");
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  if (!room) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] ">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading room details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 pt-36">
      {/* ── LIGHTBOX ── */}
      {lightbox.open && room.images?.length > 0 && (
        <Lightbox images={room.images} startIndex={lightbox.index} onClose={closeLightbox} />
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[999] px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ${
            toast.type === "success" ? "bg-gray-900" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ── MAIN SWIPER ── */}
      <div className="relative group pt-20">
        <Swiper
          modules={[Navigation, Thumbs, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="rounded-xl overflow-hidden cursor-zoom-in"
        >
          {room.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`room-${index}`}
                onClick={() => openLightbox(index)}
                className="w-full h-[260px] sm:h-[380px] md:h-[460px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition">
          <IconZoomIn /> Click to enlarge
        </div>
      </div>

      {/* ── THUMBNAIL SWIPER ── */}
      {room.images?.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          watchSlidesProgress
          className="mt-3"
        >
          {room.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`thumb-${index}`}
                onClick={() => openLightbox(index)}
                className="h-20 w-full object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-900 transition"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* ── VIDEO SECTION ── */}
      {room.video_url && (
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700">
              <IconVideo />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Room Tour Video</h2>
              <p className="text-xs text-gray-400">Watch the room walkthrough</p>
            </div>
          </div>
          <video
            src={room.video_url.replace(".mov", ".mp4").replace(".MOV", ".mp4")}
            controls
            poster={room.images?.[0]}
            className="w-full rounded-xl max-h-[460px] bg-black object-contain"
          />
        </div>
      )}

      {/* ── ROOM INFO + OWNER ── */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Left: Room Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{room.title}</h1>
          <p className="text-gray-500 mt-2 text-sm flex items-center gap-1.5">
            <IconMapPin />
            {room.city} · {room.location}
          </p>
          <p className="text-gray-900 text-2xl font-bold mt-3">
            ₹{room.price?.toLocaleString()}
            <span className="text-base font-normal text-gray-400 ml-1">/ month</span>
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-700">
            <p>
              <span className="text-gray-400 font-medium">Room Type</span>
              <span className="mx-2 text-gray-200">|</span>
              {room.room_type}
            </p>
            <p>
              <span className="text-gray-400 font-medium">Furnished</span>
              <span className="mx-2 text-gray-200">|</span>
              {room.furnished ? "Yes" : "No"}
            </p>
          </div>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed">{room.description}</p>

          {/* ── ACTION BUTTONS ── */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <BtnPrimary onClick={addWishlist} disabled={wishlistLoading}>
              {wishlistLoading
                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <IconHeart />}
              {wishlistLoading ? "Adding..." : "Save"}
            </BtnPrimary>

            <BtnOutline onClick={handleCall}>
              <IconPhone />
              {room?.owner?.phone ? room.owner.phone : "Call Owner"}
            </BtnOutline>

            <BtnOutline onClick={handleLocation}>
              <IconMapPin />
              View on Map
            </BtnOutline>
          </div>
        </div>

        {/* Right: Owner Card */}
        {room?.owner && (
          <div className="border border-gray-200 rounded-xl p-5 h-fit bg-white">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <IconHome />
              Owner Details
            </h3>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-base">
                {room.owner.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{room.owner.name}</p>
                <p className="text-xs text-gray-400">Property Owner</p>
              </div>
            </div>

            <div className="space-y-2.5 mb-5">
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <IconPhone />
                <span>{room.owner.phone || "Not available"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-600">
                <IconMapPin />
                <span>{room.location}, {room.city}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <BtnPrimary onClick={handleCall} className="w-full">
                <IconPhone />
                Call Owner
              </BtnPrimary>
              <BtnOutline onClick={handleLocation} className="w-full">
                <IconMapPin />
                View Location on Map
              </BtnOutline>
            </div>
          </div>
        )}
      </div>

      {/* ── WRITE A REVIEW ── */}
      <div className="mt-12">
        {user && token ? (
          <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-white">
                <IconStar filled size={14} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Write a Review</h3>
                <p className="text-xs text-gray-400">Share your experience about this room</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Your Rating</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`transition-transform hover:scale-110 ${
                      star <= rating ? "text-yellow-400" : "text-gray-200"
                    }`}
                  >
                    <IconStar filled={star <= rating} size={26} />
                  </button>
                ))}
                <span className="text-xs text-gray-400 ml-2 font-medium">{rating} / 5</span>
              </div>
            </div>

            {/* Textarea */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Your Comment</p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike about this room?"
                rows={4}
                className="border border-gray-200 w-full p-3 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none bg-white transition"
              />
              <p className="text-xs text-gray-300 mt-1 text-right">{comment.length} characters</p>
            </div>

            {/* Submit */}
            <BtnPrimary
              onClick={submitReview}
              disabled={reviewLoading || !comment.trim()}
            >
              {reviewLoading
                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <IconSend />}
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </BtnPrimary>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl p-6 bg-white text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
              <IconUser />
            </div>
            <p className="text-gray-500 text-sm">
              Please{" "}
              <a href="/login" className="text-gray-900 underline underline-offset-2 font-medium hover:text-black">
                login
              </a>{" "}
              to write a review or save to wishlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;