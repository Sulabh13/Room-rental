import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

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

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    /* ── TOAST ── */
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    /* ── FETCH ROOM ── */
    const fetchRoom = async () => {
        try {
            const res = await API.get(`/rooms/${id}`);
            setRoom(res.data);
        } catch (error) {
            console.error("Fetch room error:", error);
            showToast("Failed to load room details.", "error");
        }
    };

    /* ── FETCH REVIEWS ── */
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

    /* ── CALL OWNER ── */
    const handleCall = () => {
        if (!room?.owner?.phone) {
            showToast("Owner ka phone number available nahi hai.", "error");
            return;
        }
        window.location.href = `tel:${room.owner.phone}`;
    };

    /* ── OPEN GOOGLE MAPS ── */
    const handleLocation = () => {
        const address = `${room?.location}, ${room?.city}`;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, "_blank");
    };

    /* ── SUBMIT REVIEW ── */
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
            showToast("Review submitted successfully! ✅");
            fetchReviews();

        } catch (error) {
            console.error("Submit review error:", error);
            const msg = error.response?.data?.message;

            if (error.response?.status === 400 && msg === "You have already reviewed this room") {
                showToast("You have already reviewed this room.", "error");
            } else if (error.response?.status === 404) {
                showToast("Room not found.", "error");
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

    /* ── ADD WISHLIST ── */
    const addWishlist = async () => {
        if (!token) {
            showToast("Please login to add to wishlist.", "error");
            navigate("/login");
            return;
        }

        setWishlistLoading(true);

        try {
            await API.post(`/wishlist/${id}`);
            showToast("Added to wishlist! ❤️");

        } catch (error) {
            console.error("Wishlist error:", error);
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

    /* ── LOADING STATE ── */
    if (!room) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Loading room details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6">

            {/* ── TOAST NOTIFICATION ── */}
            {toast && (
                <div className={`fixed top-5 right-5 z-[999] px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.message}
                </div>
            )}

            {/* ── MAIN IMAGE SWIPER ── */}
            <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
                className="rounded-xl overflow-hidden"
            >
                {room.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`room-${index}`}
                            className="w-full h-[260px] sm:h-[380px] md:h-[460px] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

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
                                className="h-20 w-full object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 transition"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* ── ROOM INFO ── */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">{room.title}</h1>

                    <p className="text-gray-500 mt-2 text-sm">
                        📍 {room.city} • {room.location}
                    </p>

                    <p className="text-blue-600 text-2xl font-bold mt-3">
                        ₹{room.price?.toLocaleString()}{" "}
                        <span className="text-base font-normal text-gray-500">/ month</span>
                    </p>

                    <div className="mt-4 space-y-2 text-sm sm:text-base">
                        <p><b>Room Type:</b> {room.room_type}</p>
                        <p><b>Furnished:</b> {room.furnished ? "✅ Yes" : "❌ No"}</p>
                    </div>

                    <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                        {room.description}
                    </p>

                    {/* ── ACTION BUTTONS ── */}
                    <div className="mt-6 flex flex-wrap gap-3">

                        {/* WISHLIST BUTTON */}
                        <button
                            onClick={addWishlist}
                            disabled={wishlistLoading}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            {wishlistLoading ? (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <span>❤️</span>
                            )}
                            {wishlistLoading ? "Adding..." : "Wishlist"}
                        </button>

                        {/* CALL BUTTON */}
                        <button
                            onClick={handleCall}
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            📞 {room?.owner?.phone ? room.owner.phone : "Call Owner"}
                        </button>

                        {/* LOCATION BUTTON */}
                        <button
                            onClick={handleLocation}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            📍 View on Map
                        </button>

                    </div>

                </div>

                {/* ── OWNER CARD ── */}
                {room?.owner && (
                    <div className="bg-gray-50 border rounded-xl p-5 h-fit">
                        <h3 className="font-semibold text-lg mb-4">🏠 Owner Details</h3>

                        <div className="flex items-center gap-3 mb-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                                {room.owner.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{room.owner.name}</p>
                                <p className="text-xs text-gray-400">Property Owner</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <span>📞</span>
                            <span>{room.owner.phone || "Not available"}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
                            <span>📍</span>
                            <span>{room.location}, {room.city}</span>
                        </div>

                        {/* Call + Map Buttons */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleCall}
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                📞 Call Owner
                            </button>
                            <button
                                onClick={handleLocation}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                📍 View Location on Map
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── REVIEWS LIST ── */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-5">
                    Reviews{" "}
                    {reviews.length > 0 && (
                        <span className="text-gray-400 text-lg font-normal">({reviews.length})</span>
                    )}
                </h2>

                {reviews.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 border rounded-xl">
                        <p className="text-4xl mb-2">💬</p>
                        <p>No reviews yet. Be the first to review!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {reviews.map((rev) => (
                            <div key={rev.id} className="border p-4 rounded-xl hover:shadow-sm transition bg-white">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-sm">{rev.users?.name || "Anonymous"}</p>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span key={s} className={`text-base ${s <= rev.rating ? "text-yellow-400" : "text-gray-200"}`}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">{rev.comment}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(rev.created_at).toLocaleDateString("en-IN", {
                                        day: "numeric", month: "short", year: "numeric"
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── ADD REVIEW ── */}
            {user && token ? (
                <div className="mt-8 border p-5 sm:p-6 rounded-xl bg-gray-50">
                    <h3 className="font-semibold text-lg mb-4">Write a Review</h3>

                    <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-3xl transition-transform hover:scale-110 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                            >
                                ★
                            </button>
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{rating} / 5</span>
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience about this room..."
                        rows={4}
                        className="border w-full p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-white"
                    />

                    <button
                        onClick={submitReview}
                        disabled={reviewLoading || !comment.trim()}
                        className="mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                        {reviewLoading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                        {reviewLoading ? "Submitting..." : "Submit Review"}
                    </button>
                </div>
            ) : (
                <div className="mt-8 border p-5 rounded-xl bg-gray-50 text-center">
                    <p className="text-gray-500 text-sm">
                        Please{" "}
                        <a href="/login" className="text-blue-600 underline font-medium">login</a>
                        {" "}to write a review or add to wishlist.
                    </p>
                </div>
            )}

        </div>
    );
};

export default RoomDetails;