import { takeEvery, put, call } from "redux-saga/effects";
import {
  fetchSongsRequest,
  getSongsFailure,
  getSongsSuccess,
} from "./slices/songSlice";

import { fetchSongs } from "./api/songApi";

function* fetchSongsHandler() {
  try {
    const songs = yield fetchSongs();
    yield put(getSongsSuccess(songs));
  } catch (err) {
    yield put(getSongsFailure(err.toString()));
  }
}
function* songWatcher() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsHandler);
}

export default function* rootSaga() {
  yield songWatcher();
}
