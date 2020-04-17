import { takeLatest, takeEvery, all, call, put, select, take } from 'redux-saga/effects';
import { formEncode } from '../../utility/request';
import { connect, subscribe } from '../live/actions';

import { userTypes } from './user.types';
import { putInitialData, signInSuccess, signUpSuccess, signUpFailure, searchGlobalComplete, signInFailure } from './user.actions';
import { selectCurrentUser, selectSocket } from "./user.selectors";
import { apiLink } from '../api.links';
const url = apiLink;
export function* addUserAsync(item) {

}
export function* addUserStart() {
  yield takeLatest(userTypes.ADD_USER_START, addUserAsync)
}

export function* signInAsync(action) {
  const response = yield fetch(url + "/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
    //withCredentials: true,
    body: formEncode(action.payload)
    //credentials: "include"
  }).then(response => response.json());
  if (response.error) {
    yield put(signInFailure(response));
  } else {
    yield put(signInSuccess(response));
  }
}
export function* enterWithEmailStart() {
  console.log('trying login: 2');
  yield takeEvery(
    userTypes.EMAIL_SIGN_IN_START,
    signInAsync
  );
}

export function* connectSocketAsync(action) {

  const u = yield select(selectCurrentUser);
  const socket = yield connect(u._id);
  socket.emit('login', u._id);
  yield put({ type: userTypes.SET_SOCKET, payload: socket });
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
  //socket.on("changes",onChanges);

}
export function* applyUpdatesAsync(action) {
  const type = action.payload.type;
  const data = action.payload.payload;
  const payload = { ...data, isBackgroundChange: true };
  yield put({ type, payload });
}
export function* connectSocket() {
  yield takeLatest(
    userTypes.PUT_INITIAL_DATA,
    connectSocketAsync
  );
}
export function* applyUpdates() {
  yield takeLatest(
    userTypes.RECIEVED_CHANGES,
    applyUpdatesAsync
  )
}
export function* signUpAsync(action) {
  try {
    //const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const user = yield fetch(url + "/api/Account/Register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    }).then(async (response) => {
      if (response.status >= 205) {
        const result = await response.json();
        return { result, error: true };
      }
      return response.json();
    });
    if (user.error) {
      yield put(signUpFailure(user));
    } else {
      yield put(signUpSuccess({ user }));
      yield signInAsync(action);
    }
  } catch (error) {
    yield put(signUpFailure(error));
  }
}
export function* onSignUpStart() {
  yield takeEvery(userTypes.SIGN_UP_START, signUpAsync);
}
export function* searchGlobalAsync(action) {
  try {
    //const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const user = yield fetch(url + "/user/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: action.payload })
    }).then(response => response.json());
    yield put(searchGlobalComplete(user));
  } catch (error) {
  }
}
export function* onSearchGlobal() {
  yield takeLatest(userTypes.SEARCH_GLOBAL_MEMBER, searchGlobalAsync);
}
export function* signOutAsync() {
  const socket = yield select(selectSocket);
  //socket.disconnect();
}
export function* onSignOut() {
  yield takeLatest(userTypes.SIGN_OUT, signOutAsync);
}

export function* userSagas() {
  yield all([
    call(enterWithEmailStart),
    //call(connectSocket),
    call(applyUpdates),
    call(onSignUpStart),
    call(onSearchGlobal),
    call(onSignOut)
  ]);
}