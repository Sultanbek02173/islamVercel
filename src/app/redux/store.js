import { configureStore } from '@reduxjs/toolkit';
import educationReducer from './slices/educationSlice';
import activityReducer from './slices/activitySlice';
import guideReducer from './slices/guideSlice';
import applicantsReducer from './slices/applicantsSlice';
import studentsReducer from './slices/studentsSlice';
import scienceReducer from "./slices/scienceSlice"
import visuallyReducer from "./slices/visually";
import aboutReducer from './slices/aboutSlice';
import homeReducer from './slices/homeSlice';
import gellaryReducer from './slices/gellarySlice';
import { createSlice } from '@reduxjs/toolkit';
import i18n from "../../i18n/i18n";
import { fetchApplicantsData } from './slices/applicantsSlice';
import { fetchEducationData } from './slices/educationSlice';
import { fetchActivityData } from './slices/activitySlice';
import { fetchGuideData } from './slices/guideSlice';
import { fetchStudentsData } from './slices/studentsSlice';
import { fetchScienceData } from './slices/scienceSlice';
import { fetchAboutData } from './slices/aboutSlice';
import { fetchBannerData, fetchNewsData, fetchMagazinesData } from './slices/homeSlice';
import searchReducer from "./slices/searchSlice";

const languageSlice = createSlice({
  name: 'language',
  initialState: { current: 'ru' },
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

const store = configureStore({
  reducer: {
    education: educationReducer,
    activity: activityReducer,
    guide: guideReducer,
    applicants: applicantsReducer,
    students: studentsReducer,
    science: scienceReducer,
    visually: visuallyReducer,
    about: aboutReducer,
    home: homeReducer,
    gallery: gellaryReducer,
    language: languageSlice.reducer,
    search: searchReducer,
  },
});

i18n.on('languageChanged', (lng) => {
  store.dispatch(fetchApplicantsData());
  store.dispatch(fetchEducationData());
  store.dispatch(fetchActivityData());
  store.dispatch(fetchGuideData()); 
  store.dispatch(fetchStudentsData()); 
  store.dispatch(fetchScienceData());
  store.dispatch(fetchAboutData());
  store.dispatch(fetchBannerData());
  store.dispatch(fetchNewsData());
  store.dispatch(fetchMagazinesData()); 
});

export default store;
