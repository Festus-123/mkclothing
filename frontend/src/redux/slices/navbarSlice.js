import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: 'navbar',
    initialState : {
        isCollapsed: false,
    },

    reducers: {
        toggleCollapse: (state) => {
            state.isCollapsed = !state.isCollapsed
        }
    }
})

export const { toggleCollapse } = navbarSlice.actions;
export default navbarSlice.reducer;