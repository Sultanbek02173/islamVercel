import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StoreService from '../../../shared/api/service';

export const fetchGuideData = createAsyncThunk(
    'leadership/fetchData',
    async () => {
        const response = await StoreService.getGuideData();
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

const guideSlice = createSlice({
    name: 'guide',
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
            .addCase(fetchGuideData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGuideData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.page = action.payload.academics.page;

                state.navElements = Object.keys(action.payload.academics.data).flatMap(type => {
                    const typeData = action.payload.academics.data[type];

                    if (Array.isArray(typeData)) {
                        return typeData.map(item => ({
                            ...item,
                            data: item,
                            type: item.type?.name || type,
                            title: item.title?.trim() || 'Без названия' // Убедимся, что title всегда есть и обрезаем пробелы
                        }));
                    }
                    return [];
                }).reduce((acc, { type, title, data }) => {
                    if (type === 'Job') {
                        const jobGroup = acc.find(g => g.link === 'Job');
                        if (jobGroup) {
                            jobGroup.data.push(data);
                        } else {
                            acc.push({ link: 'Job', data: [data] });
                        }
                    } else {
                        const group = acc.find(g => g.link === type);
                        if (group) {
                            group.twoLink = group.twoLink || []; 
                            group.twoLink.push({ link: title, data }); // Используем title для twoLink
                        } else {
                            acc.push({ link: type, twoLink: [{ link: title, data }] }); // Создаем twoLink даже если оно пустое
                        }
                    }
                    return acc;
                }, []);

                state.selected = state.navElements.findIndex(item => item.twoLink && item.twoLink.length) || 0;
                state.selectedSub = state.selected >= 0 ? 0 : null;
            })
            .addCase(fetchGuideData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            });
    }
});

export const { setSelected, setSelectedSub } = guideSlice.actions;
export default guideSlice.reducer;