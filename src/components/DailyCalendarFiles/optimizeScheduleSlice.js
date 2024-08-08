import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { constant } from '../../constant';

export const fetchScheduleData = createAsyncThunk('fetchScheduleData', async ({ date }) => {
    try {
        const response = await axios.get(`${constant.baseUrl}api/optimize-schedule?date=${date}`);
        return response?.data?.payload;
    } catch (error) {
        throw error;
    }
});

const optimizeScheduleSlice = createSlice({
    name: 'optimizeScheduleData',
    initialState: {
        data: {},
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScheduleData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchScheduleData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchScheduleData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = {};
                state.error = action.error.message;
            });
    },
});

export default optimizeScheduleSlice.reducer;
