import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StoreService from '../../../shared/api/service';

export const fetchAboutData = createAsyncThunk(
  'about/fetchData',
  async () => {
    const response = await StoreService.getAboutData();
    return response;
  }
);

const initialState = {
  page: '',
  navElements: [],
  selected: null,
  selectedSub: null,
  isLoading: false,
  error: null,
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
      state.selectedSub = null;
    },
    setSelectedSub: (state, action) => {
      state.selectedSub = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.page = action.payload?.page || 'Об Академии';

        const payload = action.payload;

        if (!payload || typeof payload !== 'object' || !Array.isArray(payload.activity?.navElements)) {
          console.error('Invalid payload structure:', payload);
          state.navElements = [];
          state.error = 'No navigation elements found';
          return;
        }

        const groupedNavElements = payload.activity.navElements.map((section) => ({
          id: section.id,
          link: section.link,
          cards: Array.isArray(section.cards)
            ? section.cards.map((card) => ({
              page_key: card.page_key,
              title_main: card.title_main,
              title2: card.title2,
              title_page: card.title_page,
              description: card.description,
              links_carta: card.links_carta,
              adres: card.adres,
              number: card.number,
              rab: card.rab,
              about_object: card.about_object || [],
              about_object_pdf: card.about_object_pdf || [],
            }))
            : [],
          subMenu: Array.isArray(section.cards)
            ? section.cards.map((card) => card.title2).filter(Boolean)
            : [],
        }));

        state.navElements = groupedNavElements;
        state.page = payload.activity.page;
        state.selected = null;
        state.selectedSub = null;
        state.error = null;
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelected, setSelectedSub } = aboutSlice.actions;
export default aboutSlice.reducer;
