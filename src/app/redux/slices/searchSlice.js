import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from '../../../shared/api/axios';

export const fetchSearchResults = createAsyncThunk(
    "search/fetchSearchResults",
    async (searchParams) => {
        const {data} = await instance.get(`/search/search/?title=${searchParams}`);
        return data;
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        results: [],
        query: "",
        status: "idle",
        error: null,
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;


