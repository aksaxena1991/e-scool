import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { doSignIn, onSignInError, onSignInSuccess } from "../redux/slices/auth.slice";

export function* doSignInSaga(action: PayloadAction<any>) {
  try {
    // const response: any = yield call(CommonService.GetPackingTypesService);
    const response: any = 'login success';
    yield put(onSignInSuccess(response));
  } catch (error) {
    yield put(onSignInError(JSON.stringify(error)));
  }
}

export function* watcherAuthSaga() {
    yield takeLatest(doSignIn.type, doSignInSaga);
  }
