import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  active: false,
  hide: false,
  fontSize: 0,
  theme: "s",
  picture: "s",
  letterSpacing: "s",
  lineSpacing: "s",
  font: "s",
  Embedded: true,
  speech: false,
  loading: false,
};

const visuallySlice = createSlice({
  name: "visually",
  initialState,
  reducers: {
    activeMode(state) {
      state.active = true;
      state.hide = true;
      state.picture = "image__hide";
      state.theme = "light";
    },
    deactivateMode(state) {
      Object.assign(state, initialState);
    },
    increaseFontSize(state) {
      if (state.active && state.fontSize < 26) state.fontSize += 2;
    },
    decreaseFontSize(state) {
      if (state.active && state.fontSize > 0) state.fontSize -= 2;
    },
    handleThemeChange(state, { payload }) {
      if (state.active) state.theme = payload;
    },
    showPictures(state) {
      if (state.active) state.picture = "image__show";
    },
    hidePictures(state) {
      if (state.active) state.picture = "image__hide";
    },
    darkPictures(state) {
      if (state.active) state.picture = "image__dark";
    },
    activeSpeech(state) {
      if (state.active) state.speech = true;
    },
    unplugSpeech(state) {
      if (state.active) state.speech = false;
    },
    normalLetterSpacing(state) {
      if (state.active) state.letterSpacing = "letter__normal";
    },
    increaseLetterSpacing(state) {
      if (state.active) state.letterSpacing = "letter__average";
    },
    largeLetterSpacing(state) {
      if (state.active) state.letterSpacing = "letter__big";
    },
    normalLineSpacing(state) {
      if (state.active) state.lineSpacing = "lineH__normal";
    },
    increaseLineSpacing(state) {
      if (state.active) state.lineSpacing = "lineH__average";
    },
    largeLineSpacing(state) {
      if (state.active) state.lineSpacing = "lineH__big";
    },
    switchToSerifFont(state) {
      if (state.active) state.font = "serif";
    },
    setDefaultFont(state) {
      if (state.active) state.font = "sans-serif";
    },
    setHide(state) {
      if (state.active) state.hide = false;
    },
    setShow(state) {
      if (state.active) state.hide = true;
    },
  },
});

export const {
  activeMode,
  deactivateMode,
  increaseFontSize,
  decreaseFontSize,
  handleThemeChange,
  showPictures,
  hidePictures,
  darkPictures,
  activeSpeech,
  unplugSpeech,
  largeLetterSpacing,
  increaseLetterSpacing,
  normalLetterSpacing,
  normalLineSpacing,
  largeLineSpacing,
  increaseLineSpacing,
  switchToSerifFont,
  setDefaultFont,
  setHide,
  setShow,
} = visuallySlice.actions;
export const useVisually = () => useSelector((state) => state.visually);
export default visuallySlice.reducer;
