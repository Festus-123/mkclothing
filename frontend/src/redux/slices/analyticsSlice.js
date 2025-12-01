import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnalytics } from "../../api/analyticApi";

export  const fetchAnalyticsData = createAsyncThunk(
    'analytics/fetchAnalyticsData',
    async (_, { rejectWithValue }) => {
        try {
           const data = await fetchAnalytics();
           return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    message: "",
    loading: false,
    error: null,
    users: [],
    products: [],
    interactions: [],
    reviews: [],
}

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,

    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        }, 
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalyticsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users || [];
                state.products = action.payload.products || [];
                state.interactions = action.payload.interactions || [];
                state.reviews = action.payload.reviews || [];
            })
            .addCase(fetchAnalyticsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setMessage } = analyticsSlice.actions;
export default analyticsSlice.reducer;