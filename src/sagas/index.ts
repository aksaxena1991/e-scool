import { all, fork } from "redux-saga/effects";
import { watcherAuthSaga } from "./auth.saga";

export function* rootSaga() {
  yield all([fork(watcherAuthSaga)]);
}
