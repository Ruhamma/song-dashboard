import { takeEvery, put, call } from "redux-saga/effects";
import {
  fetchSongsRequest,
  getSongsFailure,
  getSongsSuccess,
  submitSongFailure,
  submitSongRequest,
  submitSongSuccess

} from "./slices/songSlice";

import { fetchSongs,submitSong } from "./api/songApi";

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
    yield put(submitSongSuccess(response));
  } catch (err) {
    yield put(submitSongFailure(err.toString()));
  }
}
function* songWatcher() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsHandler);
   yield takeEvery(submitSongRequest.type, submitSongHandler);
  
}

export default function* rootSaga() {
  yield songWatcher();
}
