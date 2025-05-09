import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StoreService from '../../../shared/api/service';

export const fetchActivityData = createAsyncThunk(
  'activity/fetchData',
  async () => {
    const response = await StoreService.getActivityData();

    return response.activity;
  }
);

const initialState = {
  page: "",
  banner: {},
  navElements: [],
  selected: null,
  loading: false,
  error: null
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityData.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload.page || '';
        state.banner = action.payload.banner || {};
        state.navElements = Array.isArray(action.payload.navElements)
          ? action.payload.navElements.slice(1) // Игнорируем первый элемент
          : [];
        state.error = null;
      })
      .addCase(fetchActivityData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSelected } = activitySlice.actions;
export default activitySlice.reducer;
