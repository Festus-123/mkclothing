import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLogsApi } from "../../api/logsApi";

export const getLogs = createAsyncThunk(
    'logs/getLogs',
    async (_, { rejectWithValue }) => {
        try {
            const result = await getLogsApi();
            return result.logs
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
);

const logSlice = createSlice({
    name: 'logs',
    initialState : {
        loading: true,
        error: null,
        success: false,
        logs: [],
    },

    reducers: {
        clearLogs: (state) => {
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getLogs.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getLogs.fulfilled, (state, action) => {
            state.loading = false
            state.logs = action.payload
        })
        .addCase(getLogs.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })
    }
})

export const { clearLogs } = logSlice.actions;
export default logSlice.reducer;