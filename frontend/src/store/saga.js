import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  fetchSongsRequest,
  getSongsFailure,
  getSongsSuccess,
  submitSongFailure,
  submitSongRequest,
  submitSongSuccess,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongRequest,
  updateSongFailure,
  updateSongSuccess,
} from "./slices/songSlice";

import { fetchSongs, submitSong, deleteSong, updateSong } from "./api/songApi";

function* fetchSongsHandler() {
  try {
    const songs = yield fetchSongs();
    yield put(getSongsSuccess(songs));
  } catch (err) {
    yield put(getSongsFailure(err.toString()));
  }
}

function* submitSongHandler(action) {
  try {
    const response = yield call(submitSong, action.payload);
    yield put(updateSongSuccess(response));
  } catch (err) {
    yield put(updateSongFailure(err.toString()));
  }
}

function* updateSongHandler(action) {
  try {
    const { songId, songData } = action.payload;
    const response = yield call(updateSong, songId, songData);
    yield put(submitSongSuccess(response));
  } catch (err) {
    yield put(submitSongFailure(err.toString()));
  }
}

function* deleteSongHandler(action) {
  try {
    yield call(deleteSong, action.payload);
    yield put(deleteSongSuccess());
  } catch (err) {
    yield put(deleteSongFailure(err.toString()));
  }
}
function* songWatcher() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsHandler);
  yield takeEvery(submitSongRequest.type, submitSongHandler);
  yield takeEvery(deleteSongRequest.type, deleteSongHandler);
  yield takeEvery(updateSongRequest.type, updateSongHandler);
}

export default function* rootSaga() {
  yield songWatcher();
}
