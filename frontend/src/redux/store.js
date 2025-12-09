import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice.js";
import analyticsReducer from "./slices/analyticsSlice.js";
import navbarReducer from './slices/navbarSlice.js'
import productReducer from './slices/productsSlice.js'
import logReducer from './slices/logSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        analytics: analyticsReducer,
        navbar: navbarReducer,
        products: productReducer,
        logs: logReducer,
    },
});

export default store;