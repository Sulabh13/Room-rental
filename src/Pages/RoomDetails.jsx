import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import {
  Heart,
  Phone,
  MapPin,
  Video,
  Home,
  CheckCircle,
  XCircle,
  Map,
  User,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Search,
  Send,
  Calendar,
  LogIn,
} from "lucide-react";

/* ── LIGHTBOX COMPONENT ── */
const Lightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const goPrev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length]);

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
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/25 rounded-full w-10 h-10 flex items-center justify-center transition z-10"
      >
        <X size={18} />
      </button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-xs bg-white/10 px-3 py-1 rounded-full tracking-widest">
        {current + 1} / {images.length}
      </div>
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 sm:left-6 text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center transition z-10"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      <img
        src={images[current]}
        alt={`fullscreen-${current}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl select-none"
      />
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 sm:right-6 text-white bg-white/10 hover:bg-white/25 rounded-full w-11 h-11 flex items-center justify-center transition z-10"
        >
          <ChevronRight size={22} />
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
              className={`h-14 w-20 object-cover rounded-lg cursor-pointer flex-shrink-0 border-2 transition ${
                i === current ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── VIDEO PLAYER COMPONENT ── */
const VideoPlayer = ({ videoUrl, posterUrl }) => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const normalizeVideoUrl = (url) => {
    if (!url) return null;
    let normalizedUrl = url;
    normalizedUrl = normalizedUrl.replace(/\.(mov|MOV)$/, ".mp4");
    normalizedUrl = normalizedUrl.replace(/\\/g, "/");
    if (normalizedUrl.startsWith("/uploads/") || normalizedUrl.startsWith("uploads/")) {
      const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      normalizedUrl = `${baseUrl}/${normalizedUrl.replace(/^\//, "")}`;
    }
    return normalizedUrl;
  };

  const src = normalizeVideoUrl(videoUrl);
  if (!src) return null;

  if (videoError) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-10 text-gray-400 text-sm gap-3 border border-dashed border-gray-200">
        <AlertTriangle size={32} className="text-gray-300" />
        <p>Video could not be loaded.</p>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline text-xs font-medium flex items-center gap-1"
        >
          <ExternalLink size={12} /> Try opening directly
        </a>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black">
      {videoLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <video
        src={src}
        controls
        poster={posterUrl}
        onCanPlay={() => setVideoLoading(false)}
        onError={() => { setVideoError(true); setVideoLoading(false); }}
        className="w-full max-h-[460px] object-contain"
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

/* ── STAR RATING DISPLAY ── */
const StarDisplay = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={s <= rating ? "#FACC15" : "none"}
        stroke={s <= rating ? "#FACC15" : "#D1D5DB"}
        strokeWidth="1.5"
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ))}
  </div>
);

/* ── STAR PICKER (interactive) ── */
const StarPicker = ({ rating, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= (hovered || rating) ? "#FACC15" : "none"}
            stroke={star <= (hovered || rating) ? "#FACC15" : "#9CA3AF"}
            strokeWidth="1.5"
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </button>
      ))}
      <span className="text-sm text-gray-400 ml-1 font-medium">{hovered || rating} / 5</span>
    </div>
  );
};

