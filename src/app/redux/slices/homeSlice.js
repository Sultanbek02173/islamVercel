import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StoreService from '../../../shared/api/service';

export const fetchBannerData = createAsyncThunk(
    'settings/fetchBannerData',
    async () => {
        const response = await StoreService.getBannerData();
        return response;
    }
);

export const fetchNewsData = createAsyncThunk(
    'home/fetchNewsData',
    async () => {
        const response = await StoreService.getNewsData();
      
        
        return response;
    }
);

export const fetchMagazinesData = createAsyncThunk(
    'home/fetchMagazinesData',
    async () => {
        const response = await StoreService.getMagazinesData();
        return response;
    }
);

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        banner: [],
        news: [],
        magazines: [],
        status: 'idle',
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBannerData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBannerData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.banner = action.payload;
            })
            .addCase(fetchBannerData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchNewsData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewsData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.news = action.payload;
            })
            .addCase(fetchNewsData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchMagazinesData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMagazinesData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.magazines = action.payload;
            })
            .addCase(fetchMagazinesData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default homeSlice.reducer;
