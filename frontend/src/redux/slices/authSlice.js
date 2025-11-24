import createSlice from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    password: "",
}

const authslice = createSlice({
    setName: (state, action) => {
        state.name = action.payload;
    },
    setEmail: (state, action) => {
        state.email = action.payload;
    },
    setPassword: (state, action) => {
        state.password = action.payload;
    },

    resetPassword : () => initialState,
})