/* ── MAIN COMPONENT ── */
const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
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
      showToast("Failed to load room details.", "error");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Fetch reviews error:", error);
    }
  };

  useEffect(() => {
    fetchRoom();
    fetchReviews();
  }, [id]);

  const resolveVideoUrl = () => {
    if (!room) return null;
    const possibleVideoFields = [
      room.video_url, room.video, room.videoUrl,
      room.video_path, room.videoLink, room.video_file,
    ];
    const videoUrl = possibleVideoFields.find((f) => f && f.trim() !== "");
    if (!videoUrl) return null;
    let normalizedUrl = videoUrl.replace(/\\/g, "/").replace(/\.(mov|MOV)$/, ".mp4");
    if (normalizedUrl.startsWith("uploads/") || normalizedUrl.startsWith("/uploads/")) {
      const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      normalizedUrl = `${baseUrl}/${normalizedUrl.replace(/^\//, "")}`;
    }
    return normalizedUrl;
  };

  const resolvedVideoUrl = resolveVideoUrl();

  const handleCall = () => {
    if (!room?.owner?.phone) {
      showToast("Owner's phone number is not available.", "error");
      return;
    }
    window.location.href = `tel:${room.owner.phone}`;
  };

  const handleLocation = () => {
    const query = room?.current_location || `${room?.location}, ${room?.city}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, "_blank");
  };

  const submitReview = async () => {
    if (!token) { showToast("Please login to submit a review.", "error"); navigate("/login"); return; }
    if (!comment.trim()) { showToast("Please write a comment before submitting.", "error"); return; }
    setReviewLoading(true);
    try {
      await API.post(`/reviews/${id}`, { rating: Number(rating), comment: comment.trim() });
      setComment(""); setRating(5);
      showToast("Review submitted successfully!");
      fetchReviews();
    } catch (error) {
      const msg = error.response?.data?.message;
      if (error.response?.status === 400 && msg === "You have already reviewed this room") {
        showToast("You have already reviewed this room.", "error");
      } else if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error"); navigate("/login");
      } else {
        showToast(msg || "Failed to submit review.", "error");
      }
    } finally {
      setReviewLoading(false);
    }
  };

  const addWishlist = async () => {
    if (!token) { showToast("Please login to add to wishlist.", "error"); navigate("/login"); return; }
    setWishlistLoading(true);
    try {
      await API.post(`/wishlist/${id}`);
      showToast("Added to wishlist!");
    } catch (error) {
      const msg = error.response?.data?.message;
      if (error.response?.status === 400 && msg === "Room already in wishlist") {
        showToast("Room is already in your wishlist.", "error");
      } else if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error"); navigate("/login");
      } else {
        showToast(msg || "Failed to add to wishlist.", "error");
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  if (!room) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm tracking-wide">Loading room details...</p>
        </div>
      </div>
    );
  }

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-sans">

      {/* LIGHTBOX */}
      {lightbox.open && room.images?.length > 0 && (
        <Lightbox images={room.images} startIndex={lightbox.index} onClose={closeLightbox} />
      )}

      {/* TOAST */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[999] px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
          toast.type === "success" ? "bg-black" : "bg-red-500"
        }`}>
          {toast.type === "success"
            ? <CheckCircle size={15} />
            : <XCircle size={15} />
          }
          {toast.message}
        </div>
      )}

      {/* ── TITLE + BADGES ── */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="bg-black text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
            <Home size={11} /> {room.room_type}
          </span>
          {room.furnished && (
            <span className="bg-gray-100 text-gray-600 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle size={11} /> Furnished
            </span>
          )}
          {avgRating && (
            <span className="bg-yellow-400 text-black text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
              </svg>
              {avgRating}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{room.title}</h1>
        <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
          <MapPin size={13} /> {room.city} · {room.location}
        </p>
      </div>

      {/* ── MAIN SWIPER ── */}
      <div className="relative group rounded-2xl overflow-hidden shadow-md">
        <Swiper
          modules={[Navigation, Thumbs, Autoplay]}
          navigation
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="rounded-2xl"
        >
          {room.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`room-${index}`}
                onClick={() => openLightbox(index)}
                className="w-full h-[260px] sm:h-[400px] md:h-[480px] object-cover cursor-zoom-in"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm flex items-center gap-1">
          <ZoomIn size={12} /> Click to enlarge
        </div>
      </div>

      {/* ── THUMBNAIL SWIPER ── */}
      {room.images?.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={5}
          watchSlidesProgress
          className="mt-3"
        >
          {room.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`thumb-${index}`}
                onClick={() => openLightbox(index)}
                className="h-16 w-full object-cover rounded-xl cursor-zoom-in border-2 border-transparent hover:border-black transition-all duration-200 opacity-80 hover:opacity-100"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* ── VIDEO SECTION ── */}
      {resolvedVideoUrl && (
        <div className="mt-6 bg-gray-50 rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
              <Video size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm tracking-tight">Room Tour Video</h2>
              <p className="text-xs text-gray-400">Watch the room walkthrough</p>
            </div>
          </div>
          <VideoPlayer videoUrl={resolvedVideoUrl} posterUrl={room.images?.[0]} />
        </div>
      )}

      {/* ── ROOM INFO + OWNER CARD ── */}
      <div className="grid md:grid-cols-5 gap-6 mt-8">

        {/* LEFT: Info */}
        <div className="md:col-span-3 space-y-5">

          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-gray-900 tracking-tight">
              ₹{room.price?.toLocaleString()}
            </span>
            <span className="text-gray-400 text-sm mb-1 font-medium">/ month</span>
          </div>

          {/* Quick facts */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl px-3 py-2 text-sm font-medium text-gray-700">
              <Home size={14} /> {room.room_type}
            </div>
            <div className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium ${room.furnished ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {room.furnished
                ? <><CheckCircle size={14} /> Furnished</>
                : <><XCircle size={14} /> Unfurnished</>
              }
            </div>
            {room.current_location && (
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-xl px-3 py-2 text-sm font-medium max-w-xs truncate">
                <Map size={14} className="shrink-0" />
                <span className="truncate">{room.current_location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">About this room</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{room.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-1">

            {/* Wishlist */}
            <button
              onClick={addWishlist}
              disabled={wishlistLoading}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm"
            >
              {wishlistLoading
                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Heart size={15} fill="currentColor" className="text-red-400" />
              }
              {wishlistLoading ? "Adding..." : "Wishlist"}
            </button>

            {/* Call */}
            <button
              onClick={handleCall}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm"
            >
              <Phone size={15} />
              {room?.owner?.phone || "Call Owner"}
            </button>

            {/* Map */}
            <button
              onClick={handleLocation}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm"
            >
              <MapPin size={15} /> View on Map
            </button>
          </div>
        </div>

        {/* RIGHT: Owner Card */}
        {room?.owner && (
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm sticky top-6">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-4">Property Owner</p>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                  {room.owner.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{room.owner.name}</p>
                  <p className="text-xs text-gray-400">Listed owner</p>
                </div>
              </div>
              <div className="space-y-2 mb-5 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span>{room.owner.phone || "Not available"}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <span>{room.location}, {room.city}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCall}
                  className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Phone size={14} /> Call Owner
                </button>
                <button
                  onClick={handleLocation}
                  className="w-full border border-gray-200 hover:border-black hover:bg-gray-50 text-gray-800 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MapPin size={14} /> View Location
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── REVIEWS SECTION ── */}
      <div className="mt-14">
        <div className="flex items-end gap-4 mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <MessageSquare size={20} /> Reviews
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FACC15" className="w-4 h-4">
                <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
              </svg>
              <span className="text-gray-800 font-bold text-sm">{avgRating}</span>
              <span className="text-gray-400 text-sm">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <MessageSquare size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                      <User size={15} />
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">{rev.users?.name || "Anonymous"}</p>
                  </div>
                  <StarDisplay rating={rev.rating} />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{rev.comment}</p>
                <p className="text-xs text-gray-300 mt-2 flex items-center gap-1">
                  <Calendar size={11} />
                  {new Date(rev.created_at).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── WRITE A REVIEW ── */}
      {user && token ? (
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-extrabold text-gray-900 text-base tracking-tight mb-5 flex items-center gap-2">
            <Search size={16} /> Write a Review
          </h3>

          <div className="mb-5">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Your Rating</p>
            <StarPicker rating={rating} onChange={setRating} />
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Your Experience</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience about this room..."
              rows={4}
              className="w-full border border-gray-200 focus:border-black focus:ring-0 focus:outline-none rounded-xl p-4 text-sm text-gray-700 placeholder-gray-300 resize-none transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          <button
            onClick={submitReview}
            disabled={reviewLoading || !comment.trim()}
            className="flex items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-40 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            {reviewLoading
              ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <Send size={14} />
            }
            {reviewLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      ) : (
        <div className="mt-8 bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-1.5">
            <LogIn size={14} />
            Please{" "}
            <a href="/login" className="text-black underline font-semibold underline-offset-2">
              login
            </a>{" "}
            to write a review or add to wishlist.
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;