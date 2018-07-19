import { takeEvery, put, call } from 'redux-saga/effects'
import { getTokenOwner, getUserInformation } from '../api'
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from "../ducks/users";
import { logout } from '../ducks/auth'

function* fetchUserWatchFlow(action) {
  try {
    let response;
    if (action.payload) {
      response = yield call(getUserInformation, action.payload);
    } else {
      response = yield call(getTokenOwner);
    }

    yield put(fetchUserSuccess(response));
  } catch (e) {
    yield put(fetchUserFailure(e));
    yield put(logout());
  }
}

export function* fetchUserWatch() {
  yield takeEvery(fetchUserRequest, fetchUserWatchFlow);
}