import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
}

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,

    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        }, 
    },
});

export const { setMessage } = analyticsSlice.actions;
export default analyticsSlice.reducer;