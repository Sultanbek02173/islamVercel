import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StoreService from '../../../shared/api/service';

export const fetchPageData = createAsyncThunk(
  'nav/fetchPageData',
  async (page) => {
    const response = await StoreService.getPageData(page);
    return response.data;
  }
);

const initialState = {
  navElements: [],
  selected: null,
  selectedSub: null,
  page: 'Наука',
  isLoading: false,
  isError: null,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setSelectedSub: (state, action) => {
      state.selectedSub = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPageData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.navElements = action.payload.navElements;
        state.page = action.payload.page;

        
        if (action.meta.arg === 'activity') {
          state.selected = null;
          state.selectedSub = null;
        } else {
          state.selected = 0;
          state.selectedSub = state.navElements[0]?.twoLink?.length > 0 ? 0 : null;
        }
      })
      .addCase(fetchPageData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const { setSelected, setSelectedSub } = navSlice.actions;

export default navSlice.reducer;
