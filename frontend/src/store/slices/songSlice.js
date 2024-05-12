import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  loading: false,
  success: true,
  error: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getSongsSuccess(state, action) {
      state.loading = false;
      state.songs = action.payload;
    },
    getSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    submitSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    submitSongSuccess(state, action) {
      state.loading = false;
      state.songs = action.payload;
    },
    submitSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default songSlice.reducer;
export const {
  fetchSongsRequest,
  getSongsSuccess,
  getSongsFailure,
  submitSongFailure,
  submitSongRequest,
  submitSongSuccess,
} = songSlice.actions;
