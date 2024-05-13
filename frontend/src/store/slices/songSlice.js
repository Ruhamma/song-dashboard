import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  loading: false,
  success: true,
  error: null,
  selectedSongId: null,
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
      state.songs.push(action.payload);
    },
    submitSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action) {
      state.loading = false;
      const updatedSong = action.payload;
      state.songs = state.songs.map((song) =>
        song._id === updatedSong._id ? updatedSong : song
      );
    },
    updateSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSongRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteSongSuccess(state, action) {
      state.loading = false;
      const deletedSongId = action.payload.deletedSongId;
      state.songs = state.songs.filter((song) => song._id !== deletedSongId);
    },

    deleteSongFailure(state, action) {
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
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongFailure,
  updateSongSuccess,
  updateSongRequest,
} = songSlice.actions;
