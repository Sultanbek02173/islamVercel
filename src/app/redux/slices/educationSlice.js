import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StoreService from '../../../shared/api/service';

export const fetchEducationData = createAsyncThunk(
    'education/fetchData',
    async () => {
        const response = await StoreService.getEducationData();
        return response.education;
    }
);

const initialState = {
    page: '',
    navElements: [],
    selected: null,
    selectedSub: null,
    isLoading: false,
    error: null
};

const educationSlice = createSlice({
    name: 'education',
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
            .addCase(fetchEducationData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEducationData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.page = action.payload?.page || '';
                const groupedNavElements = {};

                if (Array.isArray(action.payload?.allEducation)) {
                    action.payload.allEducation.forEach((item) => {
                        const titleKey = item.title || 'unknown';
                        if (!groupedNavElements[titleKey]) {
                            groupedNavElements[titleKey] = {
                                id: item.id,
                                title: item.title,
                                description: item.description || '',
                                objects: item.objects_education?.map((obj) => ({
                                    id: obj.id,
                                    name: obj.name_speciality_education,
                                    status: obj.status_education,
                                    form: obj.form_education,
                                    period: obj.perioud_education,
                                })) || [],
                                subMenu: [],
                            };
                        }
                        if (item.title2 && item.title2.trim() !== '.') {
                            groupedNavElements[titleKey].subMenu.push({
                                title: item.title2,
                                description: item.description || '',
                            });
                        }
                    });
                }

                state.navElements = Object.values(groupedNavElements).map(element => ({
                    ...element,
                    subMenu: element.subMenu || [] // Убедимся, что subMenu всегда массив
                }));
                state.education = action.payload || {};
            })
            .addCase(fetchEducationData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export const { setSelected, setSelectedSub } = educationSlice.actions;
export default educationSlice.reducer;
