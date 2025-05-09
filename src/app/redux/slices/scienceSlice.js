import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StoreService from '../../../shared/api/service';

export const fetchScienceData = createAsyncThunk(
    'ology/fetchData',
    async () => {
        const response = await StoreService.getScienceData();


        return response;
    }
);

const initialState = {
    page: '',
    navElements: [],
    selected: 0,
    selectedSub: null,
    isLoading: false,
    isError: null
};

const scienceSlice = createSlice({
    name: 'science',
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload;
            state.selectedSub = null;
        },
        setSelectedSub: (state, action) => {
            state.selectedSub = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScienceData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchScienceData.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload.societies.navElements;
                state.page = action.payload.societies.page;
                state.navElements = payload.map((item) => ({
                    id: item.id,
                    link: item.cards[0]?.title_glub || '',
                    cards: item.cards.flatMap((cardGroup) => {
                        if (Array.isArray(cardGroup)) {
                            return cardGroup.map((card) => ({
                                id: card.id,
                                title: card.title || '',
                                description: card.description || '',
                                link: card.link || '',
                                image: card.image || ''
                            }));
                        } else {
                            return {
                                title: cardGroup.title_glub || '',
                                description: cardGroup.description_glub || ''
                            };
                        }
                    })
                }));
            })
            .addCase(fetchScienceData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            });
    }
});

export const { setSelected, setSelectedSub } = scienceSlice.actions;
export default scienceSlice.reducer;
