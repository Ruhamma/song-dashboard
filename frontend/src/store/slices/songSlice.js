import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  loading: false,
  error: null,
};


const songSlice = createSlice({
    name:"song",
    initialState,
    reducers:{
        fetchSongsRequest(state){
            state.loading = true;
            state.error = null;
        },
        getSongsSuccess(state,action){
            state.loading = false;
            state.songs = action.payload;
        },
        getSongsFailure(state,action){
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default songSlice.reducer;
export const {fetchSongsRequest,getSongsSuccess,getSongsFailure} = songSlice.actions;
