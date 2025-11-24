import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice.js";
import analyticsReducer from "./slices/analyticsSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        analytics: analyticsReducer,
    },
});

export default store;