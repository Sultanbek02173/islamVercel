import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StoreService from '../../../shared/api/service';

export const fetchApplicantsData = createAsyncThunk(
    'applicants/fetchData',
    async () => {
        const response = await StoreService.getApplicantsData();
        return response.academics;
    }
);

const initialState = {
    page: '',
    navElements: [],
    selected: null,
    loading: false,
    error: null
};

const applicantsSlice = createSlice({
    name: 'applicants',
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplicantsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplicantsData.fulfilled, (state, action) => {
                state.loading = false;

                const { page, data } = action.payload;

                state.page = page || '';
                state.navElements = Array.isArray(data)
                    ? data.map(item => ({
                        ...item,
                        link: item.title
                    }))
                    : [];
                state.selected = state.navElements.length > 0 ? 0 : null;
                state.error = null;
            })
            .addCase(fetchApplicantsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setSelected } = applicantsSlice.actions;
export default applicantsSlice.reducer;
