import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const RoomDetails = () => {

    const { id } = useParams();

    const [room, setRoom] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    /* ================= */
    /* FETCH ROOM */
    /* ================= */

    const fetchRoom = async () => {

        try {

            const res = await API.get(`/rooms/${id}`);

            setRoom(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    /* ================= */
    /* FETCH REVIEWS */
    /* ================= */

    const fetchReviews = async () => {

        try {

            const res = await API.get(`/reviews/${id}`);

            setReviews(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchRoom();
        fetchReviews();

    }, [id]);

    /* ================= */
    /* ADD REVIEW */
    /* ================= */

    const submitReview = async () => {

        try {

            await API.post("/reviews", {
                room_id: id,
                user_id: user.id,
                rating,
                comment
            });

            setComment("");

            fetchReviews();

        } catch (error) {

            console.log(error);

        }

    };

    /* ================= */
    /* ADD WISHLIST */
    /* ================= */

    const addWishlist = async () => {

        try {

            await API.post("/wishlist", {
                user_id: user.id,
                room_id: id
            });

            alert("Added to wishlist");

        } catch (error) {

            console.log(error);

        }

    };

    if (!room) {
        return <p className="text-center p-10">Loading room...</p>;
    }

    return (

        <div className="max-w-6xl mx-auto p-6">

            {/* ================= */}
            {/* BIG IMAGE SWIPER */}
            {/* ================= */}

            <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                navigation
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                thumbs={{
                    swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null
                }}
                className="rounded-xl overflow-hidden"
            >

                {room.images?.map((img, index) => (

                    <SwiperSlide key={index}>

                        <img
                            src={img}
                            alt="room"
                            className="w-full h-[450px] object-cover"
                        />

                    </SwiperSlide>

                ))}

            </Swiper>

            {/* ================= */}
            {/* THUMBNAIL SWIPER */}
            {/* ================= */}

            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
                className="mt-4"
            >

                {room.images?.map((img, index) => (

                    <SwiperSlide key={index}>

                        <img
                            src={img}
                            alt="thumb"
                            className="h-24 w-full object-cover rounded cursor-pointer border"
                        />

                    </SwiperSlide>

                ))}

            </Swiper>

            {/* ================= */}
            {/* ROOM INFO */}
            {/* ================= */}

            <div className="grid md:grid-cols-2 gap-8 mt-8">

                <div>

                    <h1 className="text-3xl font-bold">
                        {room.title}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        📍 {room.city} • {room.location}
                    </p>

                    <p className="text-blue-600 text-2xl font-bold mt-3">
                        ₹ {room.price} / month
                    </p>

                    <div className="mt-4 space-y-2">

                        <p>
                            <b>Room Type:</b> {room.room_type}
                        </p>

                        <p>
                            <b>Furnished:</b> {room.furnished ? "Yes" : "No"}
                        </p>

                    </div>

                    <p className="mt-4 text-gray-700">
                        {room.description}
                    </p>

                    <button
                        onClick={addWishlist}
                        className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg"
                    >
                        Add to Wishlist
                    </button>

                </div>

            </div>

            {/* ================= */}
            {/* REVIEWS */}
            {/* ================= */}

            <div className="mt-12">

                <h2 className="text-2xl font-bold mb-4">
                    Reviews
                </h2>

                {reviews.length === 0 ? (

                    <p>No reviews yet.</p>

                ) : (

                    reviews.map((rev) => (

                        <div
                            key={rev.id}
                            className="border p-4 mb-3 rounded-lg"
                        >

                            <p className="font-semibold">
                                {rev.users?.name}
                            </p>

                            <p>⭐ {rev.rating}</p>

                            <p className="text-gray-600">
                                {rev.comment}
                            </p>

                        </div>

                    ))

                )}

            </div>

            {/* ================= */}
            {/* ADD REVIEW */}
            {/* ================= */}

            {user && (

                <div className="mt-8 border p-5 rounded-lg">

                    <h3 className="font-semibold mb-3">
                        Add Review
                    </h3>

                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="border p-2 rounded"
                    >

                        <option value="5">5 ⭐</option>
                        <option value="4">4 ⭐</option>
                        <option value="3">3 ⭐</option>
                        <option value="2">2 ⭐</option>
                        <option value="1">1 ⭐</option>

                    </select>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review..."
                        className="border w-full p-2 rounded mt-3"
                    />

                    <button
                        onClick={submitReview}
                        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
                    >
                        Submit Review
                    </button>

                </div>

            )}

        </div>

    );

};

export default RoomDetails;