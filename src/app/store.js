import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import roomReducer from "../features/rooms/roomSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        rooms: roomReducer,
        reviews: reviewReducer,
        wishlist: wishlistReducer
    }
});